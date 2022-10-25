const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ERROR_CODE404, ERROR_MESSAGE404 } = require('./utils/constants');

const notFound = (req, res) => {
  res.status(ERROR_CODE404).send({ message: ERROR_MESSAGE404 });
};

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use((req, res, next) => {
  req.user = {
    _id: '63546d747227ae89547d9b04',
  };
  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(notFound);

app.listen(PORT, () => {
  console.log(`App listening on port  ${PORT}`);
});
