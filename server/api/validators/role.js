const { check, oneOf } = require('express-validator');

exports.getRole = [
  check('id').trim().escape().not().isEmpty().withMessage('Role Id can not be empty!').bail(),
];

exports.addRole = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Role name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
];
exports.updateRole = [
  check('id').trim().escape().not().isEmpty().withMessage('Role Id can not be empty!').bail(),
  oneOf([
    check('name')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Role name can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
  ]),
];
exports.deleteRole = [
  check('id').trim().escape().not().isEmpty().withMessage('Role Id can not be empty!').bail(),
];
