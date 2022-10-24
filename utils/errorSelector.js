const { ERROR_CODE400, ERROR_CODE404, ERROR_CODE500,
  ERROR_MESSAGE400, ERROR_MESSAGE404, ERROR_MESSAGE500 } = require('./constants');

function errorSelector(errName) {
  let code, message;
  if (errName === 'ValidationError' || errName === 'invalidId') {
    code = ERROR_CODE400;
    message = ERROR_MESSAGE400;
  } else if (errName === 'CastError' || errName === 'NotFound') {
    code = ERROR_CODE404;
    message = ERROR_MESSAGE404;
  } else {
    code = ERROR_CODE500;
    message = ERROR_MESSAGE500;
  }
  return { code, message };
}

module.exports = errorSelector;