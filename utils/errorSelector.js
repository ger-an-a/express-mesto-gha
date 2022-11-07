const RegisterError = require('../errors/AccessError');
const BadRequestError = require('../errors/BadRequestError');
const DefaultError = require('../errors/DefaultError');

module.exports.errorSelector = (err) => {
  if (err.code === 11000) return new RegisterError();
  if (err.name === 'ValidationError' || err.name === 'CastError') return new BadRequestError();
  return new DefaultError();
};
