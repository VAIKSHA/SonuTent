import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrolled = scrollY > 50;
  const opacity = Math.min(scrollY / 100, 1);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      className="fixed w-full z-50 transition-all duration-500"
      style={{
        background: isDark 
          ? `rgba(0, 0, 0, ${opacity * 0.3})` 
          : `rgba(255, 255, 255, ${opacity * 0.15})`,
        backdropFilter: `blur(${opacity * 15}px)`,
        WebkitBackdropFilter: `blur(${opacity * 15}px)`,
        border: `1px solid rgba(255, 255, 255, ${opacity * 0.3})`,
        boxShadow: scrolled ? `0 25px 50px -12px rgba(0, 0, 0, ${opacity * 0.1})` : 'none'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className={`text-2xl font-montserrat font-bold tracking-wide ${
              scrolled 
                ? isDark 
                  ? 'text-blue-400 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'
                  : 'text-royal bg-gradient-to-r from-royal to-blue-600 bg-clip-text text-transparent'
                : 'text-white drop-shadow-lg'
            }`}>
              Sonu Tent & Decoration
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-inter font-medium rounded-lg transition-all duration-300 hover:scale-105 ${
                    scrolled 
                      ? isDark
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-white/10 hover:backdrop-blur-sm'
                        : 'text-gray-700 hover:text-royal hover:bg-white/30 hover:backdrop-blur-sm'
                      : 'text-white hover:text-gold hover:bg-white/10 hover:backdrop-blur-sm drop-shadow-sm'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                scrolled 
                  ? isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-royal'
                  : 'text-white hover:text-gold'
              }`}
            >
              {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${scrolled ? isDark ? 'text-gray-300' : 'text-royal' : 'text-white'}`}
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="md:hidden glass-white shadow-2xl rounded-b-2xl border-t-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:text-royal font-inter font-medium rounded-xl transition-all duration-300 hover:bg-white/40 hover:scale-105 hover:backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;