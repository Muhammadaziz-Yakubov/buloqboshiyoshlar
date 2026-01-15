const mongoose = require('mongoose');

// Event schema
const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tadbir sarlavhasi kiritilishi shart'],
    trim: true,
    maxlength: [200, 'Sarlavha 200 ta belgidan oshmasligi kerak']
  },
  description: {
    type: String,
    required: [true, 'Tadbir tavsifi kiritilishi shart'],
    trim: true,
    maxlength: [2000, 'Tavsif 2000 ta belgidan oshmasligi kerak']
  },
  date: {
    type: Date,
    required: [true, 'Tadbir sanasi kiritilishi shart']
  },
  time: {
    type: String,
    required: [true, 'Tadbir vaqti kiritilishi shart'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Vaqt formati HH:MM bo\'lishi kerak']
  },
  location: {
    type: String,
    required: [true, 'Tadbir joyi kiritilishi shart'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Tadbir rasmi kiritilishi shart']
  },
  telegramPostId: {
    type: String,
    optional: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexlar qo'shish
EventSchema.index({ date: 1 });
EventSchema.index({ isActive: 1 });

module.exports = mongoose.model('Event', EventSchema);
