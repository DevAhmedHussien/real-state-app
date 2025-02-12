import {  ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function MenuOpen({isSubLinksVisible, links , subLinks, toggleSubLinks, setIsMenuOpen, isMenuOpen}) {

    const handleSub = ()=>{
        toggleSubLinks()
    }
    const HandleClose = () =>{
        setIsMenuOpen(false)
    } 
  return (
    <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
        <ul className="flex flex-col gap-4 p-4">
        {links.map((link, index) => (
            <li key={index}>
            <div className="flex items-center gap-1">
                <Link href={link.link} className="text-gray-800 hover:text-blue-500" 
                onClick={HandleClose}>
                    {link.name}
                </Link>
                {link.name === 'all' && (
                <button onClick={handleSub} className="text-gray-800 hover:text-blue-500">
                    {isSubLinksVisible ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                )}
            </div>
            {link.name === 'all' && isSubLinksVisible && (
                <ul className="pl-4 mt-2 space-y-2">
                {subLinks.map((subLink, subIndex) => (
                    <li key={subIndex}>
                    <Link href={`/${subLink}`} className="text-gray-800 hover:text-blue-500">
                        {subLink}
                    </Link>
                    </li>
                ))}
                </ul>
            )}
            </li>
        ))}
        </ul>
  </div>
  )
}
