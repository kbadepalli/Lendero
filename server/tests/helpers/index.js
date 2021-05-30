const Sequelize = require('sequelize');
const models = require('../../models');
const mockUserData = require('../../data/users.json');
const mockRoleData = require('../../data/roles.json');
const mockClientData = require('../../data/clients.json');
const mockLoanData = require('../../data/loans.json');
const _ = require('lodash');

const generateUsers = () => {
  try {
    return _.each(mockUserData, async (userInfo) => {
      await models.User.create(userInfo).then((user) => {
        return user.toJSON();
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getRandomUser = async () => {
  return await models.User.findOne({ order: [Sequelize.fn('RAND')] });
};
const destroyUsers = async () => {
  try {
    return await models.User.destroy({
      where: {},
      truncate: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const generateRoles = () => {
  try {
    return _.each(mockRoleData, async (roleInfo) => {
      models.Role.create(roleInfo).then((role) => {
        return role.toJSON();
      });
    });
  } catch (error) {}
};

const destroyRoles = async () => {
  return await models.Role.destroy({
    where: {},
    truncate: true,
  });
};

const generateClients = () => {
  try {
    return _.each(mockClientData, async (clientInfo) => {
      await models.Client.create(clientInfo).then((client) => {
        return client.toJSON();
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const destroyClients = async () => {
  return await models.Client.destroy({
    where: {},
    truncate: true,
  });
};

const generateLoans = () => {
  try {
    return _.each(mockLoanData, async (loanInfo) => {
      await models.Loan.create(loanInfo).then((loan) => {
        return loan.toJSON();
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const destroyLoans = async () => {
  return await models.Loan.destroy({
    where: {},
    truncate: true,
  });
};

const cleanDatabase = () => {
  Promise.all([destroyUsers, destroyRoles]).then((result) => {
    return result;
  });
};

module.exports = {
  cleanDatabase,
  generateUsers,
  getRandomUser,
  destroyUsers,
  generateRoles,
  destroyRoles,
  generateClients,
  destroyClients,
  generateLoans,
  destroyLoans,
};
