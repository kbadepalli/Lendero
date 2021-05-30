const jwt = require('jsonwebtoken');
const config = require('config')[process.env.NODE_ENV];
const jwtSecret = config.get('jwtSecret');
const crypto = require('crypto');

const createJwtToken = (user) => {
  return jwt.sign({ id: user.id }, jwtSecret);
};

const decodeJwtToken = (token) => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return { payload, isValid: true };
  } catch (err) {
    return { payload: null, isValid: false };
  }
};

const createToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

module.exports = {
  createJwtToken,
  decodeJwtToken,
  createToken,
};
