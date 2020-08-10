const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/bad-request-err');

const loginCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(30),
  }),
});

const createUserCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(30),
  }),
});

const getArticleCheck = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
});

const createArticleCheck = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2).max(30),
    date: Joi.string().required().min(2).max(30),
    source: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadRequestError('Введите корректную ссылку');
      } else { return value; }
    }),
    image: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadRequestError('Введите корректную ссылку');
      } else { return value; }
    }),
  }),
});

module.exports = {
  loginCheck, createUserCheck, createArticleCheck, getArticleCheck,
};
