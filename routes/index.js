const router = require('express').Router();
const articlesRouter = require('./articles.js');
const usersRouter = require('./users.js');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { createUser, login } = require('../controllers/users');
const { loginCheck, createUserCheck } = require('../middlewares/validator');

router.post('/signin', loginCheck, login);
router.post('/signup', createUserCheck, createUser);

router.use('/articles', auth, articlesRouter);
router.use('/users', auth, usersRouter);

// eslint-disable-next-line no-unused-vars
router.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
