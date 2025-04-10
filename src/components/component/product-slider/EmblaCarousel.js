"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from './ArrowButton';
import Image from 'next/image';
import NextLink from '@/components/ui/NextLink';
import { Eye } from 'lucide-react';

const EmblaCarousel = ({ slides, categories = false }) => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isHovered, setIsHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 480) setSlidesToShow(1);
      else if (width < 768) setSlidesToShow(2);
      else if (width < 1024) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    slidesToShow,
  });

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla group">
    <div className="embla__viewport" ref={emblaRef}>
      <motion.div 
        className="embla__container flex h-[35rem]"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {slides.map((slide, index) => (
          <motion.div
            key={slide.key}
            className="embla__slide relative w-full md:min-w-80 min-h-120 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            onHoverStart={() => !isMobile && setIsHovered(index)}
            onHoverEnd={() => !isMobile && setIsHovered(null)}
            onTouchStart={() => setIsHovered(index)}
            onTouchEnd={() => setIsHovered(null)}
          >
            <div className="relative h-full w-full">
              <Image
                src={slide.img}
                alt={`${slide.ru} - ${slide.description}`}
                fill
                priority
                quality={100}
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Text Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  (isMobile || isHovered === index) 
                  ? { opacity: 1, y: 0 } 
                  : { opacity: 0, y: 20 }
                }
                className="absolute z-20 bottom-0 left-0 right-0 rounded-lg p-4 md:p-6 bg-black/50"
              >
                    <div className="space-y-2 text-white ">
                        <NextLink href={slide.link} className="flex justify-normal items-start gap-3">
                            <motion.h2 
                            className=" text-xl font-bold responsive-appbar-button "
                            initial={{ x: -20 }}
                            animate={{ x: 0 }}
                            >
                                {slide.ru}  
                            </motion.h2>
                            <div>
                                <Eye strokeWidth={1}  className='mt-2 w-6 h-6 text-white  animate-pulse' />
                            </div>

                     </NextLink>
                      <motion.p
                        className="text-base opacity-90  text-white/80"
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
                      >
                        {slide.description}
                      </motion.p>
                    </div>
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-gray via-white to-transparent" /> */}
             
                  </motion.div>
                </div>
              {/* </NextLink> */}

            </motion.div>
            
          ))}
        </motion.div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

    </section>
  );
};

export default EmblaCarousel;