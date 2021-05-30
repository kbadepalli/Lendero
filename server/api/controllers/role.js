const { validationResult } = require('express-validator');
const roleService = require('../../services/role');
const paginate = require('../../services/paginate');
const _ = require('lodash');

const getRoles = async (req, res) => {
  const [roles, message] = await roleService.getRoles();

  if (!roles) {
    return res.status(400).json(message);
  }

  const sanatizedRoles = roles.map(roleService.sanitizeRole);

  const pager = paginate(sanatizedRoles.length, parseInt(req.query.page), 15);

  const pagedRoles = sanatizedRoles.slice(pager.startIndex, pager.endIndex + 1);

  return res.send({ pager, roles: pagedRoles });
};

const getRole = async (req, res) => {
  const errors = validationResult(req);

  if (_.isEmpty(errors)) {
    return res.status(422).json({ errors: errors.array() });
  }

  const [role, message] = await roleService.getRole(req.params.id);

  if (!role) {
    return res.status(400).json(message);
  }
  console.log('getrole', role);
  res.send(roleService.sanitizeRole(role));
};

const addRole = async (req, res) => {
  const errors = validationResult(req);

  if (_.isEmpty(errors)) {
    return res.status(422).json({ errors: errors.array() });
  }

  console.log(req.body);

  [exists, message] = await roleService.exists(req.body);

  if (exists) {
    return res.status(409).json(message);
  }

  [role, message] = await roleService.addRole(req.body);

  if (!role) {
    return res.status(400).json(message);
  }

  res.send(roleService.sanitizeRole(role));
};

const updateRole = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const params = _.omit(req.body, ['id']);

  const [role, message] = await roleService.updateRole(req.body.id, params);

  if (!role) {
    return res.status(409).json(message);
  }

  return res.send(roleService.sanitizeRole(role));
};

const deleteRole = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const [isDeleted, message] = await roleService.deleteRole(req.body.id);

  if (!isDeleted) {
    return res.status(409).json(message);
  }

  res.status(200).json(message);
};

module.exports = {
  getRoles,
  getRole,
  addRole,
  updateRole,
  deleteRole,
};
