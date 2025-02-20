"use client";
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from "lucide-react";
import { Button } from '@/components/ui/button';
import { getStarRating } from '@/constants/utils';


const ShownProductCard = ({ product, isPriority = false }) => {
  
  const images = product.images.length > 1 ? product.images : [product.images[0]]; 
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
    setIsHovered(false)
    setCurrentIndex(0)
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
            initial={{ opacity: 0, x: isHovered ?  "100%" : "-100%"}}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: isHovered ?  "-100%" : "100%" }}
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
      <div className='absolute bottom-2 right-2 bg-white bg-opacity-60 px-4 py-3 rounded-lg shadow-md backdrop-blur-md'>
        <h2 className="text-lg font-semibold text-primary-dark">{product.name}</h2>
        <div className="mt-1">{getStarRating(product.rating || 4.5)}</div>
        <div className="flex items-center justify-between gap-4 mt-2">
            <p className="text-lg font-semibold text-accent-default"><span className="line-through text-gray-400 mr-3">${ product.price * 200/100}</span>
            ${product.price}</p>
         
          <Button variant="outline" size="sm"className="hover:text-primary-hover transition-transform duration-300 ease-in-out transform ">
            <motion.div 
              className="flex w-full h-full items-center"
              whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }} 
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
            >
              <ShoppingCart size={16} className="mr-1  text-primary-dark" />
            </motion.div>
            {/* Add To Cart */}
          </Button>
        </div>
      </div>

      {/* label of card */}
        <div className="absolute top-0 left-0 w-full p-4 flex items-start justify-between">
          {/* Discount Badge */}
          <p className="text-white  text-sm   bg-red-400 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/30 transition-all duration-300">
            50% OFF
          </p>

          {/* Stock Information */}
          <p className="text-primary-dark text-sm font-semibold px-3 py-1.5 rounded-full transition-all duration-300">
            Limited Stock
          </p>
      </div>
    </div>
  );
};

export default ShownProductCard;
