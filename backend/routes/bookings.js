const express = require('express');
const Joi = require('joi');
const Booking = require('../models/Booking');
const { sendBookingConfirmation } = require('../utils/emailService');
const router = express.Router();

// Validation schema
const bookingSchema = Joi.object({
  name: Joi.string().trim().max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).required(),
  eventDate: Joi.date().greater('now').required(),
  package: Joi.string().valid('Basic', 'Popular', 'Advance', 'Custom Package').required(),
  packageDetails: Joi.object().required(),
  totalPrice: Joi.number().min(0).required(),
  message: Joi.string().max(500).allow('')
});

// Create new booking
router.post('/book', async (req, res) => {
  try {
    // Validate request data
    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details[0].message
      });
    }

    // Check if date is available (basic check - can be enhanced)
    const existingBooking = await Booking.findOne({
      eventDate: {
        $gte: new Date(value.eventDate).setHours(0, 0, 0, 0),
        $lt: new Date(value.eventDate).setHours(23, 59, 59, 999)
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(409).json({
        message: 'This date is already booked. Please choose another date.'
      });
    }

    // Create new booking
    const booking = new Booking(value);
    await booking.save();

    // Send confirmation emails
    try {
      await sendBookingConfirmation(booking);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }

    res.status(201).json({
      message: 'Booking created successfully',
      bookingId: booking._id,
      booking: {
        name: booking.name,
        package: booking.package,
        eventDate: booking.eventDate,
        totalPrice: booking.totalPrice,
        status: booking.status
      }
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      message: 'Failed to create booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Check availability for a specific date
router.post('/check-availability', async (req, res) => {
  try {
    const { eventDate } = req.body;
    
    if (!eventDate) {
      return res.status(400).json({ message: 'Event date is required' });
    }

    const date = new Date(eventDate);
    if (date <= new Date()) {
      return res.status(400).json({ message: 'Event date must be in the future' });
    }

    const existingBooking = await Booking.findOne({
      eventDate: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lt: new Date(date).setHours(23, 59, 59, 999)
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    res.json({
      available: !existingBooking,
      message: existingBooking ? 'Date is already booked' : 'Date is available'
    });

  } catch (error) {
    console.error('Availability check error:', error);
    res.status(500).json({ message: 'Failed to check availability' });
  }
});

// Get all bookings (Admin only - add authentication in production)
router.get('/bookings', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;
    
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (startDate || endDate) {
      query.eventDate = {};
      if (startDate) query.eventDate.$gte = new Date(startDate);
      if (endDate) query.eventDate.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// Update booking status (Admin only)
router.patch('/bookings/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: 'Booking status updated successfully',
      booking
    });

  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Failed to update booking status' });
  }
});

module.exports = router;