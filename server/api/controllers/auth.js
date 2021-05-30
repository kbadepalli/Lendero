const { validationResult } = require('express-validator');
const authService = require('../../services/auth');
const userService = require('../../services/user');

const authenticate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const [user, message] = await authService.checkCredentials(req.body.email, req.body.password);

  if (!user) {
    return res.status(400).json(message);
  }

  return res.send(userService.sanitizeUser(user));
};

const hasValidToken = async (req, res) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, aithorization denied' });
  }
  validatedToken = authService.validateToken(token);

  if (!validatedToken.isValid) {
    return res.status(401).json({ message: 'Not a valid token, aithorization denied' });
  }

  return res.status(200).json(validatedToken.payload);
};
const forgotPassword = async (req, res) => {
  //check email exits
  //if email exists sen an email else do nothing
};

const changePassword = async (req, res) => {};

module.exports = {
  authenticate,
  hasValidToken,
  forgotPassword,
  changePassword,
};
