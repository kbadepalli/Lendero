const { check, oneOf } = require('express-validator');

exports.deleteUser = [
  check('id').trim().escape().not().isEmpty().withMessage('User Id can not be empty!').bail(),
];

exports.addUser = [
  check('fullName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!'),
  check('email')
    .trim()
    .normalizeEmail({ gmail_remove_dots: false })
    .not()
    .isEmpty()
    .withMessage('Invalid email address!'),
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .isLength({ min: 6 })
    .withMessage('Password should contain atleast 6 or more characters'),
];
exports.updateUser = [
  check('id').trim().escape().not().isEmpty().withMessage('User Id can not be empty!').bail(),
  oneOf([
    check('fullName')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('User name can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('email')
      .trim()
      .normalizeEmail({ gmail_remove_dots: false })
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
    check('password')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Password can not be empty!')
      .bail()
      .isLength({ min: 6 })
      .withMessage('Password should contain atleast 6 or more characters')
      .bail(),
  ]),
];
exports.deleteUser = [
  check('id').trim().escape().not().isEmpty().withMessage('User Id can not be empty!').bail(),
];
