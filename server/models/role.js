const Sequelize = require('sequelize');
const sequelize = require('./db');

const Role = sequelize.define(
  'role',
  {
    name: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: 'role',
  }
);

module.exports = Role;
