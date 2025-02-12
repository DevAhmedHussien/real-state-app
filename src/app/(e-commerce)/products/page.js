
import { products } from '@/constants/data';
import ShownProductCard from '@/components/component/card/ShownProductCard';
import Sorting from './Sorting';
import Link from 'next/link';

const sortOptions = ['Relevance', 'Trending', 'Latest Arrivals', 'Price: Low to High', 'Price: High to Low'];
const ITEMS_PER_PAGE = 6;

// Generate metadata for SEO
export async function generateMetadata({ searchParams }) {
  const { sort = 'Relevance', page = 1, query = '' } = await searchParams;

  const title = query ? `Search Results for "${query}" - Page ${page}` : `All Products - Page ${page}`;
  const description = query
    ? `Explore search results for "${query}". Sort by ${sort} and browse page ${page}. Find the best deals online.`
    : `Explore our collection of all products. Sort by ${sort} and browse page ${page}. Find the best deals online.`;

  return {
    title,
    description,
    keywords: `all products, online store, buy products, ${sort}, ${query}`,
    openGraph: {
      title,
      description,
      images: [{ url: `/images/all-products.jpg`, width: 800, height: 600, alt: 'All Products Collection' }],
    },
    alternates: {
      canonical: `https://www.mystore.com/products?search=${query}&sort=${sort}&page=${page}`,
    },
  };
}

const Products = async ({ searchParams }) => {
  const { sort = 'Relevance', page = 1, query = '' } = await searchParams;

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query?.toLowerCase() || '')
  );

  // Sort products based on selected sort option
  const sortedProducts = [...(query ? filteredProducts : products)].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    switch (sort) {
      case 'Price: Low to High':
        return priceA - priceB;
      case 'Price: High to Low':
        return priceB - priceA;
      default:
        return 0;
    }
  });

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (Number(page) - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full lg:w-[80vw] p-6 bg-background-light rounded-lg shadow-md">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-textColor-dark mb-6">
        {query ? `Search Results for "${query}"` : 'All Products'}
      </h1>

      {/* Sorting */}
      <Sorting sortOptions={sortOptions} selectedSort={sort} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <Link key={product.id} href={`/look/${product.handlerName}`} className="block">
            <ShownProductCard key={product.id} product={product} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            href={`/products?search=${query}&sort=${sort}&page=${i + 1}`}
            className={`mx-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              Number(page) === i + 1 ? 'bg-primary-default text-white shadow-md' : 'bg-gray-200 hover:bg-primary-hover hover:text-white'
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
