class CustomError extends Error {
  constructor(name) {
    super('');
    this.name = name;
  }
}
module.exports = CustomError;