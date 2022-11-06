const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { regexUrl } = require('../utils/constants');
const {
  getUsers, getUser, getMyInfo, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMyInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }).unknown(true),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).max(30).pattern(new RegExp(regexUrl)),
  }).unknown(true),
}), updateAvatar);

module.exports = router;
