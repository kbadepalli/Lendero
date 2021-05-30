const Sequelize = require('sequelize');
const sequelize = require('./db');
const Role = require('./role');

const User = sequelize.define(
  'user',
  {
    fullName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    roleId: {
      type: Sequelize.INTEGER,
      references: {
        model: Role,
        key: 'id',
      },
    },
    active: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: 'user',
  }
);

User.belongsTo(Role, {
  foreignKey: 'roleId',
});
Role.hasMany(User);

module.exports = User;
