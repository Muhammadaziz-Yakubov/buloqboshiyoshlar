const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, authenticate, USER_ROLES } = require('../middleware/auth');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Maydonlarni tekshirish
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email va parol kiritilishi shart' 
      });
    }

    // Userni topish (parol bilan)
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Email yoki parol noto\'g\'ri' 
      });
    }

    // Parolni tekshirish
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Email yoki parol noto\'g\'ri' 
      });
    }

    // Token yaratish
    const token = generateToken(user._id);

    // Parolni qaytarib bermaslik
    user.password = undefined;

    res.json({
      message: 'Login muvaffaqiyatli',
      user,
      token
    });

  } catch (error) {
    console.error('Login xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Get current user (authenticated user)
router.get('/me', authenticate, async (req, res) => {
  try {
    // Parolni qaytarib bermaslik
    req.user.password = undefined;
    
    res.json({
      message: 'User ma\'lumotlari muvaffaqiyatli olindi',
      user: req.user
    });

  } catch (error) {
    console.error('Get user xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Update profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;

    // Userni topish va yangilash
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User topilmadi' 
      });
    }

    // Agar email o'zgartirilayotgan bo'lsa, unikaliligini tekshirish
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          message: 'Bu email bilan allaqachon ro\'yxatdan o\'tilgan' 
        });
      }
      user.email = email;
    }

    // Ismni yangilash
    if (name) {
      user.name = name;
    }

    await user.save();

    // Parolni qaytarib bermaslik
    user.password = undefined;

    res.json({
      message: 'Profil muvaffaqiyatli yangilandi',
      user
    });

  } catch (error) {
    console.error('Update profile xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

// Change password
router.put('/password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Maydonlarni tekshirish
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: 'Joriy parol va yangi parol kiritilishi shart' 
      });
    }

    // Userni parol bilan topish
    const user = await User.findById(userId).select('+password');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User topilmadi' 
      });
    }

    // Joriy parolni tekshirish
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ 
        message: 'Joriy parol noto\'g\'ri' 
      });
    }

    // Yangi parolni o'rnatish
    user.password = newPassword;
    await user.save();

    res.json({
      message: 'Parol muvaffaqiyatli o\'zgartirildi'
    });

  } catch (error) {
    console.error('Change password xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
});

module.exports = router;
