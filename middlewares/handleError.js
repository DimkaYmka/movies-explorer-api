const { defaultErrorMessage } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? defaultErrorMessage : message,
    });
  console.log(err.message);
  next();
};

module.exports = errorHandler;
