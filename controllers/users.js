/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const userSchema = require('../models/user');

const {
  NotFoundError,
  BadRequestError,
  ConflictError,
  AuthError,
} = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      userSchema.create({ ...req.body, password: hashedPassword })
        .then((user) => {
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new NotFoundError('Переданы некорректные данные'));
          }
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с таким email уже существует'));
          }
          return next(err);
        });
    });
};

module.exports.login = (req, res, next) => {
  // Вытащить email и password
  const { email, password } = req.body;
  // Проверить существует ли пользователь с таким email
  userSchema.findOne({ email })
    .select('+password')
    .orFail(() => new AuthError('Неправильный логин или пароль'))
    .then((user) => {
      // Проверить совпадает ли пароль
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            // создать JWT
            const token = jsonWebToken.sign({
              _id: user._id,
            }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
            return res.send({ token });
          } else {
            // Если не совпадает -- вернуть ошибку
            return next(new AuthError('Неправильный логин или пароль'));
          }
        });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  userSchema.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным id не существует.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Переданы некорректные данные.'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь с данным id не существует.'));
      } else {
        next(err);
      }
    });
};

const changeUserData = (id, newData, res, next) => {
  userSchema.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь с с данным id не существует.'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return changeUserData(req.user._id, { name, email }, res, next);
};
