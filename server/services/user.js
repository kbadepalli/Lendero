const { User, Role } = require('../models');
const _ = require('lodash');
const authService = require('./auth');

const sanitizeUser = (user) => {
  return _.omit(user, ['password', 'resetPasswordToken', 'createdAt', 'updatedAt']);
};

const getUsers = async () => {
  const users = await User.findAll({
    raw: true,
    nest: true,
    include: [{ model: Role, attributes: ['id', 'name'] }],
  });

  if (_.isEmpty(users)) {
    return [false, { message: 'No users found' }];
  }

  return [users];
};

const getUser = async (id) => {
  const user = await User.findOne({
    where: { id },
    raw: true,
    nest: true,
    include: [{ model: Role, attributes: ['id', 'name'] }],
  });

  if (_.isEmpty(user)) {
    return [false, { message: `User with id: ${id} is not found` }];
  }

  return [user];
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
    raw: true,
    nest: true,
    include: [{ model: Role, attributes: ['id', 'name'] }],
  });

  if (_.isEmpty(user)) {
    return [false, { message: `User with email: ${email} is not found` }];
  }

  return [user];
};

const exists = async (params) => {
  const count = await User.count({ where: { email: params.email } });

  if (!_.eq(count, 0)) {
    return [true, { message: `User with email: ${params.email} already exists` }];
  }

  return [false];
};

const addUser = async (params) => {
  let exist, message;

  const userInfo = { ...params };

  [exist, message] = await exists(params);

  if (exist) {
    return [false, { message }];
  }

  if (_.has(params, 'password')) {
    console.log(params);
    console.log(authService);
    console.log(module.exports);
    userInfo.password = await authService.hashPassword(params.password);
  }

  const user = await User.create(userInfo).then((user) => {
    const userJSON = user.toJSON();

    return getUser(userJSON.id);
  });

  if (_.isEmpty(user)) {
    return [false, { message: 'Unable to create user' }];
  }

  return [sanitizeUser(user[0])];
};

const updateUser = async (id, params) => {
  const userUpdated = await User.update(params, {
    where: { id },
  }).then((rowsUpdate) => {
    return rowsUpdate[0];
  });

  if (_.eq(userUpdated, 0)) {
    return [false, { message: `Unable to update the user` }];
  }

  [user, message] = await getUser(id);

  if (!user) {
    return [false, { message }];
  }

  return [user];
};

const deleteUser = async (id) => {
  const isDeleted = await User.destroy({ where: { id } });

  if (!isDeleted) {
    return [false, { message: `Unable to delete the user` }];
  }

  return [true, { message: `User with id: ${id} is deleted` }];
};

module.exports = {
  sanitizeUser,
  getUsers,
  getUser,
  getUserByEmail,
  exists,
  addUser,
  updateUser,
  deleteUser,
};
