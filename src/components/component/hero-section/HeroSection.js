"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-2120b6e4cd4b?auto=format&fit=crop&w=2850&q=80",
    title: "Find Your Perfect Apartment",
    subtitle: "Spacious layouts, prime locations, affordable prices",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154178-0600f22e6691?auto=format&fit=crop&w=2850&q=80",
    title: "Luxury City Living",
    subtitle: "Modern high-rises with stunning city views",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585163668-70d779d98d9e?auto=format&fit=crop&w=2850&q=80",
    title: "Family-Friendly Homes",
    subtitle: "Safe neighborhoods and spacious backyards",
  },
];

// Example list of cities
const cityOptions = [
  "Moscow",
  "Saint Petersburg",
  "Novosibirsk",
  "Yekaterinburg",
  "Kazan",
  "Nizhny Novgorod",
  "Samara",
  "Rostov-on-Don",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState(cityOptions[0]); // Default to the first city

  // Rotate slides every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handler for city selection
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slide Images */}
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

      {/* Optional overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Text & CTA */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-white text-center">
        {/* Title */}
        <motion.h1
          key={slides[currentIndex].title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold"
        >
          {slides[currentIndex].title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          key={slides[currentIndex].subtitle}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-lg md:text-xl max-w-2xl"
        >
          {slides[currentIndex].subtitle}
        </motion.p>

        {/* City Selection */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <label className="sr-only" htmlFor="citySelect">
            Choose Your City
          </label>
          <motion.select
            id="citySelect"
            value={selectedCity}
            onChange={handleCityChange}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 text-lg font-medium rounded-lg bg-white text-gray-700 focus:outline-none shadow-md cursor-pointer"
          >
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </motion.select>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {/* Primary CTA */}
          <motion.a
            href="#listings"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-lg font-semibold rounded-lg bg-[#3A3A3A] text-white hover:bg-[#5C5C5C] transition-all shadow-lg flex items-center gap-2"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <Home className="w-5 h-5" />
            </motion.div>
            Explore {selectedCity}
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-lg font-semibold rounded-lg text-[#3A3A3A] bg-white hover:bg-gray-300 transition-all shadow-lg flex items-center gap-2"
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
                index === currentIndex ? "bg-white" : "bg-gray-500"
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
