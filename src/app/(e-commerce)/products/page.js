
import { products } from '@/constants/data';
import ShownProductCard from '@/components/component/card/ShownProductCard';
import Sorting from './Sorting';
import Link from 'next/link';
import Pagination from './Pagination';
import {  paginateProducts, sortOptions, sortProducts } from '@/lib/cashe';


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

  const data = filteredProducts;
  const sortedProducts = sortProducts(data, sort);
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = paginateProducts(sortedProducts, Number(page), ITEMS_PER_PAGE);

  return (
    <div className="w-full lg:w-[80vw] p-6 bg-background-light rounded-lg shadow-md">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-textColor-dark mb-6"> {query ? `Search Results for "${query}"` : 'All Products'} </h1>

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
      <Pagination  page = {page}  totalPages={totalPages} query={query} sort={sort} />

    </div>
  );
};

export default Products;
