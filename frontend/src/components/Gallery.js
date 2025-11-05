import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Wedding Tent Setup',
      category: 'Wedding'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Birthday Decoration',
      category: 'Birthday'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      alt: 'Corporate Event',
      category: 'Corporate'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      alt: 'Stage Lighting',
      category: 'Lighting'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Floral Decoration',
      category: 'Decoration'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2062&q=80',
      alt: 'Royal Theme Setup',
      category: 'Wedding'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-playfair font-bold text-royal dark:text-blue-400 mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Take a look at some of our beautiful event setups and decorations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold mb-2">{image.alt}</h3>
                  <span className="px-3 py-1 bg-gold text-royal rounded-full text-sm">
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-4xl max-h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">{selectedImage.alt}</h3>
              <span className="px-3 py-1 bg-gold text-royal rounded-full text-sm">
                {selectedImage.category}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Gallery;