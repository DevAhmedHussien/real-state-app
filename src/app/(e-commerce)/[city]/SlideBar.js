'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { SlidersHorizontal, X, Check, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Input from '@/components/ui/input';

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([900, 22100]);
  const [selectedRooms, setSelectedRooms] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');
  const [selectedMetro, setSelectedMetro] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenities = [
    'Wi-Fi интернет',
    'Кондиционер',
    'Телевизор',
    'Стиральная машина',
    'Микроволновка',
  ];

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  const applyFilters = () => {
    console.log('Applying filters:', { 
      priceRange, 
      selectedRooms, 
      selectedBeds, 
      selectedMetro, 
      selectedAmenities 
    });
    if(isMobile) setIsOpen(false);
  };

  const resetFilters = () => {
    setPriceRange([900, 22100]);
    setSelectedRooms('');
    setSelectedBeds('');
    setSelectedMetro('');
    setSelectedAmenities([]);
  };

  const FilterContent = () => (
    <div className="space-y-6 p-4">
      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Цена за сутки (₽)</h3>
        <div className="flex gap-3">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            className="text-center"
          />
          <span className="self-center text-muted-foreground">–</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            className="text-center"
          />
        </div>
      </div>

      {/* Rooms & Beds */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Комнаты</h3>
          <div className="flex flex-wrap gap-2">
            {['1', '2', '3+'].map(room => (
              <Button
                key={room}
                variant={selectedRooms === room ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRooms(prev => prev === room ? '' : room)}
              >
                {room}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Спальные места</h3>
          <div className="flex flex-wrap gap-2">
            {['2', '3', '4', '5+'].map(bed => (
              <Button
                key={bed}
                variant={selectedBeds === bed ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedBeds(prev => prev === bed ? '' : bed)}
              >
                {bed}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Metro & Amenities */}
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Метро</h3>
          <select 
            value={selectedMetro}
            onChange={e => setSelectedMetro(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Выберите станцию</option>
            <option value="Центральная">Центральная</option>
            <option value="Заречная">Заречная</option>
            <option value="Восточная">Восточная</option>
          </select>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Удобства</h3>
          <div className="grid grid-cols-2 gap-2">
            {amenities.map(amenity => (
              <label key={amenity} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => toggleAmenity(amenity)}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:block h-fit sticky top-4 border rounded-lg bg-background transition-all duration-300 overflow-hidden  bg-white ",
        isExpanded ? "w-80" : "w-80"
      )}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className={cn(
              "text-lg font-semibold transition-opacity",
              !isExpanded && "opacity-0"
            )}>
              Фильтры
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <X size={18} /> : <SlidersHorizontal size={18} />}
            </Button>
          </div>
          
          {isExpanded && (
            <>
              <FilterContent />
              <div className="flex gap-2 mt-4">
                <Button className="w-full" onClick={applyFilters}>
                  Применить
                </Button>
                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Сбросить
                </Button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Mobile Filter Button */}
      {isMobile && (
        <div className="fixed  bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden">
          <Button
            size="lg"
            className="rounded-full shadow-lg px-6 gap-2"
            onClick={() => setIsOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Фильтры
          </Button>
        </div>
      )}

      {/* Mobile Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen} >
        <SheetContent side="bottom" className="rounded-t-2xl h-[90vh] bg-white">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Фильтры</SheetTitle>
          </SheetHeader>
          
          <div className="overflow-y-auto pb-24">
            <FilterContent />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-background p-4 border-t">
            <div className="flex gap-2">
              <Button className="w-full" onClick={applyFilters}>
                Применить
              </Button>
              <Button variant="outline" className="w-full" onClick={resetFilters}>
                Сбросить
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;