// import { products, shirts, hoodies, jeans, shoes } from '@/constants/data';
// import ShownProductCard from '@/components/component/card/ShownProductCard';
// import Sorting from '../Sorting';
// import Link from 'next/link';

// const CATEGORY_MAP = ['hoodies', 'jeans', 'shirts', 'shoes'];
// const sortOptions = ['Relevance', 'Trending', 'Latest Arrivals', 'Price: Low to High', 'Price: High to Low'];

// // Generate static paths for all categories
// export async function generateStaticParams() {
//   return CATEGORY_MAP.map((title) => ({
//     title,
//   }));
// }

// // Fetch data based on the category
// const getCategoryData = (title) => {
//   switch (title) {
//     case 'hoodies':
//       return hoodies;
//     case 'shirts':
//       return shirts;
//     case 'jeans':
//       return jeans;
//     case 'shoes':
//       return shoes;
//     default:
//       return products;
//   }
// };

// // Sort products based on the selected sort option
// const sortProducts = (products, sortOption) => {
//   return [...products].sort((a, b) => {
//     const priceA = parseFloat(a.price );
//     const priceB = parseFloat(b.price );
//     switch (sortOption) {
//       case 'Price: Low to High':
//         return priceA - priceB;
//       case 'Price: High to Low':
//         return priceB - priceA;
//       default:
//         return 0;
//     }
//   });
// };

// // Paginate products
// const paginateProducts = (products, page, itemsPerPage) => {
//   const startIndex = (page - 1) * itemsPerPage;
//   return products.slice(startIndex, startIndex + itemsPerPage);
// };

// // Generate metadata for SEO
// export async function generateMetadata({ params, searchParams }) {
//   const { title } = await params;
//   const { sort = 'Relevance', page = 1 } = await searchParams;

//   const categoryName = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize category name
//   const metadata = {
//     title: `${categoryName} - Page ${page} | My Store`,
//     description: `Explore our collection of ${categoryName}. Sort by ${sort} and browse page ${page}. Find the best deals online.`,
//     keywords: `${categoryName}, online store, buy ${categoryName}, ${sort}`,
//     openGraph: {
//       title: `${categoryName} - Page ${page} | My Store`,
//       description: `Explore our collection of ${categoryName}. Sort by ${sort} and browse page ${page}. Find the best deals online.`,
//       images: [
//         {
//           url: `/images/${title}.jpg`, // Add a relevant image for the category
//           width: 800,
//           height: 600,
//           alt: `${categoryName} Collection`,
//         },
//       ],
//     },
//     alternates: {
//       canonical: `https://www.mystore.com/products/${title}?sort=${sort}&page=${page}`,
//     },
//   };

//   return metadata;
// }

// // Make the page component async
// export default async function Products({ params, searchParams }) {
//   const { title } = await params;
//   const { sort = 'Relevance', page = 1 } = await searchParams;

//   // Redirect if category doesn't exist
//   if (!CATEGORY_MAP.includes(title)) {
//     return <div>Invalid category</div>;
//   }

//   // Get data for the category
//   const data = getCategoryData(title);

//   // Sort products
//   const sortedProducts = sortProducts(data, sort);

//   // Paginate products
//   const ITEMS_PER_PAGE = 6;
//   const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
//   const paginatedProducts = paginateProducts(sortedProducts, Number(page), ITEMS_PER_PAGE);

//   // Generate structured data for SEO
//   const structuredData = {
//     '@context': 'https://schema.org',
//     '@type': 'CollectionPage',
//     name: `${title} Collection`,
//     description: `Explore our collection of ${title}. Sort by ${sort} and browse page ${page}.`,
//     url: `https://www.mystore.com/products/${title}?sort=${sort}&page=${page}`,
//     mainEntity: {
//       '@type': 'ItemList',
//       itemListElement: paginatedProducts.map((product, index) => ({
//         '@type': 'ListItem',
//         position: index + 1,
//         item: {
//           '@type': 'Product',
//           name: product.name,
//           description: product.description,
//           image: product.image,
//           price: product.price,
//           url: `https://www.mystore.com/products/${title}/${product.id}`,
//         },
//       })),
//     },
//   };

//   return (
//     <div className="w-full lg:w-[70vw]">
//       <h1 className="text-2xl font-bold mb-6 capitalize">All Products</h1>

//       {/* Sorting */}
//       <Sorting
//         sortOptions={sortOptions}
//         selectedSort={sort}
//       />

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {paginatedProducts.map((product) => (
//             <Link key={product.id} href={`/look/${product.handlerName}`}>
//              <ShownProductCard key={product.id} product={product} />
//             </Link>

//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-8">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <a
//             key={i + 1}
//             href={`/products?sort=${sort}&page=${i + 1}`}
//             className={`mx-1 px-4 py-2 rounded ${
//               Number(page) === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             } hover:bg-blue-600 hover:text-white transition-colors duration-300`}
//             rel={i + 1 === Number(page) ? 'current' : i + 1 === Number(page) - 1 ? 'prev' : i + 1 === Number(page) + 1 ? 'next' : undefined}
//           >
//             {i + 1}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }
import { products, shirts, hoodies, jeans, shoes } from '@/constants/data';
import ShownProductCard from '@/components/component/card/ShownProductCard';
import Sorting from '../Sorting';
import Link from 'next/link';

const CATEGORY_MAP = ['hoodies', 'jeans', 'shirts', 'shoes'];
const sortOptions = ['Relevance', 'Trending', 'Latest Arrivals', 'Price: Low to High', 'Price: High to Low'];

// Generate static paths for all categories
export async function generateStaticParams() {
  return CATEGORY_MAP.map((title) => ({ title }));
}

// Fetch category data
const getCategoryData = (title) => {
  switch (title) {
    case 'hoodies':
      return hoodies;
    case 'shirts':
      return shirts;
    case 'jeans':
      return jeans;
    case 'shoes':
      return shoes;
    default:
      return products;
  }
};

// Sort products
const sortProducts = (products, sortOption) => {
  return [...products].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    switch (sortOption) {
      case 'Price: Low to High':
        return priceA - priceB;
      case 'Price: High to Low':
        return priceB - priceA;
      default:
        return 0;
    }
  });
};

// Paginate products
const paginateProducts = (products, page, itemsPerPage) => {
  const startIndex = (page - 1) * itemsPerPage;
  return products.slice(startIndex, startIndex + itemsPerPage);
};

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }) {
  const { title } = await params;
  const { sort = 'Relevance', page = 1 } = await searchParams;

  const categoryName = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize category name
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
  const { sort = 'Relevance', page = 1 } = await searchParams;

  if (!CATEGORY_MAP.includes(title)) {
    return <div className="text-red-500 text-center font-bold mt-10">Invalid category</div>;
  }

  const data = getCategoryData(title);
  const sortedProducts = sortProducts(data, sort);
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = paginateProducts(sortedProducts, Number(page), ITEMS_PER_PAGE);

  return (
    <div className="w-full lg:w-[80vw] p-6 bg-background-light rounded-lg shadow-md">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-textColor-dark mb-6 capitalize">{title} Collection</h1>

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
            href={`/products?sort=${sort}&page=${i + 1}`}
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
}
