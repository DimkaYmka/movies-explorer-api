module.exports = class AuthhError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
