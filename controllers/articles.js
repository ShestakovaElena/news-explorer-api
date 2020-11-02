const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getArticles = (req, res, next) => {
  const owner = req.user;

  Article.find({ owner })
    .then((articles) => {
      if (articles.length === 0) {
        throw new NotFoundError('Нет сохраненных статей');
      }
      res.json(articles);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => new NotFoundError(`Статья с _id ${req.params.articleId} не найдена`))
    .then((article) => {
      if (JSON.stringify(article.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить чужую статью');
      }
      return article.remove();
    })
    .then((article) => res.send({ data: article, message: 'Статья удалена' }))
    .catch(next);
};
