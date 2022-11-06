const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

module.exports = (req, res, next) => {
  const authorization = req.headers.cookie;
  if (!authorization || !authorization.startsWith('jwt=')) {
    return next(new CustomError('LoginError'));
  }
  const token = authorization.replace('jwt=', '');
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
