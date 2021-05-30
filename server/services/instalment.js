const { Instalment, Loan } = require('../models');
const _ = require('lodash');
const moment = require('moment');
const config = require('config')[process.env.NODE_ENV];
const dateConfig = config.get('date');

//******************************************
// PV is the principal amount
// PMT is the monthly payment
// i is the interest rate per month in decimal form (interest rate percentage divided by 12)
// n is the number of months (term of the loan in months)
//
//        PV * i * ( 1 + i ) ** n
// PMT = -------------------------
//           ( i + 1 ) ** n - 1
//******************************************
const calculateMonthlyPayment = (loanInfo) => {
  const interest = _.divide(_.divide(loanInfo.interestRate, 100), 12);

  const dividend = _.multiply(
    _.multiply(loanInfo.principalAmount, interest),
    Math.pow(_.add(1 + interest), loanInfo.numberOfMonths)
  );

  const divisor = _.subtract(Math.pow(_.add(1 + interest), loanInfo.numberOfMonths), 1);

  return _.round(_.divide(dividend, divisor), 2);
};

const calculateMonthlyInterestAmount = (loanInfo) => {
  const interest = _.divide(_.divide(loanInfo.interestRate, 100), 12);

  return _.round(_.multiply(loanInfo.principalAmount, interest), 2);
};

const calculateMonthlyPrincipalAmount = (loanInfo) => {
  return _.round(
    _.subtract(calculateMonthlyPayment(loanInfo) - calculateMonthlyInterestAmount(loanInfo)),
    2
  );
};

const isNegligableAmount = (number) => {
  return _.lt(number, 1) ? 0 : number;
};

const generateAmortizationSchedule = async (loanInfo) => {
  const monthlyPayment = calculateMonthlyPayment(loanInfo);

  const schedule = _.times(loanInfo.numberOfMonths, (i) => {
    const instalment = {};

    instalment.instalmentNumber = i + 1;

    instalment.loanId = loanInfo.loanId;

    instalment.monthlyPayment = monthlyPayment;

    instalment.monthlyInterestAmount = calculateMonthlyInterestAmount(loanInfo);

    instalment.instalmentDate = moment(loanInfo.dateOfLoan, dateConfig.mySql.dateOnly)
      .clone()
      .add(i, 'months')
      .format(dateConfig.mySql.dateOnly);

    instalment.monthlyPrincipalAmount = monthlyPayment - instalment.monthlyInterestAmount;

    loanInfo.principalAmount = _.round(
      isNegligableAmount(loanInfo.principalAmount - instalment.monthlyPrincipalAmount),
      2
    );

    instalment.balanceLoanAmount = loanInfo.principalAmount;

    return instalment;
  });

  await addInstalments(schedule);
};

const sanitizeInstalment = (instalment) => {
  return _.omit(instalment, ['createdAt', 'updatedAt']);
};

const getInstalments = async (loanId) => {
  const instalments = await Instalment.findAll({
    raw: true,
    nest: true,
    include: [{ model: Loan, attributes: ['id', 'documentNumber', 'loanName'] }],
  });

  if (_.isEmpty(instalments)) {
    return [false, { message: 'No instalments found' }];
  }

  return [instalments];
};

const getInstalment = async (id) => {
  const instalment = await Instalment.findOne({
    where: { id },
    raw: true,
    nest: true,
    include: [{ model: Loan, attributes: ['id', 'documentNumber', 'loanName'] }],
  });

  if (_.isEmpty(instalment)) {
    return [false, { message: `Instalment with id: ${id} is not found` }];
  }

  return [instalment];
};

const addInstalments = (schedule) => {
  schedule.map((instalment) => {
    addInstalment(instalment);
  });
};
const addInstalment = async (params) => {
  const instalment = await Instalment.create(params).then((instalment) => {
    const instalmentJSON = instalment.toJSON();

    return getInstalment(instalmentJSON.id);
  });

  if (_.isEmpty(instalment)) {
    return [false, { message: 'Unable to create instalment' }];
  }

  return [sanitizeInstalment(instalment[0])];
};

const updateInstalment = async (id, params) => {
  const instalmentUpdated = await Instalment.update(params, {
    where: { id },
  }).then((rowsUpdate) => {
    return rowsUpdate[0];
  });

  if (_.eq(instalmentUpdated, 0)) {
    return [false, { message: `Unable to update the instalment` }];
  }

  const [instalment, message] = await getInstalment(id);

  if (!instalment) {
    return [false, { message }];
  }

  return [instalment];
};

const deleteInstalment = async (id) => {
  const isDeleted = await Instalment.destroy({ where: { id } });

  if (!isDeleted) {
    return [false, { message: `Unable to delete the instalment` }];
  }

  return [true, { message: `Instalment with id: ${id} is deleted` }];
};

module.exports = {
  sanitizeInstalment,
  getInstalments,
  getInstalment,
  addInstalment,
  updateInstalment,
  deleteInstalment,
  calculateMonthlyPayment,
  calculateMonthlyInterestAmount,
  calculateMonthlyPrincipalAmount,
  generateAmortizationSchedule,
};
