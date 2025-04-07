import { SLIDES, products } from '@/constants/data';
import Head from 'next/head';
import EmblaCarousel from '@/components/component/product-slider/EmblaCarousel';
import HeroSection from '@/components/component/hero-section/HeroSection';
import Categories from '@/components/component/categories/Categories';
import NextLink from '@/components/ui/NextLink';
import ProductSection from '@/components/component/product-section/ProductSection';
import NewApartmentForm from '@/components/component/forms/new-appartment-form/NewApartmentForm';

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


export default function ProductPage() {
  return (
    <>
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
        <HeroSection/>
        <Categories/>

        {/*  Product Section  Trending &&  Arrival*/}
        {/* <ProductSection title="Trending this Season" products={products} link="/products" />
        <ProductSection title="Just Arrival" products={products} link="/products" reverseLayout /> */}


        {/* Animated Products Section */}
        <div className="mt-5 p-6">
          <h2 className="text-3xl text-primary-dark mb-6 font-bold text-left">
            Featured Products 
            <span className="text-xl ml-5 text-primary-hover cursor-pointer hover:text-primary-dark underline transition-all delay-100 "> 
            <NextLink href='/products' className='responsive-appbar-button'> all</NextLink> </span>
          </h2> 
          
          {/* <AnimatedtedProducts /> */}
          <EmblaCarousel slides={SLIDES} />

        </div>
    </>
  );
}