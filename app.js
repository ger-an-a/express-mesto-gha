const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const notFound = (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use((req, res, next) => {
  req.user = {
    _id: '63546d747227ae89547d9b04'
  };
  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use(notFound);

app.listen(PORT, () => {
  console.log(`App listening on port  ${PORT}`)
})