require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

const app = express();
app.use(cors());
app.use(express.json());

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes); 
// тут

const frontendPath = path.resolve(__dirname, './frontend');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Подключение к MongoDB успешно');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Сервер запущен на порту ${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ Ошибка подключения к MongoDB:', err.message);
  });
