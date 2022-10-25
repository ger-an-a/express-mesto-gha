const User = require('../models/user');
const errorSelector = require('../utils/errorSelector');
const CustomError = require('../utils/CustomError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      errorSelector(res, err.name, 'при загрузке всех пользователей');
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else throw new CustomError('NotFound');
    })
    .catch((err) => {
      errorSelector(res, err.name, 'при загрузке данных профиля');
    });
};

module.exports.createUser = (req, res) => {
  const { name, about } = req.body;
  User.create({ name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorSelector(res, err.name, 'при создании профиля');
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorSelector(res, err.name, 'при обновлении профиля');
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorSelector(res, err.name, 'при обновлении аватара');
    });
};
