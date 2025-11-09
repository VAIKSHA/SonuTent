import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import BookingModal from './BookingModal';

const CustomPackageBuilder = ({ onClose }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [days, setDays] = useState(1);

  const items = [
    { id: 'generator', name: 'Generator/DG', price: 1500, category: 'Power' },
    { id: 'bulb', name: 'Bulb', price: 10, category: 'Lighting' },
    { id: 'tublight', name: 'Tublight', price: 50, category: 'Lighting' },
    { id: 'tent', name: 'Tent (15*15)', price: 2000, category: 'Structure' },
    { id: 'tower', name: 'Tower', price: 2500, category: 'Structure' },
    { id: 'normal_chair', name: 'Normal Chair', price: 10, category: 'Furniture' },
    { id: 'vip_chair', name: 'VIP Chair', price: 30, category: 'Furniture' },
    { id: 'table_rectangle', name: 'Table Rectangle', price: 50, category: 'Furniture' },
    { id: 'table_circle', name: 'Table Circle', price: 50, category: 'Furniture' },
    { id: 'mat', name: 'Mat', price: 50, category: 'Flooring' },
    { id: 'rolax', name: 'Rolax', price: 200, category: 'Flooring' },
    { id: 'gate', name: 'Gate', price: 1000, category: 'Decoration' },
    { id: 'dari', name: 'Dari', price: 50, category: 'Flooring' },
    { id: 'decoration', name: 'Decoration (Jhalar)', price: 500, category: 'Decoration' },
    { id: 'bed', name: 'Bed', price: 100, category: 'Furniture' },
    { id: 'gadda', name: 'Gadda', price: 100, category: 'Furniture' },
    { id: 'kambal', name: 'Kambal', price: 100, category: 'Furniture' },
    { id: 'jaimala_chair', name: 'Jaimala Chair', price: 200, category: 'Furniture' },
    { id: 'horn', name: 'Horn', price: 100, category: 'Sound' },
    { id: 'speaker', name: 'Speaker', price: 200, category: 'Sound' },
    { id: 'patila', name: 'Patila', price: 100, category: 'Utensils' },
    { id: 'karahi', name: 'Karahi', price: 100, category: 'Utensils' },
    { id: 'balti', name: 'Balti', price: 50, category: 'Utensils' },
    { id: 'panja', name: 'Panja', price: 10, category: 'Utensils' },
    { id: 'karchul', name: 'Karchul', price: 10, category: 'Utensils' },
    { id: 'jug', name: 'Jug', price: 10, category: 'Utensils' },
    { id: 'gamla', name: 'Gamla', price: 10, category: 'Utensils' },
    { id: 'tray', name: 'Tray', price: 20, category: 'Utensils' },
    { id: 'drum', name: 'Drum', price: 50, category: 'Utensils' },
    { id: 'chula', name: 'Chula', price: 50, category: 'Cooking' },
    { id: 'gas', name: 'Gas', price: 1000, category: 'Cooking' },
    { id: 'samiyana', name: 'Samiyana', price: 1500, category: 'Structure' }
  ];

  const coupons = {
    'LIGHT10': 0.1,
    'WEDDING15': 0.15,
    'FIRST20': 0.2
  };

  const categories = [...new Set(items.map(item => item.category))];

  useEffect(() => {
    calculateTotal();
  }, [selectedItems, discount, days]);

  const calculateTotal = () => {
    let basePrice = 0;
    
    Object.entries(selectedItems).forEach(([itemId, quantity]) => {
      const item = items.find(i => i.id === itemId);
      if (item && quantity > 0) {
        basePrice += item.price * quantity;
      }
    });
    
    const totalBeforeDiscount = basePrice * days;
    const finalTotal = totalBeforeDiscount * (1 - discount);
    
    setTotalPrice(finalTotal);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateItemQuantity = (itemId, change) => {
    setSelectedItems(prev => {
      const currentQuantity = prev[itemId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [itemId]: newQuantity
      };
    });
  };

  const handleDaysChange = (increment) => {
    setDays(prev => Math.max(1, prev + increment));
  };

  const applyCoupon = () => {
    if (coupons[couponCode.toUpperCase()]) {
      setDiscount(coupons[couponCode.toUpperCase()]);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleBookNow = () => {
    if (Object.keys(selectedItems).length === 0) {
      alert('Please select at least one item');
      return;
    }
    
    const customPackage = {
      name: 'Custom Package',
      price: totalPrice,
      selectedItems: selectedItems,
      days: days,
      discount: discount * 100
    };
    
    setShowBookingModal(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
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
              {/* Search Bar */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent"
                />
              </div>

              {/* Items by Category */}
              {categories.map(category => {
                const categoryItems = filteredItems.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;
                
                return (
                  <div key={category}>
                    <div className="flex items-center mb-4">
                      <div className="h-1 bg-gradient-to-r from-royal to-gold rounded-full flex-1 mr-4"></div>
                      <h3 className="text-xl font-bold text-royal bg-gradient-to-r from-royal to-blue-600 bg-clip-text text-transparent">
                        {category}
                      </h3>
                      <div className="h-1 bg-gradient-to-l from-royal to-gold rounded-full flex-1 ml-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryItems.map((item) => {
                        const quantity = selectedItems[item.id] || 0;
                        const isSelected = quantity > 0;
                        return (
                          <motion.div
                            key={item.id}
                            className={`relative p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
                              isSelected 
                                ? 'border-royal bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg transform scale-105' 
                                : 'border-gray-200 bg-white hover:border-royal hover:shadow-md hover:scale-102'
                            }`}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 bg-royal text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {quantity}
                              </div>
                            )}
                            
                            <div className="flex flex-col h-full">
                              <div className="flex-1 mb-4">
                                <h4 className={`font-bold text-lg mb-2 ${
                                  isSelected ? 'text-royal' : 'text-gray-800 group-hover:text-royal'
                                }`}>
                                  {item.name}
                                </h4>
                                <div className={`text-2xl font-bold ${
                                  isSelected ? 'text-gold' : 'text-royal'
                                }`}>
                                  ₹{item.price.toLocaleString()}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 bg-gray-100 rounded-full p-1">
                                  <button
                                    onClick={() => updateItemQuantity(item.id, -1)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                      quantity === 0 
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                        : 'bg-red-500 text-white hover:bg-red-600 shadow-md'
                                    }`}
                                    disabled={quantity === 0}
                                  >
                                    <FaMinus size={10} />
                                  </button>
                                  <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                                  <button
                                    onClick={() => updateItemQuantity(item.id, 1)}
                                    className="w-8 h-8 rounded-full bg-green-500 text-white hover:bg-green-600 flex items-center justify-center transition-all shadow-md"
                                  >
                                    <FaPlus size={10} />
                                  </button>
                                </div>
                                
                                {isSelected && (
                                  <div className="text-right">
                                    <div className="text-xs text-gray-600">Subtotal</div>
                                    <div className="text-lg font-bold text-green-600">
                                      ₹{(item.price * quantity).toLocaleString()}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
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
                    {days}
                  </span>
                  <button
                    onClick={() => handleDaysChange(1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Selected Items */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Selected Items:</h4>
                <div className="max-h-40 overflow-y-auto space-y-1 text-sm">
                  {Object.entries(selectedItems).length === 0 ? (
                    <div className="text-gray-500 italic">No items selected</div>
                  ) : (
                    Object.entries(selectedItems).map(([itemId, quantity]) => {
                      const item = items.find(i => i.id === itemId);
                      return (
                        <div key={itemId} className="flex justify-between">
                          <span>{item?.name} x{quantity}</span>
                          <span className="font-medium">₹{((item?.price || 0) * quantity).toLocaleString()}</span>
                        </div>
                      );
                    })
                  )}
                </div>
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Enter code"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3 py-2 bg-royal text-white rounded-lg hover:bg-blue-800 text-sm"
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
                  For {days} day{days > 1 ? 's' : ''}
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
            selectedItems: selectedItems,
            days: days
          }}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default CustomPackageBuilder;