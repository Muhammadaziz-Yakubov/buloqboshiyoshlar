const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User rollari
const USER_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  USER: 'user'
};

// User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ism kiritilishi shart'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email kiritilishi shart'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Iltimos to\'g\'ri email kiriting']
  },
  password: {
    type: String,
    required: [true, 'Parol kiritilishi shart'],
    minlength: [6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'],
    select: false // Parolni default olib kelmaslik uchun
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER
  }
}, {
  timestamps: true
});

// Parolni hash qilish uchun pre-save middleware
UserSchema.pre('save', async function() {
  // Parol o'zgarmagan bo'lsa, keyingisiga o'tamiz
  if (!this.isModified('password')) return;
  
  // Async ravishda ishlash
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Parolni solishtirish metodi
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
module.exports.USER_ROLES = USER_ROLES;
