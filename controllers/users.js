const User = require('../models/user');
const errorSelector = require('../utils/errorSelector');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: `${errorSelector(err).message} при загрузке всех пользователей` })
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (user !== null)
        res.send({ data: user })
      else res.status(404).send({ message: 'Не найден' })
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный _id' });
      }
      else res.status(500).send({ message: 'Произошла ошибка' })
    });
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then(user => res.status(201).send({ data: user }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: `${errorSelector(err).message} при создании профиля` })
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: `${errorSelector(err).message} при обновлении профиля` })
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: `${errorSelector(err).message} при обновлении аватара` })
    });
};