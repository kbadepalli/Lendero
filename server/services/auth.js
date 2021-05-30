const config = require('config')[process.env.NODE_ENV];
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const { User, Role } = require('../models');
// const userService = require('./user');
const tokenService = require('./token');
// const { forgotPasswordTemplate } = require('../templates');
// const emailService = require('./email');

const hashPassword = (password) => bcrypt.hash(password, 10);

const validatePassword = (password, hash) => bcrypt.compare(password, hash);

const validateToken = (token) => {
  return tokenService.decodeJwtToken(token);
};
const checkCredentials = async (email, password) => {
  const user = await User.findOne({
    where: { email },
    raw: true,
    nest: true,
    include: [{ model: Role, attributes: ['id', 'name'] }],
  });

  if (!user || !user.password) {
    return [false, { message: 'Invalid credentials' }];
  }

  const isValid = await validatePassword(password, user.password);

  if (!isValid) {
    return [false, { message: 'Invalid credentials' }];
  }

  if (!user.active) {
    return [false, { message: 'User not active' }];
  }

  user.token = tokenService.createJwtToken(user);
  console.log(user);
  return [user];
};

// const forgotPassword = async (params) => {
//   let exist, user, message, err, info;

//   [user, message] = userService.getUserByEmail(params);

//   if (!user) {
//     return;
//   }

//   const resetPasswordToken = tokenService.createToken();

//   await userService.updateUser(user.id, { resetPasswordToken });

//   const url = `${config.publicUrl}/reset-password?code=${resetPasswordToken}`;

//   const htmlContent = _.template(forgotPasswordTemplate.html);

//   const mailOptions = {
//     from: config.email.forgotPassword.from,
//     to: user.email,
//     subject: forgotPasswordTemplate.subject,
//     contentType: 'html',
//     content: htmlContent({ url }),
//   };

//   [err, info] = await emailService.sendMail(mailOptions);

//   if (error) {
//     console.error(err);
//   }
// };
module.exports = {
  hashPassword,
  validateToken,
  validatePassword,
  checkCredentials,
};
