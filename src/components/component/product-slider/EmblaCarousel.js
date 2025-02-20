"use client"
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './ArrowButton'

import Image from 'next/image'
import NextLink from '@/components/ui/NextLink';

const EmblaCarousel = (props) => {
    const { slides  , categories = false} = props
    const [slidesToShow, setSlidesToShow] = useState(1)

    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth < 480) {
                setSlidesToShow(1) // Mobile: Show 1 slide
            } else if (window.innerWidth < 768) {
                setSlidesToShow(2) // Tablets: Show 2 slides
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(3) // Small screens: Show 3 slides
            } else {
                setSlidesToShow(4) // Default: Show 4 slides
            }
        }

        updateSlidesToShow() // Run initially
        window.addEventListener('resize', updateSlidesToShow) // Listen for resizes

        return () => window.removeEventListener('resize', updateSlidesToShow) // Cleanup
    }, [])

    const [emblaRef, emblaApi] = useEmblaCarousel({
        dragFree: true,
        loop: false,
        align: 'start',
        slidesToScroll: 1,
        slidesToShow, // Dynamically controlled
    })

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)
    // const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)
    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
            <motion.div 
                className="embla__container flex"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                    >
                {slides.map((slide, index) => (
                    <motion.div
                        key={index}
                        transition={{ duration: 0.3 }}
                        className={`${ categories && '!h-[31rem]' } embla__slide  relative min-w-80 min-h-120 border-2 border-transparent rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-default h-full flex justify-center items-center bg-background-light`} 
                    >
                        <NextLink href={`${slide.link}`}>
                            <Image
                                src={slide.img || null}
                                alt={`Slide ${index + 1}`}
                                width={categories ? 400 : 200}
                                height={categories ? 400 : 200}
                                // className={`${!categories ? 'embla__slide__img' :'h-[100%] w-[100%]'}`}
                            />
                        </NextLink>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className='absolute bottom-2 right-2 bg-white bg-opacity-60 px-4 py-3 rounded-lg shadow-md backdrop-blur-md'
                        >
                            <h2 className="text-lg font-semibold text-primary-dark mb-1">{slide.title}</h2>
                            <h2 className="text-sm font-semibold text-primary-dark">Amazing material with high quality </h2>



                        </motion.div>
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
    )
}

export default EmblaCarousel

