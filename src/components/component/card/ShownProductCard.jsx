'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { 
  Wifi, Wind, WashingMachine, Heart, BedDouble,
  Users, MapPin, Building, Bath, Car, Phone,
  MessageCircle, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function ApartmentCard({ apartment }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Contact information
  const contactInfo = {
    phone: apartment.contactInfo?.phone || '+7 (XXX) XXX-XX-XX',
    whatsapp: apartment.contactInfo?.whatsapp || '79123456789',
    hiddenPhone: apartment.contactInfo?.hiddenPhone || '+7••• •••••••'
  };

  const images = apartment?.images?.length > 0 
    ? apartment.images 
    : [{ url: '/default-apartment.jpg', caption: 'Apartment preview' }];

  const mainAmenities = [
    { icon: Wifi, condition: apartment.amenities?.includes('Wi-Fi') },
    { icon: Wind, condition: apartment.checkInConditions?.airConditioning },
    { icon: WashingMachine, condition: apartment.amenities?.includes('Washing machine') },
    { icon: Bath, condition: apartment.apartmentParameters?.bathroom === 'Separate' },
    { icon: Car, condition: apartment.apartmentParameters?.parkingAvailable }
  ].filter(amenity => amenity.condition);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  const handleShowPhone = () => setShowPhoneNumber(!showPhoneNumber);
  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 relative group">
      <div className="flex flex-col md:flex-row">
        {/* Image Slider Section */}
        <div className="relative w-full md:w-2/5 h-64 md:h-80">
          <div className="embla overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="embla__container flex">
              {images.map((image, index) => (
                <div className="flex-[0_0_100%]" key={index}>
                  <div className="relative w-full h-64 md:h-80">
                    <Image
                      src={image.url}
                      alt={image.caption}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          {/* Slider Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {apartment.checkInConditions?.petsAllowed && (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                Pets allowed
              </span>
            )}
            {apartment.apartmentParameters?.balconyType && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {apartment.apartmentParameters.balconyType} balcony
              </span>
            )}
          </div>

          {/* Amenity Icons */}
          <div className="absolute bottom-2 left-2 flex gap-2">
            {mainAmenities.map(({ icon: Icon }, index) => (
              <div key={index} className="bg-white/90 p-1.5 rounded-lg shadow-sm">
                <Icon className="w-5 h-5 text-gray-700" />
              </div>
            ))}
          </div>

          {/* Like Button */}
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <Heart 
              className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
            />
          </button>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-3/5 p-4 md:p-6 flex flex-col justify-between">
          <div>
            {/* Title and Location */}
            <div className="mb-3">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {apartment.title}
              </h2>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <MapPin className="w-4 h-4" />
                <span>{apartment.mapInfo.address}</span>
                <span className="text-gray-400">•</span>
                <span>{apartment.mapInfo.district} District</span>
              </div>
            </div>

            {/* Apartment Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <Building className="w-4 h-4 text-gray-500" />
                {apartment.apartmentParameters.apartmentType}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <Users className="w-4 h-4 text-gray-500" />
                Up to {apartment.apartmentParameters.maxGuests} guests
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <BedDouble className="w-4 h-4 text-gray-500" />
                {apartment.apartmentParameters.doubleBeds} double beds
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <span className="text-gray-500">🛏</span>
                {apartment.apartmentParameters.singleBeds} single beds
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <span className="text-gray-500">📏</span>
                {apartment.apartmentParameters.area.total}m²
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <span className="text-gray-500">🏗</span>
                {apartment.apartmentParameters.buildingType}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {apartment.descriptionShort}
            </p>
          </div>

          {/* Price and Contact Section */}
          <div className="space-y-4">
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {/* {apartment.priceRange.min.toLocaleString()} - {apartment.priceRange.max.toLocaleString()} */}
                     1000 ₽
                    <span className="text-base font-normal text-gray-500"> / сутки</span>
                  </div>
                  {apartment.checkInConditions.prepaymentRequired && (
                    <p className="text-sm text-gray-500 mt-1">Prepayment required</p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  View Details
                </motion.button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Contact owner:</span>
                
                <AnimatePresence mode="wait">
                  {showPhoneNumber ? (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="flex items-center gap-3"
                    >
                      <button
                        onClick={() => copyToClipboard(contactInfo.phone)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{contactInfo.phone}</span>
                      </button>
                      
                      <a
                        href={`https://wa.me/${contactInfo.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </motion.div>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={handleShowPhone}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                      <span>{contactInfo.hiddenPhone}</span>
                      <span className="text-blue-600 ml-2">Show number</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}