
import ShownProductCard from '@/components/component/card/ShownProductCard';
import Sorting from '../Sorting';
import Link from 'next/link';
import Pagination from '../Pagination';
import { CATEGORY_MAP, getCategoryData, paginateProducts, sortOptions, sortProducts } from '@/lib/cashe';

// Generate static paths for all categories
export async function generateStaticParams() {
  return CATEGORY_MAP.map((title) => ({ title }));
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }) {
  const { title } = await params;
  const { sort = sortOptions[0], page = 1 } = await searchParams;


  const categoryName = title.charAt(0).toUpperCase() + title.slice(1); 
  return {
    title: `${categoryName} - Page ${page} | My Store`,
    description: `Explore our collection of ${categoryName}. Sort by ${sort} and browse page ${page}. Find the best deals online.`,
    keywords: `${categoryName}, online store, buy ${categoryName}, ${sort}`,
    openGraph: {
      title: `${categoryName} - Page ${page} | My Store`,
      description: `Explore our collection of ${categoryName}. Sort by ${sort} and browse page ${page}. Find the best deals online.`,
      images: [{ url: `/images/${title}.jpg`, width: 800, height: 600, alt: `${categoryName} Collection` }],
    },
    alternates: {
      canonical: `https://www.mystore.com/products/${title}?sort=${sort}&page=${page}`,
    },
  };
}

// ** Main Products Component **
export default async function Products({ params, searchParams }) {
  const { title } = await params;
  const { sort = sortOptions[0] , page = 1 } = await searchParams;

  if (!CATEGORY_MAP.includes(title)) {
    return <div className="text-red-500 text-center font-bold mt-10">Invalid category</div>;
  }

  const data = getCategoryData(title);
  const sortedProducts = sortProducts(data, sort);
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = paginateProducts(sortedProducts, Number(page), ITEMS_PER_PAGE);

  return (
    <div className="w-full p-3">
      
      <div className='flex justify-between items-center flex-wrap'>
        <h1 className="text-2xl font-bold text-primary-dark mb-6 capitalize">{title} Collection</h1>
        <Sorting sortOptions={sortOptions} selectedSort={sort} />
      </div>
     
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
        {paginatedProducts.map((product) => (
          <Link key={product.id} href={`/look/${product.handlerName}`} className="block">
            <ShownProductCard key={product.id} product={product} />
          </Link>
        ))}
      </div>

      <Pagination  page = {page}  totalPages={totalPages}  sort={sort} title={title} />
    </div>
  );
}
