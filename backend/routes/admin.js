const express = require('express');
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const router = express.Router();

// Dashboard stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const stats = await Promise.all([
      // Total bookings
      Booking.countDocuments(),
      
      // This month bookings
      Booking.countDocuments({
        createdAt: { $gte: startOfMonth }
      }),
      
      // Pending bookings
      Booking.countDocuments({ status: 'pending' }),
      
      // Total revenue this year
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfYear },
            status: { $in: ['confirmed', 'completed'] }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalPrice' }
          }
        }
      ]),
      
      // Unread contacts
      Contact.countDocuments({ status: 'new' }),
      
      // Recent bookings
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name package eventDate totalPrice status createdAt'),
      
      // Upcoming events
      Booking.find({
        eventDate: { $gte: today },
        status: { $in: ['confirmed', 'pending'] }
      })
        .sort({ eventDate: 1 })
        .limit(5)
        .select('name package eventDate totalPrice status')
    ]);

    const [
      totalBookings,
      monthlyBookings,
      pendingBookings,
      revenueResult,
      unreadContacts,
      recentBookings,
      upcomingEvents
    ] = stats;

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      stats: {
        totalBookings,
        monthlyBookings,
        pendingBookings,
        totalRevenue,
        unreadContacts
      },
      recentBookings,
      upcomingEvents
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
});

// Monthly revenue chart data
router.get('/dashboard/revenue-chart', async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    
    const revenueData = await Booking.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1)
          },
          status: { $in: ['confirmed', 'completed'] }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$totalPrice' },
          bookings: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    // Fill missing months with 0
    const months = Array.from({ length: 12 }, (_, i) => {
      const monthData = revenueData.find(item => item._id === i + 1);
      return {
        month: i + 1,
        revenue: monthData ? monthData.revenue : 0,
        bookings: monthData ? monthData.bookings : 0
      };
    });

    res.json({ revenueData: months });

  } catch (error) {
    console.error('Revenue chart error:', error);
    res.status(500).json({ message: 'Failed to fetch revenue data' });
  }
});

// Package popularity
router.get('/dashboard/package-stats', async (req, res) => {
  try {
    const packageStats = await Booking.aggregate([
      {
        $group: {
          _id: '$package',
          count: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({ packageStats });

  } catch (error) {
    console.error('Package stats error:', error);
    res.status(500).json({ message: 'Failed to fetch package stats' });
  }
});

module.exports = router;