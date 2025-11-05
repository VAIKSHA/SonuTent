import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaStar } from 'react-icons/fa';
import BookingModal from './BookingModal';
import CustomPackageBuilder from './CustomPackageBuilder';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  const packages = [
    {
      name: 'Basic',
      price: 3000,
      popular: false,
      features: [
        'Simple tent setup',
        'Basic lighting',
        'Standard decoration',
        'Setup & cleanup',
        '1 day service'
      ]
    },
    {
      name: 'Popular',
      price: 5000,
      popular: true,
      features: [
        'Premium tent setup',
        'LED lighting system',
        'Enhanced decorations',
        'Floral arrangements',
        'Setup & cleanup',
        '1 day service'
      ]
    },
    {
      name: 'Advance',
      price: 8000,
      popular: false,
      features: [
        'Royal tent setup',
        'Professional lighting',
        'Premium decorations',
        'Stage setup',
        'Entry gate decoration',
        'Floral arrangements',
        'Setup & cleanup',
        '1 day service'
      ]
    }
  ];

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowBookingModal(true);
  };

  const handleCustomPackage = () => {
    setShowCustomBuilder(true);
  };

  return (
    <section id="packages" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-playfair font-bold text-royal dark:text-blue-400 mb-4">
            Our Packages
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our carefully crafted packages or create your own custom package
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 relative ${
                pkg.popular ? 'ring-2 ring-gold' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gold text-royal px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <FaStar className="mr-1" /> Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-royal dark:text-blue-400 mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-gold">
                  ₹{pkg.price.toLocaleString()}
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/day</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPackage(pkg)}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  pkg.popular
                    ? 'gold-gradient text-royal hover:opacity-90'
                    : 'bg-royal text-white hover:bg-blue-800'
                }`}
              >
                Select Package
              </button>
            </motion.div>
          ))}

          {/* Custom Package Card */}
          <motion.div
            className="bg-gradient-to-br from-royal to-blue-600 text-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Custom Package</h3>
              <div className="text-lg">
                Build your own package
              </div>
            </div>

            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center">
                <FaCheck className="text-gold mr-2 flex-shrink-0" />
                Choose your tent type
              </li>
              <li className="flex items-center">
                <FaCheck className="text-gold mr-2 flex-shrink-0" />
                Select lighting options
              </li>
              <li className="flex items-center">
                <FaCheck className="text-gold mr-2 flex-shrink-0" />
                Pick your theme
              </li>
              <li className="flex items-center">
                <FaCheck className="text-gold mr-2 flex-shrink-0" />
                Add extra services
              </li>
              <li className="flex items-center">
                <FaCheck className="text-gold mr-2 flex-shrink-0" />
                Real-time pricing
              </li>
            </ul>

            <button
              onClick={handleCustomPackage}
              className="w-full py-3 bg-gold text-royal rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Build Custom Package
            </button>
          </motion.div>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          package={selectedPackage}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      {showCustomBuilder && (
        <CustomPackageBuilder
          onClose={() => setShowCustomBuilder(false)}
        />
      )}
    </section>
  );
};

export default Packages;