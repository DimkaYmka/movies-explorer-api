const errCodeInvalidData = 400;
const errCodeNotFound = 404;
const errCodeDefault = 500;
const defaultErrorMessage = 'Ошибка на сервере';

module.exports = {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  defaultErrorMessage,
};

module.exports.limiterSetting = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};
