const { check, oneOf } = require('express-validator');

exports.deleteLoan = [
  check('id').trim().escape().not().isEmpty().withMessage('Loan Id can not be empty!').bail(),
];

exports.addLoan = [
  check('documentNumber')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Document number can not be empty!')
    .bail()
    .isLength({ min: 11 })
    .withMessage('Minimum 11 characters required!')
    .bail(),
  check('loanAmount')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Loan amount can not be empty!')
    .bail()
    .isDecimal()
    .bail()
    .withMessage('Loan Amount should be numeric')
    .isLength({ min: 5 })
    .withMessage('Minimum 5 characters required!')
    .bail(),
];
exports.updateLoan = [
  check('id').trim().escape().not().isEmpty().withMessage('User Id can not be empty!').bail(),
  oneOf([
    check('documentNumber')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Document number can not be empty!')
      .bail()
      .isLength({ min: 11 })
      .withMessage('Minimum 11 characters required!')
      .bail(),
    check('loanAmount')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Loan amount can not be empty!')
      .bail()
      .isDecimal()
      .bail()
      .withMessage('Loan Amount should be numeric')
      .isLength({ min: 5 })
      .withMessage('Minimum 5 characters required!')
      .bail(),
  ]),
];
exports.deleteLoan = [
  check('id').trim().escape().not().isEmpty().withMessage('Loan Id can not be empty!').bail(),
];
