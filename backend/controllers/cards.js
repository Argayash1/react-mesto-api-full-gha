// Импорт классов ошибок из mongoose.Error
const { CastError, ValidationError } = require('mongoose').Error;

// Импорт классов ошибок из конструкторов ошибок
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

// Импорт модели user
const Card = require('../models/card');

// Импорт статус-кодов ошибок
const { CREATED_201 } = require('../utils/constants');

// Функция, которая возвращает все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

// Функция, которая создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;

  Card.create({ name, link, owner: userId })
    .then((card) => card.populate('owner'))
    // вернём записанные в базу данные
    .then((card) => res.status(CREATED_201).send(card))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err instanceof ValidationError) {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Переданы некорректные данные при создании карточки: ${errorMessage}`));
      } else {
        next(err);
      }
    });
};

// Функция, которая удаляет карточку по идентификатору
const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (userId !== card.owner.toString()) {
        throw new ForbiddenError('К сожалению, Вы не можете удалить эту карточку');
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => res.send({ message: 'Пост удалён' }));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Передан некорректный ID карточки'));
      } else {
        next(err);
      }
    });
};

// Функция изменения статуса лайка карточки
const changeLikeCardStatus = (req, res, next, likeOtpions) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      return Card.findByIdAndUpdate(cardId, likeOtpions, { new: true })
        .then((cardForLike) => cardForLike.populate(['owner', 'likes']))
        .then((cardForLike) => { res.send(cardForLike); });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка'));
      } else {
        next(err);
      }
    });
};

// Функция-декоратор постановки лайка карточки
const likeCard = (req, res, next) => {
  const { _id: userId } = req.user;
  // добавить _id пользователя в массив, если его там нет
  const likeOptions = { $addToSet: { likes: userId } };
  changeLikeCardStatus(req, res, next, likeOptions);
};

// Функция-декоратор снятия лайка карточки
const dislikeCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const likeOptions = { $pull: { likes: userId } }; // убрать _id пользователя из массива
  changeLikeCardStatus(req, res, next, likeOptions);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
