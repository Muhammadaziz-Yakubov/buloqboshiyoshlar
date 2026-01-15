const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Event = require('../models/Event');
const { authenticate, adminOnly } = require('../middleware/auth');
const { sendEventToTelegram, deleteTelegramPost, updateTelegramPost } = require('../services/telegramBot');

// File upload konfiguratsiyasi
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/events/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'event-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: function (req, file, cb) {
    // Faqat rasm fayllariga ruxsat berish
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Faqat rasm fayllari yuklanishi mumkin'), false);
    }
    cb(null, true);
  }
});

// Barcha tadbirlarni olish (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'active' } = req.query;
    
    let filter = {};
    if (status === 'active') {
      filter.isActive = true;
    }

    const events = await Event.find(filter)
      .sort({ date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Event.countDocuments(filter);

    res.json({
      message: 'Tadbirlar muvaffaqiyatli olindi',
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get events xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Bitta tadbirni olish (public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ 
        message: 'Tadbir topilmadi' 
      });
    }

    res.json({
      message: 'Tadbir muvaffaqiyatli olindi',
      event
    });

  } catch (error) {
    console.error('Get event xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Yangi tadbir yaratish (admin only)
router.post('/', authenticate, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;

    // Maydonlarni tekshirish
    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({ 
        message: 'Barcha maydonlar kiritilishi shart' 
      });
    }

    // Rasm faylini tekshirish
    if (!req.file) {
      return res.status(400).json({ 
        message: 'Tadbir rasmi yuklanishi shart' 
      });
    }

    // Tadbir yaratish
    const eventData = {
      title,
      description,
      date: new Date(date),
      time,
      location,
      image: `/uploads/events/${req.file.filename}`
    };

    const event = new Event(eventData);
    await event.save();

    // Telegram ga post yuborish
    try {
      const telegramPostId = await sendEventToTelegram({
        ...eventData,
        imagePath: eventData.image,
        eventId: event._id.toString()
      });

      // Telegram post ID ni saqlash
      if (telegramPostId) {
        event.telegramPostId = telegramPostId;
        await event.save();
      }

    } catch (telegramError) {
      console.error('Telegram ga yuborish xatosi:', telegramError);
      // Telegram xatosi bo'lsa ham, tadbir yaratish davom etadi
    }

    res.status(201).json({
      message: 'Tadbir muvaffaqiyatli yaratildi',
      event
    });

  } catch (error) {
    console.error('Create event xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Tadbirni yangilash (admin only)
router.put('/:id', authenticate, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;
    const eventId = req.params.id;

    // Tadbirni topish
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ 
        message: 'Tadbir topilmadi' 
      });
    }

    // Ma'lumotlarni yangilash
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = new Date(date);
    if (time) event.time = time;
    if (location) event.location = location;

    // Agar yangi rasm yuklangan bo'lsa
    if (req.file) {
      event.image = `/uploads/events/${req.file.filename}`;
    }

    await event.save();

    // Telegram postni yangilash
    if (event.telegramPostId) {
      try {
        const newTelegramPostId = await updateTelegramPost(event.telegramPostId, {
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          imageUrl: `${process.env.BACKEND_URL || 'http://localhost:5000'}${event.image}`
        });

        event.telegramPostId = newTelegramPostId;
        await event.save();

      } catch (telegramError) {
        console.error('Telegram postni yangilash xatosi:', telegramError);
      }
    }

    res.json({
      message: 'Tadbir muvaffaqiyatli yangilandi',
      event
    });

  } catch (error) {
    console.error('Update event xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Tadbirni o'chirish (admin only)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const eventId = req.params.id;

    // Tadbirni topish
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ 
        message: 'Tadbir topilmadi' 
      });
    }

    // Telegram postni o'chirish
    if (event.telegramPostId) {
      try {
        await deleteTelegramPost(event.telegramPostId);
      } catch (telegramError) {
        console.error('Telegram postni o\'chirish xatosi:', telegramError);
      }
    }

    // Tadbirni o'chirish
    await Event.findByIdAndDelete(eventId);

    res.json({
      message: 'Tadbir muvaffaqiyatli o\'chirildi'
    });

  } catch (error) {
    console.error('Delete event xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Tadbir statusini o'zgartirish (active/inactive)
router.patch('/:id/status', authenticate, adminOnly, async (req, res) => {
  try {
    const { isActive } = req.body;
    const eventId = req.params.id;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ 
        message: 'Status boolean qiymat bo\'lishi kerak' 
      });
    }

    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ 
        message: 'Tadbir topilmadi' 
      });
    }

    event.isActive = isActive;
    await event.save();

    res.json({
      message: 'Tadbir statusi muvaffaqiyatli o\'zgartirildi',
      event
    });

  } catch (error) {
    console.error('Update event status xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

module.exports = router;
