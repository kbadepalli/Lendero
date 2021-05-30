const { validationResult } = require('express-validator');
const loanService = require('../../services/loan');
const _ = require('lodash');
const paginate = require('../../services/paginate');

const getLoans = async (req, res) => {
  const [loans, message] = await loanService.getLoans();

  if (!loans) {
    return res.status(400).json(message);
  }

  const sanitizeLoans = loans.map(loanService.sanitizeLoan);
  const pager = paginate(sanitizeLoans.length, parseInt(req.query.page), 15);

  const pagedLoans = sanitizeLoans.slice(pager.startIndex, pager.endIndex + 1);

  return res.send({ pager, loans: pagedLoans });
};

const getLoan = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const [loan, message] = await loanService.getLoan(req.params.id);

  if (!loan) {
    return res.status(400).json(message);
  }

  res.send(loanService.sanitizeLoan(loan));
};

const addLoan = async (req, res) => {
  console.log(req.body);
  [exists, message] = await loanService.exists(req.body);

  if (exists) {
    return res.status(409).json(message);
  }

  [loan, message] = await loanService.addLoan(req.body);

  if (!loan) {
    return res.status(400).json(message);
  }

  res.send(loanService.sanitizeLoan(loan));
};

const updateLoan = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const params = _.omit(req.body, ['id']);

  const [loan, message] = await loanService.updateLoan(req.body.id, params);

  if (!loan) {
    return res.status(409).json(message);
  }

  return res.send(loanService.sanitizeLoan(loan));
};

const deleteLoan = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const [isDeleted, message] = await loanService.deleteLoan(req.body.id);

  if (!isDeleted) {
    return res.status(200).json(message);
  }

  res.status(409).json(message);
};

module.exports = {
  getLoans,
  getLoan,
  addLoan,
  updateLoan,
  deleteLoan,
};
