"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Info } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
    title: "Elevate Your Style",
    subtitle: "Premium fashion for all seasons",
  },
  {
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGVsZWN0cm9uaWNzfGVufDB8fHx8MTY1NTA3OTk1Mg&ixlib=rb-1.2.1&q=80&w=1080",
    title: "Latest Electronics",
    subtitle: "Upgrade to cutting-edge technology",
  },
  {
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZhc2hpb258ZW58MHx8fHwxNjU1MDc5ODc5&ixlib=rb-1.2.1&q=80&w=1080",
    title: "Timeless Accessories",
    subtitle: "Luxury watches & jewelry for you",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-light to-primary-hover opacity-30"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-white text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold md:text-6xl text-primary-dark"
        >
          {slides[currentIndex].title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-lg max-w-2xl text-primary-dark"
        >
          {slides[currentIndex].subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-transparent text-lg font-semibold rounded-lg text-white bg-[#432F28] hover:bg-[#E7B987] transition-all shadow-lg flex items-center gap-2"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.div>
            Shop Now
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-transparent text-lg font-semibold rounded-lg text-[#432F28] bg-[#FFEEBB] hover:bg-[#C49166] transition-all shadow-lg flex items-center gap-2"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <Info className="w-5 h-5" />
            </motion.div>
            Learn More
          </motion.a>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 flex space-x-3">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-[#FFEEBB]" : "bg-[#C49166]"
              } transition-all duration-500 ease-in-out cursor-pointer`}
              animate={{
                scale: index === currentIndex ? 1.2 : 1,
                width: index === currentIndex ? "1.5rem" : "0.75rem",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;