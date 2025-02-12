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