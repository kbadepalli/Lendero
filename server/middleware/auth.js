const authService = require('../services/auth');

const hasValidToken = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, aithorization denied' });
  }
  validatedToken = authService.validateToken(token);

  if (!validatedToken.isValid) {
    return res.status(401).json({ message: 'Not a valid token, aithorization denied' });
  }
  req.userId = validatedToken.payload.id;

  next();
};

module.exports = { hasValidToken };
