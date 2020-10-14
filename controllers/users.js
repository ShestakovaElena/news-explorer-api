const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict_err');

const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    throw new BadRequestError('Неверный формат id пользователя');
  } else {
    return User.findById(req.user._id)
      .orFail(
        () => new NotFoundError('Пользователь не найден'),
      )
      .then((user) => res.send({ name: user.name, email: user.email }))
      .catch(next);
  }
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.status(201).send({ message: 'Пользователь успешно зарегистрирован!' }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с такими данными уже существует'));
      } else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
