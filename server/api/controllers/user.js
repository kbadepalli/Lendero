const { validationResult } = require('express-validator');
const userService = require('../../services/user');
const paginate = require('../../services/paginate');
const _ = require('lodash');

const getUsers = async (req, res) => {
  const [users, message] = await userService.getUsers();

  if (!users) {
    return res.status(400).json(message);
  }

  const sanatizedUsers = users.map(userService.sanitizeUser);

  const pager = paginate(sanatizedUsers.length, parseInt(req.query.page));

  const pagedUsers = sanatizedUsers.slice(pager.startIndex, pager.endIndex + 1);

  return res.send({ pager, users: pagedUsers });
};

const getUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const [user, message] = await userService.getUser(req.params.id);

  if (!user) {
    return res.status(400).json(message);
  }

  res.send(userService.sanitizeUser(user));
};

const addUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  [exists, message] = await userService.exists(req.body);

  if (exists) {
    return res.status(409).json(message);
  }

  [role, message] = await userService.addUser(req.body);

  if (!role) {
    return res.status(400).json(message);
  }

  res.send(userService.sanitizeUser(role));
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const params = _.omit(req.body, ['id']);

  const [user, message] = await userService.updateUser(req.body.id, params);

  if (!user) {
    return res.status(409).json(message);
  }

  return res.send(userService.sanitizeUser(user));
};

const deleteUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const [isDeleted, message] = await userService.deleteUser(req.body.id);

  if (!isDeleted) {
    return res.status(200).json(message);
  }

  res.status(409).json(message);
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
