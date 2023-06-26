const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const searchRouter = require('./routes/search');

const PORT = process.env.PORT || 3100;

app.use('/', searchRouter);

app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message);
  console.log(`Сервер запущен на http://localhost:${PORT} `);
});
