import Image from 'next/image';
import { ShoppingCart, Star, StarHalf, StarOff } from "lucide-react"; // Icons for star ratings
import { Button } from '@/components/ui/button';

const getStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-accent-default">
      {Array(fullStars).fill().map((_, i) => <Star key={i} size={16} className="fill-current" />)}
      {hasHalfStar && <StarHalf size={16} className="fill-current" />}
      {Array(emptyStars).fill().map((_, i) => <StarOff key={i} size={16} className="text-gray-400" />)}
    </div>
  );
};

const ShownProductCard = ({ product, isPriority = false }) => {
  return (
    <div className="min-w-80 min-h-60 relative border-2 border-transparent rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-default h-full flex justify-center items-center bg-background-light">
      
      {/* Optimized Image with next/image */}
      <div className="w-4/5 relative" style={{ minHeight: '380px', height: '100%' }}>
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill 
          className="object-cover transform hover:scale-105 transition-transform duration-300 rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
          priority={isPriority} 
        />
      </div>

      {/* Product Info Section */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 px-4 py-3 rounded-lg shadow-md backdrop-blur-md">
        <h2 className="text-lg font-semibold text-textColor-dark">{product.name}</h2>
        <div className="mt-1">{getStarRating(product.rating || 4.5)}</div>
        <div className="flex items-center justify-between gap-4 mt-2">
          <p className="text-lg font-semibold text-accent-default">${product.price}</p>
          <Button variant="outline" size="sm">
          <ShoppingCart size={16} /> Add To Cart
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default ShownProductCard;
