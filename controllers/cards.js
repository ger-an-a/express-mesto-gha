const Card = require('../models/card');
const errorSelector = require('../utils/errorSelector');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: `${errorSelector(err).message} при загрузке всех карточек` })
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  User.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: `${errorSelector(err).message} при создании карточки` })
    });
};

module.exports.deleteCard = (req, res) => {
  User.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: `${errorSelector(err).message} при удалении карточки` })
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: `${errorSelector(err).message} при добавлении лайка` })
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: `${errorSelector(err).message} при удалении лайка` })
    });
};


