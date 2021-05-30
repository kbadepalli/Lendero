const Sequelize = require('sequelize');
const sequelize = require('./db');

const Client = sequelize.define(
  'client',
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    addressLineOne: {
      type: Sequelize.STRING,
    },
    addressLineTwo: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    postCode: {
      type: Sequelize.STRING,
    },
    contactNumber: {
      type: Sequelize.STRING,
    },
    workNumber: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: 'client',
  }
);

module.exports = Client;
