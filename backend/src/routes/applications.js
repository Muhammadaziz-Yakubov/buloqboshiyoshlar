const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Application = require('../models/Application');
const { authenticate, adminOnly, ownerOnly } = require('../middleware/auth');
const { sendStartupApplicationToTelegram } = require('../services/telegramBot');

// Fayl yuklash konfiguratsiyasi - production uchun /tmp papkaga
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Production da /tmp papkaga yuklash (serverless uchun)
    const uploadDir = process.env.NODE_ENV === 'production' ? '/tmp/uploads' : 'uploads/applications/';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'app-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter: function (req, file, cb) {
    // Hujjat fayllariga ruxsat berish
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Faqat rasm va hujjat fayllari yuklanishi mumkin'));
    }
  }
});

// Barcha arizalarni olish (admin only)
router.get('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const applications = await Application.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Application.countDocuments(filter);

    // Statistikani hisoblash
    const stats = {
      total: await Application.countDocuments(),
      pending: await Application.countDocuments({ status: 'pending' }),
      reviewing: await Application.countDocuments({ status: 'reviewing' }),
      accepted: await Application.countDocuments({ status: 'accepted' }),
      rejected: await Application.countDocuments({ status: 'rejected' })
    };

    res.json({
      message: 'Arizalar muvaffaqiyatli olindi',
      applications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      stats
    });

  } catch (error) {
    console.error('Get applications xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Bitta arizani olish (admin only yoki o'z arizasi)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: 'Ariza topilmadi'
      });
    }

    // Faqat adminlar yoki ariza egasi ko'rishi mumkin
    if (req.user.role !== 'admin' && req.user.role !== 'owner') {
      // Oddiy user o'z arizasini ko'ra oladi (agar kerak bo'lsa)
      // Bu yerda qo'shimcha tekshirish qo'shish mumkin
      return res.status(403).json({
        message: 'Sizda bu arizani ko\'rish uchun ruxsat yo\'q'
      });
    }

    res.json({
      message: 'Ariza muvaffaqiyatli olindi',
      application
    });

  } catch (error) {
    console.error('Get application xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Yangi startup ariza yaratish (public)
router.post('/', upload.array('attachments', 5), async (req, res) => {
  try {
    const { startupName, founders, email, description, teamMembers, phone } = req.body;

    // Maydonlarni tekshirish
    if (!startupName || !founders || !email || !description || !teamMembers || !phone) {
      return res.status(400).json({
        message: 'Barcha maydonlar kiritilishi shart'
      });
    }

    // Team members ni parse qilish
    let parsedTeamMembers = teamMembers;
    if (typeof teamMembers === 'string') {
      try {
        parsedTeamMembers = JSON.parse(teamMembers);
      } catch (parseError) {
        return res.status(400).json({
          message: 'Jamoa a\'zolari ma\'lumotlari noto\'g\'ri formatda'
        });
      }
    }

    // Founders ni parse qilish
    let parsedFounders = founders;
    if (typeof founders === 'string') {
      try {
        parsedFounders = JSON.parse(founders);
      } catch (parseError) {
        parsedFounders = [founders];
      }
    }

    // Fayllarni qo'shish
    const attachments = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        // Production da base64, development da file path
        if (process.env.NODE_ENV === 'production') {
          // Faylni base64 ga o'tkazish va databasega saqlash
          const fileData = fs.readFileSync(file.path);
          const base64Data = fileData.toString('base64');
          attachments.push({
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            data: base64Data
          });
        } else {
          attachments.push(`/uploads/applications/${file.filename}`);
        }
      });
    }

    const applicationData = {
      startupName,
      founders: parsedFounders,
      email,
      description,
      teamMembers: parsedTeamMembers,
      attachments,
      phone
    };

    const application = new Application(applicationData);
    await application.save();

    // Telegram bot orqali xabar yuborish
    try {
      await sendStartupApplicationToTelegram({
        ...application.toObject(),
        createdAt: application.createdAt
      });
    } catch (telegramError) {
      console.error('Telegram xabar yuborishda xatolik:', telegramError);
      // Telegram xatoligi uchun ariza yaratishni bekor qilmaymiz
    }

    res.status(201).json({
      message: 'Startup ariza muvaffaqiyatli yuborildi',
      application
    });

  } catch (error) {
    console.error('Create application xatosi:', error);

    // Multer xatolarini alohida qayta ishlash
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          message: 'Fayl hajmi juda katta. Maksimal fayl hajmi: 50MB'
        });
      }
      if (error.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          message: 'Fayllar soni juda ko\'p. Maksimal 5 ta fayl yuklash mumkin'
        });
      }
      if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
          message: 'Noto\'g\'ri fayl maydoni nomi'
        });
      }
      return res.status(400).json({
        message: `Fayl yuklash xatosi: ${error.message}`
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validatsiya xatosi',
        errors: messages
      });
    }

    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Ariza statusini o'zgartirish (admin only)
