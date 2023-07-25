const jwt = require('jsonwebtoken');
const AuthError = require('../errors/401');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Необходимо авторизоваться.'));
  }
  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthError('Необходимо авторизоваться.'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
