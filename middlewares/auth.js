const jwt = require('jsonwebtoken');
const LoginError = require('../errors/LoginError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new LoginError());
  }
  req.user = payload;
  next();
};
