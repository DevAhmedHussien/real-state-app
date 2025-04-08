'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail } from 'lucide-react';

const SlideBar = () => {
  const [priceMin, setPriceMin] = useState(900);
  const [priceMax, setPriceMax] = useState(22100);
  const [selectedRooms, setSelectedRooms] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');
  const [selectedMetro, setSelectedMetro] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Example amenities
  const allAmenities = [
    'Wi-Fi интернет',
    'Кондиционер',
    'Телевизор',
    'Стиральная машина',
    'Микроволновка',
  ];

  // Handler for amenity checkbox
  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Click handlers for apply/reset
  const handleApply = () => {
    console.log('Filters applied', {
      priceMin,
      priceMax,
      selectedRooms,
      selectedBeds,
      selectedMetro,
      selectedAmenities,
    });
    // Add your filter logic here...
  };

  const handleReset = () => {
    setPriceMin(900);
    setPriceMax(22100);
    setSelectedRooms('');
    setSelectedBeds('');
    setSelectedMetro('');
    setSelectedAmenities([]);
  };

  return (
    <aside className="w-full border border-gray-100 shadow-sm rounded-lg p-4 bg-white space-y-6">
      
      {/* Title (with an example icon usage) */}
      <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
        <Mail className="text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-800">Фильтр поиска</h2>
      </div>

      {/* PRICE RANGE */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Цена за сутки
        </label>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Минимум</span>
          <span>Максимум</span>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(Number(e.target.value))}
            className="w-full"
          />
          <Input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* NUMBER OF ROOMS */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Кол-во комнат
        </label>
        <div className="flex flex-wrap gap-2">
          {['1', '2', '3+'].map((room) => (
            <Button
              key={room}
              variant={selectedRooms === room ? 'default' : 'outline'}
              onClick={() => setSelectedRooms(room)}
              className="transition-transform duration-300 hover:scale-105"
            >
              {room}
            </Button>
          ))}
        </div>
      </div>

      {/* SLEEPING PLACES */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Спальных мест
        </label>
        <div className="flex flex-wrap gap-2">
          {['2', '3', '4', '5+'].map((bed) => (
            <Button
              key={bed}
              variant={selectedBeds === bed ? 'default' : 'outline'}
              onClick={() => setSelectedBeds(bed)}
              className="transition-transform duration-300 hover:scale-105"
            >
              {bed}
            </Button>
          ))}
        </div>
      </div>

      {/* METRO */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Метро</label>
        <Input
          as="select"
          value={selectedMetro}
          onChange={(e) => setSelectedMetro(e.target.value)}
        >
          <option value="">Выберите станцию</option>
          <option value="Центральная">Центральная</option>
          <option value="Заречная">Заречная</option>
          <option value="Восточная">Восточная</option>
        </Input>
      </div>

      {/* AMENITIES */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Удобства
        </label>
        <div className="flex flex-col space-y-2">
          {allAmenities.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2 text-sm">
              <Checkbox
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityChange(amenity)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <Button
          variant="default"
          onClick={handleApply}
          className="transition-transform duration-300 hover:scale-105"
        >
          Применить
        </Button>
        <Button
          variant="ghost"
          onClick={handleReset}
          className="transition-transform duration-300 hover:scale-105"
        >
          Сбросить
        </Button>
      </div>
    </aside>
  );
};

export default SlideBar;

  // <div className="w-full lg:w-1/6 p-4 rounded-lg shadow-md"> 
      
  //     {/* Title */}
  //     <h4 className="text-lg font-bold text-primary-dark mb-4">Categories</h4>
      
  //     {/* Vertical Category List */}
  //     <ul className="space-y-2">
  //       {categories.map((category) => (
  //         <li key={category}>
  //           <Link
  //             href={category === 'products' ? '/products' : `/products/${category.toLowerCase()}`}
  //             className={`block px-4 py-2 rounded-lg text-sm text-primary-dark font-medium transition-all duration-300 ${
  //               selectedCategory.toLowerCase() === category.toLowerCase()  
  //                 ? 'bg-primary-default  text-white shadow-md'
  //                 : 'bg-gray-200 hover:bg-primary-hover hover:text-white'
  //             }`}
  //           >
  //             {category}
  //           </Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>