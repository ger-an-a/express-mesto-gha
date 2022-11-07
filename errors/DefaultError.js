const { ERROR_CODE500, ERROR_MESSAGE500 } = require('../utils/constants');

class DefaultError extends Error {
  constructor() {
    super(ERROR_MESSAGE500);
    this.statusCode = ERROR_CODE500;
  }
}

module.exports = DefaultError;
