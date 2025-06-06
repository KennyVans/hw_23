require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Подключение к MongoDB успешно');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Сервер запущен на порту ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ Ошибка подключения к MongoDB:', err.message);
  });