router.patch('/:id/status', authenticate, adminOnly, async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const applicationId = req.params.id;

    const validStatuses = ['pending', 'reviewing', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Noto\'g\'ri status'
      });
    }

    // Rad etish uchun sabab kerak
    if (status === 'rejected' && !rejectionReason) {
      return res.status(400).json({
        message: 'Rad etish uchun sabab kiritilishi shart'
      });
    }

    const updateData = { status };
    if (status === 'rejected') {
      updateData.rejectionReason = rejectionReason;
    } else {
      updateData.rejectionReason = '';
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      updateData,
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        message: 'Ariza topilmadi'
      });
    }

    res.json({
      message: 'Ariza statusi muvaffaqiyatli o\'zgartirildi',
      application
    });

  } catch (error) {
    console.error('Update application status xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Ariza raqami bo'yicha tekshirish (public)
router.get('/check/:applicationNumber', async (req, res) => {
  try {
    const { applicationNumber } = req.params;

    const application = await Application.findOne({ applicationNumber })
      .select('applicationNumber startupName status rejectionReason createdAt');

    if (!application) {
      return res.status(404).json({
        message: 'Ariza topilmadi. Iltimos, ariza raqamini tekshiring.'
      });
    }

    res.json({
      message: 'Ariza topildi',
      application: {
        applicationNumber: application.applicationNumber,
        startupName: application.startupName,
        status: application.status,
        rejectionReason: application.rejectionReason,
        createdAt: application.createdAt
      }
    });

  } catch (error) {
    console.error('Check application xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Faylni ko'rish (base64 dan)
router.get('/file/:id/:index', authenticate, async (req, res) => {
  try {
    const { id, index } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: 'Ariza topilmadi' });
    }

    const attachment = application.attachments[index];
    if (!attachment) {
      return res.status(404).json({ message: 'Fayl topilmadi' });
    }

    // Production da base64 faylni qaytarish
    if (attachment && attachment.data) {
      const buffer = Buffer.from(attachment.data, 'base64');
      res.set({
        'Content-Type': attachment.mimetype || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${attachment.originalname || 'file'}"`
      });
      res.send(buffer);
    } else if (typeof attachment === 'string') {
      // Development da yoki eski formatda faylni diskdan o'qish
      const filePath = path.join(__dirname, '../../', attachment);
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).json({ message: 'Fayl topilmadi' });
      }
    }
  } catch (error) {
    console.error('Get file xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Arizani o'chirish (owner only)
router.delete('/:id', authenticate, ownerOnly, async (req, res) => {
  try {
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: 'Ariza topilmadi'
      });
    }

    // Fayllarni o'chirish
    if (application.attachments && application.attachments.length > 0) {
      for (const attachment of application.attachments) {
        if (process.env.NODE_ENV === 'production') {
          // Production da base64 fayllar - o'chirish shart emas (database da saqlanadi)
          continue;
        } else {
          // Local faylni o'chirish
          const fullPath = path.join(__dirname, '../../', attachment);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }
      }
    }

    // Arizani o'chirish
    await Application.findByIdAndDelete(applicationId);

    res.json({
      message: 'Ariza muvaffaqiyatli o\'chirildi'
    });

  } catch (error) {
    console.error('Delete application xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});


// Arizalar statistikasi (admin only)
router.get('/stats/summary', authenticate, adminOnly, async (req, res) => {
  try {
    const stats = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalApplications = await Application.countDocuments();
    const thisMonthApplications = await Application.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    res.json({
      message: 'Statistika muvaffaqiyatli olindi',
      stats: {
        byStatus: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        total: totalApplications,
        thisMonth: thisMonthApplications
      }
    });

  } catch (error) {
    console.error('Get stats xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

module.exports = router;
