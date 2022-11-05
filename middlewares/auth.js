const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new CustomError('LoginError'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new CustomError('LoginError'));
  }
  req.user = payload;
  next();
  return res.status(200);
};
