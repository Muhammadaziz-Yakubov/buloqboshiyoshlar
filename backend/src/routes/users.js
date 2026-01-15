const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate, adminOnly, ownerOnly, USER_ROLES } = require('../middleware/auth');

// Barcha userlarni olish (admin only)
router.get('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    
    let filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      message: 'Userlar muvaffaqiyatli olindi',
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get users xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Bitta userni olish (admin only)
router.get('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ 
        message: 'User topilmadi' 
      });
    }

    res.json({
      message: 'User muvaffaqiyatli olindi',
      user
    });

  } catch (error) {
    console.error('Get user xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// User rolini o'zgartirish (owner only)
router.patch('/:id/role', authenticate, ownerOnly, async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    const validRoles = Object.values(USER_ROLES);
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        message: 'Noto\'g\'ri rol' 
      });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User topilmadi' 
      });
    }

    // O'zini o'zi owner qilishni oldini olish
    if (req.user._id.toString() === userId && role !== USER_ROLES.OWNER) {
      return res.status(403).json({ 
        message: 'Owner o\'z rolini o\'zgartira olmaydi' 
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');

    res.json({
      message: 'User roli muvaffaqiyatli o\'zgartirildi',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update user role xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Userni o'chirish (owner only)
router.delete('/:id', authenticate, ownerOnly, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User topilmadi' 
      });
    }

    // O'zini o'zi o'chirishni oldini olish
    if (req.user._id.toString() === userId) {
      return res.status(403).json({ 
        message: 'Owner o\'zini o\'zi o\'chira olmaydi' 
      });
    }

    await User.findByIdAndDelete(userId);

    res.json({
      message: 'User muvaffaqiyatli o\'chirildi'
    });

  } catch (error) {
    console.error('Delete user xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Userlar statistikasi (admin only)
router.get('/stats/summary', authenticate, adminOnly, async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalUsers = await User.countDocuments();
    const thisMonthUsers = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    res.json({
      message: 'Userlar statistikasi muvaffaqiyatli olindi',
      stats: {
        byRole: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        total: totalUsers,
        thisMonth: thisMonthUsers
      }
    });

  } catch (error) {
    console.error('Get user stats xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Admin yaratish (owner only)
router.post('/admin', authenticate, ownerOnly, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Maydonlarni tekshirish
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Ism, email va parol kiritilishi shart' 
      });
    }

    // Email allaqachon mavjudligini tekshirish
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Bu email bilan allaqachon ro\'yxatdan o\'tilgan' 
      });
    }

    // Yangi admin yaratish
    const admin = new User({
      name,
      email,
      password,
      role: USER_ROLES.ADMIN
    });

    await admin.save();

    // Parolni qaytarib bermaslik
    admin.password = undefined;

    res.status(201).json({
      message: 'Admin muvaffaqiyatli yaratildi',
      user: admin
    });

  } catch (error) {
    console.error('Create admin xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

module.exports = router;
