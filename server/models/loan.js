const Sequelize = require('sequelize');
const sequelize = require('./db');
const Client = require('./client');

const Loan = sequelize.define(
  'loan',
  {
    documentNumber: {
      type: Sequelize.STRING,
    },
    loanAmount: {
      type: Sequelize.DECIMAL,
    },
    loanName: {
      type: Sequelize.STRING,
    },
    dateOfLoan: {
      type: Sequelize.DATEONLY,
    },
    rateOfInterest: {
      type: Sequelize.DECIMAL,
    },
    loanPeriod: {
      type: Sequelize.INTEGER,
    },
    guarantorOneFullName: {
      type: Sequelize.STRING,
    },
    guarantorOneEmailAddress: {
      type: Sequelize.STRING,
    },
    guarantorOneAddressLineOne: {
      type: Sequelize.STRING,
    },
    guarantorOneAddressLineTwo: {
      type: Sequelize.STRING,
    },
    guarantorOneCity: {
      type: Sequelize.STRING,
    },
    guarantorOneState: {
      type: Sequelize.STRING,
    },
    guarantorOneContactNumber: {
      type: Sequelize.STRING,
    },
    guarantorOneOfficeNumber: {
      type: Sequelize.STRING,
    },
    guarantorTwoFullName: {
      type: Sequelize.STRING,
    },
    guarantorTwoEmailAddress: {
      type: Sequelize.STRING,
    },
    guarantorTwoAddressLineOne: {
      type: Sequelize.STRING,
    },
    guarantorTwoAddressLineTwo: {
      type: Sequelize.STRING,
    },
    guarantorTwoCity: {
      type: Sequelize.STRING,
    },
    guarantorTwoState: {
      type: Sequelize.STRING,
    },
    guarantorTwoContactNumber: {
      type: Sequelize.STRING,
    },
    guarantorTwoOfficeNumber: {
      type: Sequelize.STRING,
    },
    additionalInformation: {
      type: Sequelize.STRING,
    },
    adminNotes: {
      type: Sequelize.STRING,
    },
    clientId: {
      type: Sequelize.INTEGER,
      references: {
        model: Client,
        key: 'id',
      },
    },
    status: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    tableName: 'loan',
  }
);

Loan.belongsTo(Client, {
  foreignKey: 'clientId',
});
Client.hasMany(Loan);

module.exports = Loan;
