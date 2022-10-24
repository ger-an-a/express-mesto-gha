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
  console.log(req.user._id);
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: err })
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
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


