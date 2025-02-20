'use client';

import { useState } from 'react';
import { Menu, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

import Cart from './Cart';
import MenuOpen from './MenuOpen';
import SearchProduct from './SearchProduct';
import { usePathname } from 'next/navigation';
import ReduxProvider from '@/redux/ReduxProvider';
import NextLink from '@/components/ui/NextLink';
import { links, subLinks } from '@/constants/data';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubLinksVisible, setIsSubLinksVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsSearchOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname(); // Get the current route

  // Hide Navbar on auth and checkout pages
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/checkout')
  ) {
    return null;
  }

  return (
    <>
      <ReduxProvider>
        {/* Navbar */}
        <header className="fixed top-0 left-0 w-full bg-background-default opacity-90 shadow-md z-50">
          {/* container mx-auto px-4 sm:px-6 lg:px-8 */}
          <div className="px-4 ">
            <div className="flex justify-between items-center h-16">
              
        {/* Logo and Menu Toggle */}
            <div className='hidden sm:flex items-center'>
                <NextLink href="/" aria-label="Home page" title="Go to Home page">
                  <Image
                    src={'/images/logo-icon.svg'}
                    alt={'Brand Logo'}
                    width={50}
                    height={50}
                    // fill
                    className="object-cover transform hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                  />
                </NextLink>
              </div>
              
              {/* navbar */}
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="md:hidden text-primary-dark hover:text-primary-hover transition-all"
                >
                  <Menu size={24} />
                </button>

                {/* Navigation Links */}
                <nav className={`md:flex items-center space-x-6 hidden`}>
                  <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    {links.map((link, index) => (
                      // className="relative"
                      <li key={index} > 
                        {link.name === 'Products' ? (
                          <>
                            <button
                              onMouseEnter={() => setIsSubLinksVisible(true)}
                              onMouseLeave={() => setIsSubLinksVisible(false)}
                              className="text-primary-dark flex justify-center items-center gap-2 transition-all"
                              aria-label="Toggle sub-links"
                            >
                              <NextLink href={link.link} className='responsive-appbar-button'>{link.name}</NextLink>
                              {isSubLinksVisible ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>

                            {/* Submenu */}
                            <ul
                              onMouseEnter={() => setIsSubLinksVisible(true)}
                              onMouseLeave={() => setIsSubLinksVisible(false)}
                              className={`fixed left-[10%]  w-[80vw] p-4 bg-background-default shadow-lg rounded-lg transition-all duration-300 ease-in-out transform ${isSubLinksVisible
                                ? 'opacity-100 scale-100 translate-y-0'
                                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                }`}
                            >
                              {subLinks.map((subLink, subIndex) => (
                                <li key={subIndex}>
                                  <NextLink href={`/products/${subLink.toLowerCase()}`}
                                    className="block px-4 py-2 text-primary-dark hover:text-primary-hover transition-all duration-200"
                                  >
                                    {subLink}
                                  </NextLink>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <button
                          className="text-primary-dark flex justify-center items-center gap-2 transition-all"
                          aria-label="Toggle sub-links"
                          >
                          <NextLink
                            href={link.link}
                            className="responsive-appbar-button"
                          >
                            {link.name}
                          </NextLink>
                        </button>
                       
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Search and Cart */}
              <SearchProduct
                isSearchOpen={isSearchOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                toggleSearch={toggleSearch}
                toggleCart={toggleCart}
              />
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <MenuOpen
              isSubLinksVisible={isSubLinksVisible}
              links={links}
              subLinks={subLinks}
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
            />
          )}
        </header>

        {/* Cart Sidebar */}
        <Cart toggleCart={toggleCart} isCartOpen={isCartOpen} />

        {/* Overlay when cart or menu is open */}
        {(isCartOpen || isMenuOpen) && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => {
              if (isCartOpen) toggleCart();
              if (isMenuOpen) toggleMenu();
            }}
          />
        )}
      </ReduxProvider>
    </>
  );
}
