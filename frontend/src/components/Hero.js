import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToPackages = () => {
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-playfair font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sonu Tent & Decoration
          <span className="block text-gold text-4xl md:text-5xl mt-2">
            Lighthouse
          </span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl mb-4 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Celebration, Our Creation!
        </motion.p>
        
        <motion.p
          className="text-lg md:text-xl mb-8 opacity-90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We make every event shine brighter.
        </motion.p>
        
        <motion.button
          onClick={scrollToPackages}
          className="gold-gradient text-royal px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Your Event
        </motion.button>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;