const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const applicationRoutes = require('./routes/applications');
const userRoutes = require('./routes/users');
const eventRegistrationRoutes = require('./routes/eventRegistrations');
const { telegramBot } = require('./services/telegramBot');

// Konfiguratsiyani yuklash
dotenv.config();

// Express app yaratish
const app = express();

// Middleware
app.use(cors({
  origin: ['https://buloqboshiyoshlar-roan.vercel.app', 'https://buloqboshi-yoshlar-agentligi.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static fayllar uchun
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// MongoDB ulanishi
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buloqboshi-startuplar')
  .then(() => console.log('MongoDB ga ulanish muvaffaqiyatli'))
  .catch((err) => console.error('MongoDB ulanish xatosi:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/event-registrations', eventRegistrationRoutes);

// Telegram botni ishga tushirish
if (process.env.TELEGRAM_BOT_TOKEN) {
  console.log('Telegram bot ishga tushirildi');
} else {
  console.log('Telegram bot token topilmadi');
}

// Asosiy route
app.get('/', (req, res) => {
  res.json({ message: 'Buloqboshi Startuplar API ishga tushdi' });
});

// Xatoliklar uchun middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Server xatosi',
    error: err.message // Xatolik sababini qaytarish
  });
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`);
});

module.exports = app;
