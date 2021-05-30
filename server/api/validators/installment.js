const { check, oneOf } = require('express-validator');

exports.addInstalment = [
  check('instalmentNumber')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Instalment number name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
];
exports.updateInstalment = [
  check('instalmentNumber')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Instalment Number can not be empty!')
    .bail(),
  check('status').trim().escape().not().isEmpty().withMessage('status can not be empty!').bail(),
];
