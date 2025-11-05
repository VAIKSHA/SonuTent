import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/919876543210', label: 'WhatsApp' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Wedding Tents',
    'Birthday Decorations',
    'Corporate Events',
    'Stage Setup',
    'Lighting Services',
    'Floral Arrangements'
  ];

  return (
    <footer className="bg-royal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-playfair font-bold mb-4 text-gold">
              Sonu Tent & Decoration
            </h3>
            <p className="text-gray-300 mb-4">
              Making every celebration memorable with our creative decorations and professional tent services.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gold transition-colors text-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-gold">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-gold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhone className="mr-3 text-gold" />
                <span className="text-gray-300">+91 80830 77081</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-gold" />
                <span className="text-gray-300">info@sonutent.com</span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="mr-3 text-gold mt-1" />
                <span className="text-gray-300">
                  Sidhwal Near Railway Crossing<br />
                  Siwan, Bihar 841226
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-600 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300">
            © {new Date().getFullYear()} Sonu Tent & Decoration Lighthouse. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Your Celebration, Our Creation!
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;