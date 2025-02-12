"use client";

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, StarHalf, StarOff } from "lucide-react";
import { Button } from '@/components/ui/button';

const getStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-accent-default">
      {Array(fullStars).fill().map((_, i) => <Star key={i} size={16} className="fill-current" />)}
      {hasHalfStar && <StarHalf size={16} className="fill-current" />}
      {Array(emptyStars).fill().map((_, i) => <StarOff key={i} size={16} className="text-gray-400" />)}
    </div>
  );
};

const ShownProductCard = ({ product, isPriority = false }) => {
  
  const images = product.images.length > 1 ? product.images : [product.images[0]]; // Ensure at least 1 image
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image when hovered
  const handleHoverStart = () => {
    if (images.length > 1) {
      setIsHovered(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="min-w-80 min-h-60 relative border-2 border-transparent rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-default h-full flex justify-center items-center bg-background-light"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      
      {/* Image Container */}
      <div className="w-4/5 relative overflow-hidden" style={{ minHeight: '380px', height: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-full h-full"
          >
            <Image
              src={images[currentIndex].url}
              alt={product.name}
              fill
              className="object-cover rounded-lg w-[100%] h-[100%]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={isPriority}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Product Info Section */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 px-4 py-3 rounded-lg shadow-md backdrop-blur-md">
        <h2 className="text-lg font-semibold text-textColor-dark">{product.name}</h2>
        <div className="mt-1">{getStarRating(product.rating || 4.5)}</div>
        <div className="flex items-center justify-between gap-4 mt-2">
          <p className="text-lg font-semibold text-accent-default">${product.price}</p>
          <Button variant="outline" size="sm">
            <motion.div 
              className="flex items-center"
              whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }} // Shake effect
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
            >
              <ShoppingCart size={16} className="mr-1" />
            
            </motion.div>
            {/* Add To Cart */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShownProductCard;
