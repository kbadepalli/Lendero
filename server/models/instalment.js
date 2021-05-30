const Sequelize = require('sequelize');
const sequelize = require('./db');
const Loan = require('./loan');

const Instalment = sequelize.define(
  'instalment',
  {
    instalmentNumber: {
      type: Sequelize.STRING,
    },
    monthlyPayment: {
      type: Sequelize.DECIMAL,
    },

    monthlyPrincipalAmount: {
      type: Sequelize.DECIMAL,
    },
    monthlyInterestAmount: {
      type: Sequelize.DECIMAL,
    },
    balanceLoanAmount: {
      type: Sequelize.DECIMAL,
    },
    instalmentDate: {
      type: Sequelize.DATEONLY,
    },
    loanId: {
      type: Sequelize.INTEGER,
      references: {
        model: Loan,
        key: 'id',
      },
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    tableName: 'instalment',
  }
);

Instalment.belongsTo(Loan, {
  foreignKey: 'loanId',
});
Loan.hasMany(Instalment);

module.exports = Instalment;
