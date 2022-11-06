const {
  ERROR_CODE400, ERROR_CODE401, ERROR_CODE404, ERROR_CODE409, ERROR_CODE500,
  ERROR_MESSAGE400, ERROR_MESSAGE401, ERROR_MESSAGE404, ERROR_MESSAGE409, ERROR_MESSAGE500,
} = require('./constants');

module.exports.errorSelector = (res, err) => {
  if (err.code === 11000) {
    res.status(ERROR_CODE409).send({ message: ERROR_MESSAGE409 });
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(ERROR_CODE400).send({ message: ERROR_MESSAGE400 });
  } else if (err.name === 'LoginError') {
    res.status(ERROR_CODE401).send({ message: ERROR_MESSAGE401 });
  } else if (err.name === 'NotFound') {
    res.status(ERROR_CODE404).send({ message: ERROR_MESSAGE404 });
  } else {
    res.status(ERROR_CODE500).send({ message: ERROR_MESSAGE500 });
  }
};
