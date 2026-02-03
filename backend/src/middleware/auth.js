const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { USER_ROLES } = require('../models/User');

// JWT token yaratish
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    // Headerdan yoki query parametrdan token olish
    let token;
    const authHeader = req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Token kiritilmagan' });
    }

    // Tokenni tekshirish
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');

    // Userni topish
    const user = await User.findById(decoded.userId).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'User topilmadi' });
    }

    // Requestga user qo'shish
    req.user = user;
    next();

  } catch (error) {
    console.error('Authentication error:', error);

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Noto\'g\'ri token' });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token muddati o\'tgan' });
    }

    res.status(500).json({ message: 'Server xatosi' });
  }
};

// Rolega asoslangan authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Autentifikatsiya talab qilinadi' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Sizda bu amalni bajarish uchun ruxsat yo\'q'
      });
    }

    next();
  };
};

// Faqat Owner uchun middleware
const ownerOnly = authorize(USER_ROLES.OWNER);

// Owner va Admin uchun middleware
const adminOnly = authorize(USER_ROLES.OWNER, USER_ROLES.ADMIN);

// Barcha rollar uchun middleware (autentifikatsiyadan o'tgan foydalanuvchilar)
const authenticatedOnly = authorize(USER_ROLES.OWNER, USER_ROLES.ADMIN, USER_ROLES.USER);

module.exports = {
  generateToken,
  authenticate,
  authorize,
  ownerOnly,
  adminOnly,
  authenticatedOnly,
  USER_ROLES
};
