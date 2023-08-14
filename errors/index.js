const NotFoundError = require('./404');
const AuthError = require('./401');
const ForbiddenError = require('./403');
const BadRequestError = require('./400');
const ConflictError = require('./409');

module.exports = {
  NotFoundError,
  AuthError,
  ForbiddenError,
  BadRequestError,
  ConflictError,
};
