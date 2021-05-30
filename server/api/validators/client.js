const { check, oneOf } = require('express-validator');

exports.deleteClient = [
  check('id').trim().escape().not().isEmpty().withMessage('Client Id can not be empty!').bail(),
];

exports.addClient = [
  check('firstName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('First name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('lastName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Last name can not be empty!')
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
];
exports.updateClient = [
  check('id').trim().escape().not().isEmpty().withMessage('User Id can not be empty!').bail(),
  oneOf([
    check('firstName')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('First name can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('lastName')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Last name can not be empty!')
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
    check('addressLineOne')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Address line one can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('addressLineTwo')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Address line two can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('city')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('City can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('state')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('State can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('postCode')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Postcode can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('country')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Country can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('contactNumber')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Contact number can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('workNumber')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Work number can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
  ]),
];
exports.deleteClient = [
  check('id').trim().escape().not().isEmpty().withMessage('Client Id can not be empty!').bail(),
];
