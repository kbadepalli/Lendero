const db = require('../models');
const _ = require('lodash');

const Role = db.Role;

const sanitizeRole = (role) => {
  return _.omit(role, ['updatedAt', 'createdAt', 'active']);
};

const getRoles = async () => {
  const roles = await Role.findAll({ raw: true });

  if (_.isEmpty(roles)) {
    return [false, { message: 'No roles found' }];
  }

  return [roles];
};

const getRole = async (id) => {
  const role = await Role.findOne({
    where: { id },
    raw: true,
  });

  if (_.isEmpty(role)) {
    return [false, { message: `Role with id: ${id} is not found` }];
  }

  return [role];
};

const exists = async (params) => {
  const count = await Role.count({ where: params });

  if (!_.eq(count, 0)) {
    return [true, { message: `Role with name: ${params.name} already exists` }];
  }

  return [false];
};

const addRole = async (params) => {
  [exist, message] = await exists(params);

  if (exist) {
    return [false, { message }];
  }

  const role = await Role.create(params).then((role) => {
    return role.get();
  });

  if (_.isEmpty(role)) {
    return [false, { message: 'Unable to create role' }];
  }

  return [role];
};

const updateRole = async (id, params) => {
  let role, exist, message;
  console.log(id, params);
  [exist, message] = await exists(params);

  if (exist) {
    return [false, { message }];
  }

  const roleUpdated = await Role.update(params, {
    where: { id },
  }).then((rowsUpdate) => {
    return rowsUpdate[0];
  });

  if (_.eq(roleUpdated, 0)) {
    return [false, { message: `Unable to update the role` }];
  }

  [role, message] = await getRole(id);

  if (!role) {
    return [false, { message }];
  }
  console.log(role);
  return [role];
};

const deleteRole = async (id) => {
  console.log(id);
  const isDeleted = await Role.destroy({ where: { id } });
  console.log(isDeleted);
  if (!isDeleted) {
    return [false, { message: `Unable to delete the role` }];
  }

  return [true, { message: `Role with id: ${id} is deleted` }];
};

module.exports = {
  sanitizeRole,
  getRoles,
  getRole,
  exists,
  addRole,
  updateRole,
  deleteRole,
};
