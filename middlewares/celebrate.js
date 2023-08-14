const { celebrate, Joi } = require('celebrate');

const urlPattern = /^https?:\/\/(?:www\.)?(?:[a-z0-9-]+[a-z0-9]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
    avatar: Joi.string().regex(urlPattern),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),

  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlPattern),
    trailerLink: Joi.string().regex(urlPattern),
    thumbnail: Joi.string().regex(urlPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  validationCreateUser,
  validationLogin,
  validationUpdateUser,
  validationCreateMovie,
};
