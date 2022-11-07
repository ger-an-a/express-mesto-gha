const RegisterError = require('../errors/RegisterError');
const BadRequestError = require('../errors/BadRequestError');
const DefaultError = require('../errors/DefaultError');

function errorSelector(err) {
  if (err.code === 11000) return new RegisterError();
  if (err.name === 'ValidationError' || err.name === 'CastError') return new BadRequestError();
  return new DefaultError();
}

module.exports = errorSelector;
