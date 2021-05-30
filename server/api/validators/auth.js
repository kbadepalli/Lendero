const { check } = require('express-validator');
exports.login = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .normalizeEmail({ gmail_remove_dots: false })
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
];
