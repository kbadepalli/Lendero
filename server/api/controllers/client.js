const { validationResult } = require('express-validator');
const clientService = require('../../services/client');
const _ = require('lodash');
const paginate = require('../../services/paginate');

const getClients = async (req, res) => {
  const [clients, message] = await clientService.getClients();

  if (!clients) {
    return res.status(400).json(message);
  }

  const sanitizeClients = clients.map(clientService.sanitizeClient);
  const pager = paginate(sanitizeClients.length, parseInt(req.query.page), 15);

  const pagedClients = sanitizeClients.slice(pager.startIndex, pager.endIndex + 1);

  return res.send({ pager, clients: pagedClients });
};

const getClient = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const [client, message] = await clientService.getClient(req.params.id);

  if (!client) {
    return res.status(400).json(message);
  }

  res.send(clientService.sanitizeClient(client));
};

const addClient = async (req, res) => {
  console.log(req.body);
  [exists, message] = await clientService.exists(req.body);

  if (exists) {
    return res.status(409).json(message);
  }

  [client, message] = await clientService.addClient(req.body);

  if (!client) {
    return res.status(400).json(message);
  }

  res.send(clientService.sanitizeClient(client));
};

const updateClient = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const params = _.omit(req.body, ['id']);

  const [client, message] = await clientService.updateClient(req.body.id, params);

  if (!client) {
    return res.status(409).json(message);
  }

  return res.send(clientService.sanitizeClient(client));
};

const deleteClient = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const [isDeleted, message] = await clientService.deleteClient(req.body.id);

  if (!isDeleted) {
    return res.status(200).json(message);
  }

  res.status(409).json(message);
};

module.exports = {
  getClients,
  getClient,
  addClient,
  updateClient,
  deleteClient,
};
