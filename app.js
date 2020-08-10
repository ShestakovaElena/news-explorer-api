require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/newsexplorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
