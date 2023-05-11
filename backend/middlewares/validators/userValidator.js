const { celebrate, Joi } = require('celebrate');
const { regEx } = require('../../utils/constants');

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regEx),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userIdValidator = celebrate({
  // валидируем параметры, hex - шестнадцатеричная строка
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24)
      .required(),
  }),
});

const userDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regEx),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  userIdValidator,
  userDataValidator,
  userAvatarValidator,
};
