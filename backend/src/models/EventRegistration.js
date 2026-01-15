const mongoose = require('mongoose');

const EventRegistrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Tadbir tanlanishi shart']
  },
  firstName: {
    type: String,
    required: [true, 'Ism kiritilishi shart'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Familiya kiritilishi shart'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Telefon raqami kiritilishi shart']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexlar
EventRegistrationSchema.index({ eventId: 1 });
EventRegistrationSchema.index({ phone: 1 });
EventRegistrationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('EventRegistration', EventRegistrationSchema);
