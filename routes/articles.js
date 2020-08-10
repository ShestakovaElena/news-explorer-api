const cardsRouter = require('express').Router();
const { createArticleCheck, getArticleCheck } = require('../middlewares/validator');
const { getArticles, createArticle, deleteArticleById } = require('../controllers/articles');

cardsRouter.get('/', getArticles);
cardsRouter.post('/', createArticleCheck, createArticle);
cardsRouter.delete('/:articleId', getArticleCheck, deleteArticleById);

module.exports = cardsRouter;
