'use client';
import { useRouter } from 'next/navigation';

const Sorting = ({ sortOptions, selectedSort }) => {
  const router = useRouter();

  const handleSortChange = (e) => {
    router.push(`?sort=${encodeURIComponent(e.target.value)}`);
  };
  
  return (
    <div className="mb-6">
      <label htmlFor="sort" className="mr-2">Sort by:</label>
      <select
        id="sort"
        value={selectedSort}
        onChange={handleSortChange}
        className="p-2 border rounded"
      >
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
'use client';
// import { useRouter } from 'next/navigation';

// const Sorting = ({ sortOptions, selectedSort }) => {
//   const router = useRouter();

//   const handleSortChange = (e) => {
//     router.push(`?sort=${encodeURIComponent(e.target.value)}`);
//   };

//   return (
//     <div className="mb-8">
//       {/* Label */}
//       <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
//         Sort by:
//       </label>

//       {/* Dropdown */}
//       <div className="relative">
//         <select
//           id="sort"
//           value={selectedSort}
//           onChange={handleSortChange}
//           className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm appearance-none bg-white"
//         >
//           {sortOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>

//         {/* Dropdown Icon */}
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//           <svg
//             className="h-4 w-4"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             aria-hidden="true"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sorting;