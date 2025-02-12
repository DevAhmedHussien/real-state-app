import AnimatedtedProducts from '@/components/component/ainmated-products/AnimatedtedProducts';
import ShownProductCard from '@/components/component/card/ShownProductCard';
import { products } from '@/constants/data';
import Link from 'next/link';
import Head from 'next/head';
import EmblaCarousel from '@/components/component/product-slider/EmblaCarousel';
import HeroSection from '@/components/component/hero-section/HeroSection';
import Categories from '@/components/component/categories/Categories';

// Metadata for SEO
export const metadata = {
  title: 'Home | My Awesome Store',
  description: 'Discover the best products at My Awesome Store. Shop now for amazing deals on fashion, electronics, and more!',
  keywords: 'online store, fashion, electronics, deals, shopping',
  openGraph: {
    title: 'Home | My Awesome Store',
    description: 'Discover the best products at My Awesome Store. Shop now for amazing deals on fashion, electronics, and more!',
    images: [
      {
        url: '/images/home-og.jpg',
        width: 1200,
        height: 630,
        alt: 'My Awesome Store',
      },
    ],
  },
};

const SLIDES = [
  '/images/shirt.png',
  '/images/shirt.png',
  '/images/shirt.png',
  '/images/shirt.png',
  '/images/hoodie.png',
  '/images/hoodie.png',
  '/images/hoodie.png',
  '/images/hoodie.png',
]

export default function ProductPage() {
  return (
    <>
      {/* Add Metadata to the Head */}
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
      </Head>

      <div className="container  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Heading */}
        {/* <h1 className="text-3xl font-bold text-center mb-8">Welcome to My Awesome Store</h1> */}

        <HeroSection/>

        <Categories/>

        {/* Product Grid */}
        <h2 className="text-3xl mt-6 text-primary-dark font-bold text-left mb-6">Trending this Season</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side - 3/5 Width */}
          
          <div className="lg:col-span-3 h-full">
            <Link key={products[0].id} href={`/look/${products[0].handlerName}`}>
              <ShownProductCard product={products[0]} />
            </Link>
          </div>

          {/* Right Side - 2/5 Width */}
          <div className="lg:col-span-2 flex flex-col gap-6 h-full">
            {products.slice(1, 3).map((product) => (
              <Link key={product.id} href={`/look/${product.handlerName}`}>
                <ShownProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>

        {/* Animated Products Section */}
        <div className="mt-5">
          <h2 className="text-3xl text-primary-dark font-bold text-left mb-6">Featured Products</h2>
          {/* <AnimatedtedProducts /> */}
          <EmblaCarousel slides={SLIDES} />
        </div>

        <div className='mt-5'>
        </div>
      </div>
    </>
  );
}