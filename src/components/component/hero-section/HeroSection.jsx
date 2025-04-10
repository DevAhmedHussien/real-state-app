"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, ChevronDown, Check, ChevronsUpDown } from "lucide-react";
import { cityOptions, slides } from "@/constants/data";
import NextLink from "@/components/ui/NextLink";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SelectFramer } from "../product-slider/SelectFramer";


const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCityKey, setSelectedCityKey] = useState(cityOptions[0].key);
  const [progress, setProgress] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const selectedCity = cityOptions.find(city => city.key === selectedCityKey);

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
      setProgress(0);
    }, 8000);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 100 / 80, 100));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [currentIndex]);

  const handleCitySelect = (cityKey) => {
    setSelectedCityKey(cityKey);
    setIsPopoverOpen(false);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            width={1200}
            height={1000}
            quality={100}
            priority
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
              <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-white drop-shadow-xl">
                {slides[currentIndex].title}
              </h1>
              <p className="mt-4 md:mt-6 text-lg md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
                {slides[currentIndex].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced City Selector */}
          <motion.div
            className="relative inline-block w-full max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
          
            <SelectFramer handleCitySelect={handleCitySelect} isPopoverOpen={isPopoverOpen} setIsPopoverOpen={setIsPopoverOpen}selectedCityKey={selectedCityKey} selectedCity={selectedCity} />
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <NextLink
                href={selectedCity?.link || '#'}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-primary-default hover:bg-primary-dark text-white font-semibold rounded-md shadow-lg shadow-primary-default/20 transition-all"
              >
                <Home className="w-5 h-5" />
                Explore {selectedCity?.ru}
              </NextLink>
            </motion.div>

            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-md shadow-lg shadow-gray-900/10 transition-colors"
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
                className="relative h-1.5 w-8 rounded-full bg-white/30 overflow-hidden"
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