const mongoose = require('mongoose');

// Team member schema
const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Jamoa a\'zosi ismi kiritilishi shart'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Jamoa a\'zosi lavozimi kiritilishi shart'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Jamoa a\'zosi emaili kiritilishi shart'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Iltimos to\'g\'ri email kiriting']
  },
  phone: {
    type: String,
    required: [true, 'Jamoa a\'zosi telefoni kiritilishi shart']
  }
});

// Application schema
const ApplicationSchema = new mongoose.Schema({
  applicationNumber: {
    type: String,
    unique: true
  },
  // Ariza turi: 'startup' yoki 'general'
  applicationType: {
    type: String,
    enum: ['startup', 'general'],
    default: 'startup'
  },
  // ===== STARTUP ARIZASI UCHUN MAYDONLAR =====
  startupName: {
    type: String,
    trim: true,
    maxlength: [200, 'Startup nomi 200 ta belgidan oshmasligi kerak']
  },
  founders: {
    type: [String],
    default: []
  },
  email: {
    type: String,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Iltimos to\'g\'ri email kiriting']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Tavsif 2000 ta belgidan oshmasligi kerak']
  },
  teamMembers: {
    type: [TeamMemberSchema],
    default: []
  },
  attachments: {
    type: [String],
    default: []
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  // ===== ODDIY ARIZA UCHUN MAYDONLAR =====
  fullName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
  address: {
    type: String,
    trim: true
  },
  problemType: {
    type: String,
    enum: ['employment', 'education', 'social', 'housing', 'health', 'legal', 'other', '']
  },
  problemDescription: {
    type: String,
    trim: true,
    maxlength: [3000, 'Murojaat matni 3000 ta belgidan oshmasligi kerak']
  },
  // ===== UMUMIY MAYDONLAR =====
  phone: {
    type: String,
    required: [true, 'Telefon raqami kiritilishi shart']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'accepted', 'rejected'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Ariza raqamini generatsiya qilish
ApplicationSchema.pre('save', async function() {
  if (!this.applicationNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Application').countDocuments();
    const number = String(count + 1).padStart(5, '0');
    this.applicationNumber = `BLS-${year}-${number}`;
  }
});

// Virtual field - jamoa a'zolarini soni
ApplicationSchema.virtual('teamSize').get(function() {
  return this.teamMembers.length;
});

// Indexlar qo'shish
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ createdAt: -1 });
ApplicationSchema.index({ eventId: 1 });

module.exports = mongoose.model('Application', ApplicationSchema);
