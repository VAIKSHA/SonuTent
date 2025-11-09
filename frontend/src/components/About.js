import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHeart } from 'react-icons/fa';


const About = () => {
  const stats = [
    { icon: <FaAward />, number: '500+', label: 'Events Completed' },
    { icon: <FaUsers />, number: '1000+', label: 'Happy Clients' },
    { icon: <FaHeart />, number: '10+', label: 'Years Experience' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-playfair font-bold text-royal dark:text-blue-400 mb-4">
            About Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            With over a decade of experience in event decoration and tent services, 
            Sonu Tent & Decoration Lighthouse has been transforming celebrations into 
            unforgettable memories. Our team of creative professionals brings expertise, 
            trust, and artistic vision to every event we touch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl text-gold mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-royal dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-playfair font-bold text-royal dark:text-blue-400 mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                  Professional and experienced team
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                  High-quality materials and equipment
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                  Customizable packages for every budget
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                  On-time delivery and setup
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                  24/7 customer support
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 bg-gradient-to-br from-royal to-blue-400 rounded-full mx-auto flex items-center justify-center">
                <img 
                  src="/logo-sonu-tent.png"
                  alt="Sonu Tent & Decoration Lighthouse Logo" 
                  className="w-32 h-32 object-contain filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;