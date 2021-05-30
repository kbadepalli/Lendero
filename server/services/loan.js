const { Loan, Client } = require('../models');
const _ = require('lodash');
const authService = require('./auth');

const sanitizeLoan = (loan) => {
  return _.omit(loan, ['createdAt', 'updatedAt']);
};

const getLoans = async () => {
  const loans = await Loan.findAll({
    raw: true,
    nest: true,
    include: [{ model: Client }],
  });
  console.log(loans);
  if (_.isEmpty(loans)) {
    return [false, { message: 'No loans found' }];
  }

  return [loans];
};

const getLoan = async (id) => {
  const loan = await Loan.findOne({
    where: { id },
    raw: true,
    nest: true,
    include: [{ model: Client }],
  });

  if (_.isEmpty(loan)) {
    return [false, { message: `Loan with id: ${id} is not found` }];
  }

  return [loan];
};

const addLoan = async (params) => {
  const loan = await Loan.create(params).then((loan) => {
    const loanJSON = loan.toJSON();

    return getLoan(loanJSON.id);
  });

  if (_.isEmpty(loan)) {
    return [false, { message: 'Unable to create loan' }];
  }

  return [sanitizeLoan(loan[0])];
};

const updateLoan = async (id, params) => {
  const loanUpdated = await Loan.update(params, {
    where: { id },
  }).then((rowsUpdate) => {
    return rowsUpdate[0];
  });

  if (_.eq(loanUpdated, 0)) {
    return [false, { message: `Unable to update the loan` }];
  }

  const [loan, message] = await getLoan(id);

  if (!loan) {
    return [false, { message }];
  }

  return [loan];
};

const deleteLoan = async (id) => {
  const isDeleted = await Loan.destroy({ where: { id } });

  if (!isDeleted) {
    return [false, { message: `Unable to delete the loan` }];
  }

  return [true, { message: `Loan with id: ${id} is deleted` }];
};

module.exports = {
  sanitizeLoan,
  getLoans,
  getLoan,
  addLoan,
  updateLoan,
  deleteLoan,
};
