import React from 'react';
import { motion } from 'framer-motion';
import { FaRing, FaBirthdayCake, FaBuilding, FaLightbulb } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaRing />,
      title: 'Wedding Tents',
      description: 'Elegant and spacious tents for your special day with beautiful decorations and lighting.'
    },
    {
      icon: <FaBirthdayCake />,
      title: 'Birthday Decorations',
      description: 'Colorful and fun decorations to make birthday celebrations memorable and joyful.'
    },
    {
      icon: <FaBuilding />,
      title: 'Corporate Events',
      description: 'Professional setups for corporate meetings, conferences, and business celebrations.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Stage, Lighting & Floral Setup',
      description: 'Complete stage design with professional lighting and beautiful floral arrangements.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-playfair font-bold text-royal dark:text-blue-400 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We offer comprehensive event decoration and tent services to make your celebrations perfect
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl text-gold mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-royal dark:text-blue-400 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;