/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
const movieSchema = require('../models/movie');
const {
  NotFoundError,
  ForbiddenError,
} = require('../errors/index');

module.exports.getMovies = (req, res, next) => {
  movieSchema.find({ owner: req.user._id })
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  movieSchema.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильма с данным id не существует.');
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалить чужой фильм.'));
      }
      return movie.deleteOne().then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  movieSchema.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotFoundError('Введены неверные данные'));
      }
      return next(err);
    });
};
