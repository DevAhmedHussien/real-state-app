'use client';

// ** React Hooks
import { useEffect, useState } from 'react';

// ** Routes 
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

// ** Data
import { categories } from '@/constants/data';

const SlideBar = () => {
  
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('products');
  
  // ** Update selected category based on pathname  
  useEffect(() => {
    const match = pathname.match(/\/([^\/]+)\/?$/);
    if (match) {
      setSelectedCategory(match[1]);
    }
  }, [pathname]);

  return (
    <div className="w-full lg:w-1/6 bg-background-light p-4 rounded-lg shadow-md">
      
      {/* Title */}
      <h4 className="text-md font-bold text-textColor-dark mb-4">Categories</h4>
      
      {/* Vertical Category List */}
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <Link
              href={category === 'products' ? '/products' : `/products/${category.toLowerCase()}`}
              className={`block px-4 py-2 rounded-lg text-sm text-textColor-dark font-medium transition-all duration-300 ${
                selectedCategory.toLowerCase() === category.toLowerCase()  
                  ? 'bg-primary-default  text-white shadow-md'
                  : 'bg-gray-200 hover:bg-primary-hover hover:text-white'
              }`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlideBar;
