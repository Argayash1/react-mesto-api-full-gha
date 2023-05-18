// Импорт роутеров
const router = require('express').Router(); // импортируем роутер из express
const users = require('./users'); // импортируем роутер users.js
const cards = require('./cards'); // импортируем роутер cards.js

// Импорт миддлвэра для авторизации
const auth = require('../middlewares/auth');

// Импорт кастомного класса ошибок NotFoundError
const NotFoundError = require('../errors/NotFoundError');

// Импорт контроллеров и валидаторов
const { createUser, login, logout } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../middlewares/validators/userValidator');

// роуты, не требующие авторизации - регистрация и логин
router.post('/signup', createUserValidator, createUser); // добавили роутер для регистрации
router.post('/signin', loginValidator, login); // добавили роутеры для авторизации

// роуты, которым авторизация нужна - users и cards
router.use('/users', auth, users); // добавили роутеры для пользователей
router.use('/cards', auth, cards); // добавили роутеры для карточек
router.get('/signout', auth, logout); // добавили роутер для выхода из системы (очищзения куки)

// роут для запросов по несуществующим URL
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
});

module.exports = router; // экспортировали этот роутер
