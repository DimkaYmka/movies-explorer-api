const usersRouter = require('express').Router();
const {
  getUserById, updateUser,
} = require('../controllers/users');

const {
  validationUpdateUser,
} = require('../middlewares/celebrate');

usersRouter.get('/me', getUserById);

usersRouter.patch('/me', validationUpdateUser, updateUser);

module.exports = usersRouter;
