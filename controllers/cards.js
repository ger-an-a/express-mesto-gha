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
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => {
      res.status(errorSelector(err).code).send({ message: 'Ошибка' })
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if (card !== null)
        res.send({ data: card })
      else res.status(404).send({ message: 'Не найден' })
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный _id' });
      }
      else res.status(500).send({ message: 'Произошла ошибка' })
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true
    },
  )
    .then(card => {
      if (card !== null)
        res.send({ data: card })
      else res.status(404).send({ message: 'Не найден' })
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный _id' });
      }
      else res.status(500).send({ message: 'Произошла ошибка' })
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true
    },
  )
    .then(card => {
      if (card !== null)
        res.send({ data: card })
      else res.status(404).send({ message: 'Не найден' })
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный _id' });
      }
      else res.status(500).send({ message: 'Произошла ошибка' })
    });
};


