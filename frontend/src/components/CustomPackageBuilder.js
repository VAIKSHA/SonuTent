import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import BookingModal from './BookingModal';

const CustomPackageBuilder = ({ onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    tentType: '',
    lighting: '',
    theme: '',
    addOns: [],
    days: 1
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const options = {
    tentType: [
      { name: 'Simple', price: 1500 },
      { name: 'Premium', price: 2500 },
      { name: 'Royal', price: 4000 }
    ],
    lighting: [
      { name: 'Basic', price: 500 },
      { name: 'LED', price: 1000 },
      { name: 'Fairy', price: 800 },
      { name: 'Laser', price: 1500 }
    ],
    theme: [
      { name: 'Traditional', price: 800 },
      { name: 'Modern', price: 1200 },
      { name: 'Floral', price: 1000 },
      { name: 'Royal', price: 1500 }
    ],
    addOns: [
      { name: 'Stage Setup', price: 2000 },
      { name: 'Entry Gate', price: 1500 },
      { name: 'DJ System', price: 3000 },
      { name: 'Food Area', price: 2500 },
      { name: 'Photo Booth', price: 1800 },
      { name: 'Dance Floor', price: 2200 }
    ]
  };

  const coupons = {
    'LIGHT10': 0.1,
    'WEDDING15': 0.15,
    'FIRST20': 0.2
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedOptions, discount]);

  const calculateTotal = () => {
    let basePrice = 0;
    
    // Add tent type price
    if (selectedOptions.tentType) {
      const tent = options.tentType.find(t => t.name === selectedOptions.tentType);
      basePrice += tent ? tent.price : 0;
    }
    
    // Add lighting price
    if (selectedOptions.lighting) {
      const lighting = options.lighting.find(l => l.name === selectedOptions.lighting);
      basePrice += lighting ? lighting.price : 0;
    }
    
    // Add theme price
    if (selectedOptions.theme) {
      const theme = options.theme.find(t => t.name === selectedOptions.theme);
      basePrice += theme ? theme.price : 0;
    }
    
    // Add add-ons price
    selectedOptions.addOns.forEach(addOn => {
      const addon = options.addOns.find(a => a.name === addOn);
      basePrice += addon ? addon.price : 0;
    });
    
    // Multiply by days
    const totalBeforeDiscount = basePrice * selectedOptions.days;
    const finalTotal = totalBeforeDiscount * (1 - discount);
    
    setTotalPrice(finalTotal);
  };

  const handleOptionSelect = (category, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: option
    }));
  };

  const handleAddOnToggle = (addOn) => {
    setSelectedOptions(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOn)
        ? prev.addOns.filter(a => a !== addOn)
        : [...prev.addOns, addOn]
    }));
  };

  const handleDaysChange = (increment) => {
    setSelectedOptions(prev => ({
      ...prev,
      days: Math.max(1, prev.days + increment)
    }));
  };

  const applyCoupon = () => {
    if (coupons[couponCode.toUpperCase()]) {
      setDiscount(coupons[couponCode.toUpperCase()]);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleBookNow = () => {
    if (!selectedOptions.tentType || !selectedOptions.lighting || !selectedOptions.theme) {
      alert('Please select tent type, lighting, and theme');
      return;
    }
    
    const customPackage = {
      name: 'Custom Package',
      price: totalPrice,
      options: selectedOptions,
      days: selectedOptions.days,
      discount: discount * 100
    };
    
    setShowBookingModal(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-playfair font-bold text-royal">
              Build Your Custom Package
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Tent Type */}
              <div>
                <h3 className="text-lg font-semibold text-royal mb-3">Tent Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {options.tentType.map((tent) => (
                    <button
                      key={tent.name}
                      onClick={() => handleOptionSelect('tentType', tent.name)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedOptions.tentType === tent.name
                          ? 'border-royal bg-royal text-white'
                          : 'border-gray-300 hover:border-royal'
                      }`}
                    >
                      <div className="font-semibold">{tent.name}</div>
                      <div className="text-sm">₹{tent.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lighting */}
              <div>
                <h3 className="text-lg font-semibold text-royal mb-3">Lighting</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {options.lighting.map((light) => (
                    <button
                      key={light.name}
                      onClick={() => handleOptionSelect('lighting', light.name)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedOptions.lighting === light.name
                          ? 'border-royal bg-royal text-white'
                          : 'border-gray-300 hover:border-royal'
                      }`}
                    >
                      <div className="font-semibold">{light.name}</div>
                      <div className="text-sm">₹{light.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <h3 className="text-lg font-semibold text-royal mb-3">Theme</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {options.theme.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => handleOptionSelect('theme', theme.name)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedOptions.theme === theme.name
                          ? 'border-royal bg-royal text-white'
                          : 'border-gray-300 hover:border-royal'
                      }`}
                    >
                      <div className="font-semibold">{theme.name}</div>
                      <div className="text-sm">₹{theme.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="text-lg font-semibold text-royal mb-3">Add-ons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {options.addOns.map((addon) => (
                    <button
                      key={addon.name}
                      onClick={() => handleAddOnToggle(addon.name)}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        selectedOptions.addOns.includes(addon.name)
                          ? 'border-royal bg-royal text-white'
                          : 'border-gray-300 hover:border-royal'
                      }`}
                    >
                      <div className="font-semibold">{addon.name}</div>
                      <div className="text-sm">₹{addon.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-royal mb-4">Package Summary</h3>
              
              {/* Days selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Days
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDaysChange(-1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-xl font-semibold px-4">
                    {selectedOptions.days}
                  </span>
                  <button
                    onClick={() => handleDaysChange(1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Selected options */}
              <div className="space-y-2 mb-4 text-sm">
                {selectedOptions.tentType && (
                  <div>Tent: {selectedOptions.tentType}</div>
                )}
                {selectedOptions.lighting && (
                  <div>Lighting: {selectedOptions.lighting}</div>
                )}
                {selectedOptions.theme && (
                  <div>Theme: {selectedOptions.theme}</div>
                )}
                {selectedOptions.addOns.length > 0 && (
                  <div>Add-ons: {selectedOptions.addOns.join(', ')}</div>
                )}
              </div>

              {/* Coupon */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter code"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-royal text-white rounded-lg hover:bg-blue-800"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <div className="text-green-600 text-sm mt-1">
                    {(discount * 100).toFixed(0)}% discount applied!
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="text-2xl font-bold text-royal">
                  Total: ₹{totalPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  For {selectedOptions.days} day{selectedOptions.days > 1 ? 's' : ''}
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full mt-4 py-3 gold-gradient text-royal rounded-lg font-semibold hover:opacity-90"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {showBookingModal && (
        <BookingModal
          package={{
            name: 'Custom Package',
            price: totalPrice,
            options: selectedOptions,
            days: selectedOptions.days
          }}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default CustomPackageBuilder;