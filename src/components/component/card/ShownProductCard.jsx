'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Wifi, Wind, WashingMachine, Heart } from 'lucide-react';

export default function ApartmentCard({ apartment }) {
  // You can pass in an array of images or just one.
  // Example: apartment.images = [{ url: '/img1.jpg' }, { url: '/img2.jpg' }]  
  const images = apartment?.images && apartment.images.length > 0
    ? apartment.images
    : [{ url: '/default-apartment.jpg' }];

  // State for hover-based image swapping
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers for hover
  const handleHoverStart = () => {
    if (images.length > 1) {
      setIsHovered(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };
  const handleHoverEnd = () => {
    setIsHovered(false);
    setCurrentIndex(0);
  };

  return (
    <div
      className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 relative"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Horizontal layout on md+ screens */}
      <div className="flex flex-col md:flex-row">
        
        {/* Left: Animated image(s) */}
        <div className="relative w-full md:w-1/3 h-56 md:h-auto">
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: isHovered ? '100%' : '-100%' }}
                animate={{ opacity: 1, x: '0%' }}
                exit={{ opacity: 0, x: isHovered ? '-100%' : '100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute w-full h-full"
              >
                <Image
                  src={images[currentIndex].url}
                  alt={apartment?.title || 'Apartment'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom-left icons (Wi-Fi, AC, etc.) */}
          <div className="absolute bottom-2 left-2 flex space-x-2 text-white">
            {/* Only show icons if this apartment has them */}
            {apartment?.amenities?.includes('Wi-Fi') && (
              <div className="bg-black/60 p-1 rounded">
                <Wifi className="w-4 h-4" />
              </div>
            )}
            {apartment?.amenities?.includes('Air conditioning') && (
              <div className="bg-black/60 p-1 rounded">
                <Wind className="w-4 h-4" />
              </div>
            )}
            {apartment?.amenities?.includes('Washing machine') && (
              <div className="bg-black/60 p-1 rounded">
                <WashingMachine className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Top-right heart / favorite icon */}
          <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full cursor-pointer hover:bg-white">
            <Heart className="w-5 h-5 text-gray-600" />
          </div>

          {/* Example Discount & Stock Badges */}
          {/* Adjust or remove these as you wish */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {/* Discount badge */}
            {apartment?.discount && (
              <p className="text-white text-xs font-medium bg-red-500 px-2 py-1 rounded-full 
                             backdrop-blur-sm hover:bg-black/30 transition-all duration-300">
                {apartment.discount}% OFF
              </p>
            )}
            {/* Stock info */}
            {apartment?.stockLabel && (
              <p className="bg-white/80 text-primary-dark text-xs font-semibold px-2 py-1 rounded-full 
                            transition-all duration-300">
                {apartment.stockLabel}
              </p>
            )}
          </div>
        </div>

        {/* Right: Apartment details */}
        <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {apartment?.title || '2-комнатная квартира'}
            </h2>

            {/* Metro / Address */}
            {apartment?.metro && (
              <p className="text-sm text-gray-600">
                {apartment.metro} 10 мин. пешком
              </p>
            )}
            <p className="text-sm text-gray-600 mb-2">
              {apartment?.address || 'Коровинское шоссе, 17 кор 2, Москва'}
            </p>

            {/* Capacity */}
            <p className="text-sm text-gray-500 mb-4">
              {apartment?.capacity
                ? `${apartment.capacity} гостя`
                : '4 гостя'}
            </p>

            {/* Pricing area */}
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-lg font-semibold">
                  {apartment?.price || '7000'} ₽
                </span>
                <span className="text-sm text-gray-500"> / сутки</span>
              </div>
              <div>
                <span className="text-lg font-semibold">
                  {apartment?.discountedPrice || '6000'} ₽
                </span>
                <span className="text-sm text-gray-500"> от 5 суток</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-4 self-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow 
                         transition-colors duration-300"
            >
              Подробнее
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
