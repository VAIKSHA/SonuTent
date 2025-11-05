import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Absolutely amazing service! They made our wedding day perfect with beautiful decorations and professional setup.',
      event: 'Wedding',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Great team and excellent work quality. The tent setup was exactly what we wanted for our corporate event.',
      event: 'Corporate Event',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 3,
      name: 'Anita Patel',
      rating: 5,
      comment: 'They transformed our simple birthday party into a magical celebration. Highly recommended!',
      event: 'Birthday Party',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      rating: 5,
      comment: 'Professional service with attention to detail. The lighting and stage setup was outstanding.',
      event: 'Anniversary',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${
          index < rating ? 'text-gold' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-playfair font-bold text-royal dark:text-blue-400 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-4 left-4 text-gold text-2xl opacity-20">
                <FaQuoteLeft />
              </div>
              
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-royal dark:text-blue-400">{review.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{review.event}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-700 dark:text-gray-300 italic">
                "{review.comment}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-4xl font-bold text-royal dark:text-blue-400 mb-2">4.9/5</div>
            <div className="flex justify-center mb-2">
              {renderStars(5)}
            </div>
            <p className="text-gray-600 dark:text-gray-300">Based on 200+ reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;