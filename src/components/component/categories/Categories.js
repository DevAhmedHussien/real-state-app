import React from 'react'
import EmblaCarousel from '../product-slider/EmblaCarousel'
const SLIDES = [
    '/images/shirt.png',
    '/images/shirt.png',
    '/images/shirt.png',
    '/images/shirt.png',
    '/images/shirt.png',
    '/images/shirt.png',
  ]
  
const Categories = () => {
  return (

       <div className="mt-5">
                <h2 className="text-3xl font-bold text-left mb-6">Shop By Category</h2>
                {/* <AnimatedtedProducts /> */}
                <EmblaCarousel categories = {true} slides={SLIDES} />
              </div>
      
  )
}

export default Categories