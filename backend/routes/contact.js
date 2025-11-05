const express = require('express');
const Joi = require('joi');
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');
const router = express.Router();

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().trim().max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).allow(''),
  message: Joi.string().max(1000).required()
});

// Submit contact form
router.post('/contact', async (req, res) => {
  try {
    // Validate request data
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details[0].message
      });
    }

    // Create new contact entry
    const contact = new Contact(value);
    await contact.save();

    // Send notification email to admin
    try {
      await sendContactNotification(contact);
    } catch (emailError) {
      console.error('Contact notification email failed:', emailError);
      // Don't fail the contact submission if email fails
    }

    res.status(201).json({
      message: 'Message sent successfully',
      contactId: contact._id
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      message: 'Failed to send message',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get all contact messages (Admin only)
router.get('/contacts', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// Update contact status (Admin only)
router.patch('/contacts/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({
      message: 'Contact status updated successfully',
      contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ message: 'Failed to update contact status' });
  }
});

module.exports = router;