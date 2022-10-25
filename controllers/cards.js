const Card = require('../models/card');
const errorSelector = require('../utils/errorSelector');
const CustomError = require('../utils/CustomError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      errorSelector(res, err.name, 'при загрузке карточек');
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      errorSelector(res, err.name, 'при создании карточки');
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card !== null) {
        res.send({ data: card });
      } else throw new CustomError('NotFound');
    })
    .catch((err) => {
      errorSelector(res, err.name, 'при удалении карточки');
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card !== null) {
        res.send({ data: card });
      } else throw new CustomError('NotFound');
    })
    .catch((err) => {
      errorSelector(res, err.name, 'при добавлении лайка');
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card !== null) {
        res.send({ data: card });
      } else throw new CustomError('NotFound');
    })
    .catch((err) => {
      errorSelector(res, err.name, 'при удалении лайка');
    });
};
