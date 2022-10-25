const {
  ERROR_CODE400, ERROR_CODE404, ERROR_CODE500,
  ERROR_MESSAGE400, ERROR_MESSAGE404, ERROR_MESSAGE500,
} = require('./constants');

function errorSelector(res, errName, additionMessage = '') {
  if (errName === 'ValidationError' || errName === 'CastError') {
    res.status(ERROR_CODE400).send({ message: `${ERROR_MESSAGE400} ${additionMessage}` });
  } else if (errName === 'NotFound') {
    res.status(ERROR_CODE404).send({ message: `${ERROR_MESSAGE404} ${additionMessage}` });
  } else {
    res.status(ERROR_CODE500).send({ message: `${ERROR_MESSAGE500} ${additionMessage}` });
  }
}

module.exports = errorSelector;
