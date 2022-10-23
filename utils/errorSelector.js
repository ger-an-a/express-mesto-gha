function errorSelector(err) {
  let code, message;
  if (err.name === 'CastError') {
    code = 404;
    message = 'Не найден запрашиваемый элемент';
  } else if (err.name === 'ValidationError') {
    code = 400;
    message = 'Переданы некорректные данные';
  } else {
    code = 500;
    message = 'Произошла ошибка';
  }
  return { code, message };
}

module.exports = errorSelector;