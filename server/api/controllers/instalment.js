const { validationResult } = require('express-validator');
const instalmentService = require('../../services/instalment');
const _ = require('lodash');

const getInstalments = async (req, res) => {
  const [instalments, message] = await instalmentService.getInstalments();

  if (!instalments) {
    return res.status(400).json(message);
  }

  return res.send(instalments.map(instalmentService.sanitizeInstalment));
};

const addInstalment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  [exists, message] = await instalmentService.exists(req.body);

  if (exists) {
    return res.status(409).json(message);
  }

  [role, message] = await instalmentService.addInstalment(req.body);

  if (!role) {
    return res.status(400).json(message);
  }

  res.send(instalmentService.sanitizeInstalment(role));
};

const updateInstalment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const params = _.omit(req.body, ['id']);

  const [instalment, message] = await instalmentService.updateInstalment(req.body.id, params);

  if (!instalment) {
    return res.status(409).json(message);
  }

  return res.send(instalmentService.sanitizeInstalment(instalment));
};

module.exports = {
  getInstalments,
  addInstalment,
  updateInstalment,
};
