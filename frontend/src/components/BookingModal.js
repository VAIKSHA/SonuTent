import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const BookingModal = ({ package: selectedPackage, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: new Date(),
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      eventDate: date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        package: selectedPackage.name,
        packageDetails: selectedPackage,
        totalPrice: selectedPackage.price,
        eventDate: formData.eventDate.toISOString()
      };

      await axios.post('http://localhost:5001/api/book', bookingData);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-white rounded-lg max-w-md w-full p-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-royal mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing Sonu Tent & Decoration Lighthouse. 
            We'll contact you soon to confirm the details.
          </p>
          <button
            onClick={onClose}
            className="gold-gradient text-royal px-6 py-3 rounded-lg font-semibold"
          >
            Close
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-playfair font-bold text-royal">
              Book Your Event
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Package Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-royal mb-3">
                Package Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-semibold">{selectedPackage.name}</span>
                </div>
                {selectedPackage.days && (
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{selectedPackage.days} day{selectedPackage.days > 1 ? 's' : ''}</span>
                  </div>
                )}
                {selectedPackage.options && (
                  <div className="text-sm space-y-1">
                    {selectedPackage.options.tentType && (
                      <div>Tent: {selectedPackage.options.tentType}</div>
                    )}
                    {selectedPackage.options.lighting && (
                      <div>Lighting: {selectedPackage.options.lighting}</div>
                    )}
                    {selectedPackage.options.theme && (
                      <div>Theme: {selectedPackage.options.theme}</div>
                    )}
                  </div>
                )}
                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between text-lg font-bold text-royal">
                    <span>Total:</span>
                    <span>₹{selectedPackage.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaUser className="inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaEnvelope className="inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaPhone className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaCalendarAlt className="inline mr-2" />
                  Event Date *
                </label>
                <DatePicker
                  selected={formData.eventDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent"
                  placeholderText="Select event date"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent"
                  placeholder="Any special requirements or messages..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 gold-gradient text-royal rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;