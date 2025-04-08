"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, ChevronDown } from "lucide-react";
import { cityOptions } from "@/constants/data";
import NextLink from "@/components/ui/NextLink";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-2120b6e4cd4b?auto=format&fit=crop&w=2850&q=80",
    title: "Find Your Perfect Apartment",
    subtitle: "Spacious layouts, prime locations, affordable prices",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154178-0600f22e6691?auto=format&fit=crop&w=2850&q=80",
    title: "Luxury City Living",
    subtitle: "Modern high-rises with stunning city views",
  },
  {
    image: "https://images.unsplash.com/photo-1600585163668-70d779d98d9e?auto=format&fit=crop&w=2850&q=80",
    title: "Family-Friendly Homes",
    subtitle: "Safe neighborhoods and spacious backyards",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCityKey, setSelectedCityKey] = useState(cityOptions[0].key);
  const [progress, setProgress] = useState(0);

  const selectedCity = cityOptions.find(city => city.key === selectedCityKey);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setProgress(0); 
    }, 8000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100 / 80, 100));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [currentIndex]);

  const handleCityChange = (value) => {
    setSelectedCityKey(value);
  };


  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl w-full space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-xl">
                {slides[currentIndex].title}
              </h1>
              <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
                {slides[currentIndex].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* City Selector */}
  
          <motion.div
        className="relative inline-block w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Select value={selectedCityKey} onValueChange={handleCityChange}>
          <SelectTrigger className="w-full pl-2 pr-6 py-6 text-base bg-white/90 backdrop-blur-sm rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-primary-default focus:ring-2 focus:ring-primary-default/30 outline-none transition-all shadow-sm hover:shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">{selectedCity?.flag}</span>
              <SelectValue placeholder="Select a city" />
            </div>
          </SelectTrigger>
          
          <SelectContent className="rounded-xl border-2 border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl">
            <SelectGroup>
              <SelectLabel className="px-4 py-2 text-sm font-semibold text-gray-500 border-b border-gray-200">
                Available Cities
              </SelectLabel>
              {cityOptions.map((city) => (
                <SelectItem 
                  key={city.key} 
                  value={city.key}
                  className=" data-[state=checked]:bg-primary-default/10 data-[highlighted]:bg-gray-100/50 transition-colors"
                >
                  <div className="">
                    <span className="px-2 py-2 text-primary-default ">{city.ru}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <NextLink
                href={selectedCity?.link || '#'}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-primary-default hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary-default/20 transition-colors"
              >
                <Home className="w-5 h-5" />
                Explore {selectedCity?.ru}
              </NextLink>
            </motion.div>

            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl shadow-lg shadow-gray-900/10 transition-colors"
            >
              <Info className="w-5 h-5" />
              Learn More
            </motion.a>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setProgress(0);
                }}
                className="relative h-1 w-8 rounded-full bg-white/30 overflow-hidden"
                aria-label={`Slide ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-white origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 38 }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;