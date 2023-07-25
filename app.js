require('dotenv').config;
const express = require('express');
const helmet = require('helmet');
const Limit = require('express-rate-limit');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiterSetting = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

const app = express();
// app.use(cors({
//   origin: [
//     'http://localhost:3001',
//     'http://localhost:3000',
//     'http://mesto.project.learn.nomoredomains.work',
//     'http://api.mesto.project.learn.nomoredomains.work',
//     'https://mesto.project.learn.nomoredomains.work',
//     'https://api.mesto.project.learn.nomoredomains.work',
//   ],
//   credentials: true,
//   maxAge: 30,
// }));
app.use(cors());

const { PORT = 3001 } = process.env;
const limiter = Limit(limiterSetting);
app.use(limiter);
app.use(helmet());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// mongoose.connect('mongodb://127.0.0.1:27017/diplom', {
//   useNewUrlParser: true,
// });

mongoose.connect('mongodb://0.0.0.0:27017/diplom', {
  useNewUrlParser: true,
});

// mongoose.connect('mongodb://localhost:27017/dip', {
//   useNewUrlParser: true,
// });

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
