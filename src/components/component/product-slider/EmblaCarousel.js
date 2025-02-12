"use client"

import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
// import Autoplay from 'embla-carousel-autoplay'

import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './ArrowButton'
// import {
//     SelectedSnapDisplay,
//     useSelectedSnapDisplay
// } from './SelectedSnapDisplay'
import Image from 'next/image'
import Link from 'next/link'

const EmblaCarousel = (props) => {
    const { slides } = props
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
                <div className="embla__container">
                    {slides.map((image, index) => (
                        <Link className="embla__slide min-w-80 min-h-120 relative border-2 border-transparent rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-default h-full flex justify-center items-center bg-background-light" key={index} href="product-details">
                            <div>
                                <Image
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="embla__slide__img"
                                    width={200}
                                    height={200}
                                />
                                <div>Slide {index + 1}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                {/* <SelectedSnapDisplay
                    selectedSnap={selectedSnap}
                    snapCount={snapCount}
                /> */}
            </div>
        </section>
    )
}

export default EmblaCarousel
