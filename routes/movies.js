const moviesRouter = require('express').Router();

const {
  deleteMovie, createMovie, getMovies,
} = require('../controllers/movies');

const {
  validationCreateMovie,
} = require('../middlewares/celebrate');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', validationCreateMovie, createMovie);

moviesRouter.delete('/:movieId', deleteMovie);

module.exports = moviesRouter;
