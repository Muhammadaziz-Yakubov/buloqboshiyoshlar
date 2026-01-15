const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/EventRegistration');
const Event = require('../models/Event');
const { authenticate, adminOnly } = require('../middleware/auth');

// Yangi ro'yxatdan o'tish (public)
router.post('/', async (req, res) => {
  try {
    const { eventId, firstName, lastName, phone } = req.body;

    // Maydonlarni tekshirish
    if (!eventId || !firstName || !lastName || !phone) {
      return res.status(400).json({ 
        message: 'Barcha maydonlar kiritilishi shart' 
      });
    }

    // Tadbir mavjudligini tekshirish
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ 
        message: 'Tadbir topilmadi' 
      });
    }

    // Tadbir faol ekanligini tekshirish
    if (!event.isActive) {
      return res.status(400).json({ 
        message: 'Bu tadbir uchun ro\'yxatdan o\'tish yopilgan' 
      });
    }

    // Avval ro'yxatdan o'tganligini tekshirish
    const existingRegistration = await EventRegistration.findOne({
      eventId,
      phone
    });

    if (existingRegistration) {
      return res.status(400).json({ 
        message: 'Siz allaqachon bu tadbirga ro\'yxatdan o\'tgansiz' 
      });
    }

    // Ro'yxatdan o'tish
    const registration = new EventRegistration({
      eventId,
      firstName,
      lastName,
      phone
    });

    await registration.save();

    res.status(201).json({
      message: 'Ro\'yxatdan muvaffaqiyatli o\'tdingiz',
      registration
    });

  } catch (error) {
    console.error('Event registration xatosi:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validatsiya xatosi', 
        errors: messages 
      });
    }
    
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Tadbir bo'yicha ro'yxatdan o'tganlarni olish (admin only)
router.get('/event/:eventId', authenticate, adminOnly, async (req, res) => {
  try {
    const { eventId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const registrations = await EventRegistration.find({ eventId })
      .populate('eventId', 'title date')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await EventRegistration.countDocuments({ eventId });

    res.json({
      message: 'Ro\'yxatdan o\'tganlar muvaffaqiyatli olindi',
      registrations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get registrations xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Barcha ro'yxatdan o'tganlarni olish (admin only)
router.get('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 20, eventId } = req.query;

    let filter = {};
    if (eventId) filter.eventId = eventId;

    const registrations = await EventRegistration.find(filter)
      .populate('eventId', 'title date')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await EventRegistration.countDocuments(filter);

    res.json({
      message: 'Ro\'yxatdan o\'tganlar muvaffaqiyatli olindi',
      registrations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get all registrations xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Ro'yxatdan o'tish statusini o'zgartirish (admin only)
router.patch('/:id/status', authenticate, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const registrationId = req.params.id;

    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Noto\'g\'ri status' 
      });
    }

    const registration = await EventRegistration.findByIdAndUpdate(
      registrationId,
      { status },
      { new: true }
    ).populate('eventId', 'title date');

    if (!registration) {
      return res.status(404).json({ 
        message: 'Ro\'yxatdan o\'tish topilmadi' 
      });
    }

    res.json({
      message: 'Status muvaffaqiyatli o\'zgartirildi',
      registration
    });

  } catch (error) {
    console.error('Update registration status xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Ro'yxatdan o'tishni o'chirish (admin only)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const registration = await EventRegistration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ 
        message: 'Ro\'yxatdan o\'tish topilmadi' 
      });
    }

    res.json({
      message: 'Ro\'yxatdan o\'tish muvaffaqiyatli o\'chirildi'
    });

  } catch (error) {
    console.error('Delete registration xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Statistika (admin only)
router.get('/stats/summary', authenticate, adminOnly, async (req, res) => {
  try {
    const totalRegistrations = await EventRegistration.countDocuments();
    
    const byEvent = await EventRegistration.aggregate([
      {
        $group: {
          _id: '$eventId',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: '_id',
          as: 'event'
        }
      },
      {
        $unwind: '$event'
      },
      {
        $project: {
          eventTitle: '$event.title',
          count: 1
        }
      }
    ]);

    res.json({
      message: 'Statistika muvaffaqiyatli olindi',
      stats: {
        total: totalRegistrations,
        byEvent
      }
    });

  } catch (error) {
    console.error('Get stats xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

module.exports = router;
