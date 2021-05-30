const { Client } = require('../models');
const _ = require('lodash');
const authService = require('./auth');

const sanitizeClient = (client) => {
  return _.omit(client, ['createdAt', 'updatedAt']);
};

const getClients = async () => {
  const clients = await Client.findAll({
    raw: true,
  });

  if (_.isEmpty(clients)) {
    return [false, { message: 'No clients found' }];
  }

  return [clients];
};

const getClient = async (id) => {
  const client = await Client.findOne({
    where: { id },
    raw: true,
  });

  if (_.isEmpty(client)) {
    return [false, { message: `Client with id: ${id} is not found` }];
  }

  return [client];
};

const getClientByEmail = async (email) => {
  const client = await Client.findOne({
    where: { email },
    raw: true,
  });

  if (_.isEmpty(client)) {
    return [false, { message: `Client with email: ${email} is not found` }];
  }

  return [client];
};

const exists = async (params) => {
  const count = await Client.count({ where: { email: params.email } });

  if (!_.eq(count, 0)) {
    return [true, { message: `Client with email: ${params.email} already exists` }];
  }

  return [false];
};

const addClient = async (params) => {
  let exist, message;

  const clientInfo = { ...params };

  [exist, message] = await exists(params);

  if (exist) {
    return [false, { message }];
  }

  if (_.has(params, 'password')) {
    clientInfo.password = await authService.hashPassword(params.password);
  }

  const client = await Client.create(clientInfo).then((client) => {
    const clientJSON = client.toJSON();

    return getClient(clientJSON.id);
  });

  if (_.isEmpty(client)) {
    return [false, { message: 'Unable to create client' }];
  }

  return [sanitizeClient(client[0])];
};

const updateClient = async (id, params) => {
  const clientUpdated = await Client.update(params, {
    where: { id },
  }).then((rowsUpdate) => {
    return rowsUpdate[0];
  });

  if (_.eq(clientUpdated, 0)) {
    return [false, { message: `Unable to update the client` }];
  }

  [client, message] = await getClient(id);

  if (!client) {
    return [false, { message }];
  }

  return [client];
};

const deleteClient = async (id) => {
  const isDeleted = await Client.destroy({ where: { id } });

  if (!isDeleted) {
    return [false, { message: `Unable to delete the client` }];
  }

  return [true, { message: `Client with id: ${id} is deleted` }];
};

module.exports = {
  sanitizeClient,
  getClients,
  getClient,
  getClientByEmail,
  exists,
  addClient,
  updateClient,
  deleteClient,
};
