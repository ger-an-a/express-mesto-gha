const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { ERROR_CODE404, ERROR_MESSAGE404, regexUrl } = require('./utils/constants');
const { createUser, login } = require('./controllers/users');
const { errorSelector } = require('./utils/errorSelector');
const auth = require('./middlewares/auth');

const notFound = (req, res) => {
  res.status(ERROR_CODE404).send({ message: ERROR_MESSAGE404 });
};

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).max(30).pattern(new RegExp(regexUrl)),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), login);

app.use(auth);

app.use('/users', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).max(30).pattern(new RegExp(regexUrl)),
  }).unknown(true),
}), require('./routes/users'));

app.use('/cards', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), require('./routes/cards'));

app.use(notFound);

app.use(errors());
app.use((err, req, res, next) => {
  errorSelector(res, err);
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port  ${PORT}`);
});
