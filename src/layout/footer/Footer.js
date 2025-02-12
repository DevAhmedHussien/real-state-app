// import Link from "next/link";
// import Image from "next/image";
// import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

// export default function Footer() {
//   // Data for quick links
//   const quickLinks = [
//     { name: "Home", href: "/" },
//     { name: "Shop", href: "/shop" },
//     { name: "About Us", href: "/about" },
//     { name: "Contact Us", href: "/contact" },
//     { name: "FAQ", href: "/faq" },
//   ];

//   // Data for customer support
//   const customerSupport = [
//     { name: "Shipping Information", href: "/shipping" },
//     { name: "Returns & Exchanges", href: "/returns" },
//     { name: "Privacy Policy", href: "/privacy" },
//     { name: "Terms & Conditions", href: "/terms" },
//   ];

//   // Data for social media links
//   const socialMedia = [
//     { icon: <Facebook size={20} />, href: "https://facebook.com" },
//     { icon: <Twitter size={20} />, href: "https://twitter.com" },
//     { icon: <Instagram size={20} />, href: "https://instagram.com" },
//     { icon: <Linkedin size={20} />, href: "https://linkedin.com" },
//     { icon: <Youtube size={20} />, href: "https://youtube.com" },
//   ];

//   // Data for payment methods
//   const paymentMethods = [
//     { src: "/images/bag.png", alt: "Visa" },
//     { src: "/images/bag.png", alt: "Mastercard" },
//     { src: "/images/bag.png", alt: "PayPal" },
//     { src: "/images/bag.png", alt: "Amazon Pay" },
//   ];

//   return (
//     <footer className="bg-background-dark text-textColor-default py-12">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Footer Sections */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 border-b border-primary-default pb-2">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <Link
//                     href={link.href}
//                     className="text-textColor-muted hover:text-secondary-light transition-all duration-300"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Customer Support */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 border-b border-primary-default pb-2">Customer Support</h3>
//             <ul className="space-y-2">
//               {customerSupport.map((support, index) => (
//                 <li key={index}>
//                   <Link
//                     href={support.href}
//                     className="text-textColor-muted hover:text-secondary-light transition-all duration-300"
//                   >
//                     {support.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter Subscription */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 border-b border-primary-default pb-2">Newsletter</h3>
//             <p className="text-sm text-textColor-light mb-4">
//               Subscribe to our newsletter for the latest updates and exclusive offers.
//             </p>
//             <form className="flex">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 rounded-l-lg text-textColor-dark bg-background-light focus:outline-none border border-gray-300"
//               />
//               <button
//                 type="submit"
//                 className="bg-primary-default px-4 py-2 rounded-r-lg hover:bg-primary-hover transition-all duration-300"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>

//           {/* Social Media Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 border-b border-primary-default pb-2">Follow Us</h3>
//             <div className="flex space-x-4">
//               {socialMedia.map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.href}
//                   className="text-textColor-muted hover:text-accent-default transition-all duration-300"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {social.icon}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-700 mt-8 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             {/* Copyright */}
//             <p className="text-sm text-textColor-muted">
//               &copy; {new Date().getFullYear()} Your E-commerce Store. All rights reserved.
//             </p>

//             {/* Payment Methods */}
//             <div className="flex space-x-4 mt-4 md:mt-0">
//               {paymentMethods.map((payment, index) => (
//                 <Image
//                   key={index}
//                   src={payment.src}
//                   alt={payment.alt}
//                   width={50}
//                   height={30}
//                   className="object-contain"
//                   sizes="(max-width: 768px) 50px, (max-width: 1024px) 70px, 100px"
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import { Bell,Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const customerSupport = [
    { name: "Shipping Information", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const socialMedia = [
    { icon: <Facebook size={20} />, href: "https://facebook.com" },
    { icon: <Twitter size={20} />, href: "https://twitter.com" },
    { icon: <Instagram size={20} />, href: "https://instagram.com" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com" },
    { icon: <Youtube size={20} />, href: "https://youtube.com" },
  ];

  return (
    <footer className="bg-background-dark text-white py-10">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Top Section: Logo & Brief Info */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-8">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold mb-3">Waggle</h1>
            <p className="text-gray-400 text-sm max-w-sm">
              Discover the best deals on high-quality fashion & accessories. Shop confidently with fast shipping and secure checkout.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="mt-6 md:mt-0 flex space-x-4">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-3 rounded-full bg-primary-default hover:bg-gradient-to-r from-secondary-light to-accent-default text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mt-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-textColor-default">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent-default transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-textColor-default">Customer Support</h3>
            <ul className="space-y-2">
              {customerSupport.map((support, index) => (
                <li key={index}>
                  <Link
                    href={support.href}
                    className="text-gray-400 hover:text-accent-default transition-all duration-300"
                  >
                    {support.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-textColor-default">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="flex">
              {/* <Input
                type="email"
                id="search"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your email"/> */}
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg text-textColor-dark bg-background-light focus:outline-none border border-gray-300"
              />
              <Button
              size='md'
              variant='primary'
                type="submit"
                className="bg-primary-default px-4 py-2 rounded-r-lg hover:bg-primary-hover transition-all duration-300"
              >
               <Bell size={20}/> Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Waggle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
