const {
  ERROR_CODE400, ERROR_CODE401, ERROR_CODE404, ERROR_CODE500,
  ERROR_MESSAGE400, ERROR_MESSAGE401, ERROR_MESSAGE404, ERROR_MESSAGE500,
} = require('./constants');

function errorSelector(res, errName) {
  if (errName === 'ValidationError' || errName === 'CastError') {
    res.status(ERROR_CODE400).send({ message: ERROR_MESSAGE400 });
  } else if (errName === 'LoginError') {
    res.status(ERROR_CODE401).send({ message: ERROR_MESSAGE401 });
  } else if (errName === 'NotFound') {
    res.status(ERROR_CODE404).send({ message: ERROR_MESSAGE404 });
  } else {
    res.status(ERROR_CODE500).send({ message: ERROR_MESSAGE500 });
  }
}

module.exports = errorSelector;
