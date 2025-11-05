const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  eventDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  package: {
    type: String,
    required: true,
    enum: ['Basic', 'Popular', 'Advance', 'Custom Package']
  },
  packageDetails: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  message: {
    type: String,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
bookingSchema.index({ eventDate: 1, status: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);