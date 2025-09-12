"use client"

import { usePathname, useSearchParams, useRouter} from "next/navigation"
import { useEffect, useState } from "react"

const Filter = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {replace} = useRouter();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleFilterChange = (e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;
    const params = new URLSearchParams(searchParams);
    
    // Remove empty values
    if (value === '' || value === 'Type' || value === 'Category' || value === 'Sort By' || value === 'All Filters') {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    
    replace(`${pathname}?${params.toString()}`)
  }

  const clearFilters = () => {
    replace(pathname);
  }

  return (
    <div className='mt-12 flex justify-between'>
      <div className='flex gap-6 flex-wrap'>
        <select 
          name="type" 
          id="" 
          className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'
          onChange={handleFilterChange}
          value={searchParams.get('type') || ''}
        >
            <option value="">Type</option>
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
        </select>
        
        <input 
            type="number" 
            name='min' 
            placeholder='min price' 
            className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400'
            onChange={handleFilterChange}
            value={searchParams.get('min') || ''}
        />
        
        <input 
            type="number" 
            name='max' 
            placeholder='max price' 
            className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400'
            onChange={handleFilterChange}
            value={searchParams.get('max') || ''}
        />
        
        <select 
          name="category" 
          id="" 
          className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'
          onChange={handleFilterChange}
          value={searchParams.get('category') || ''}
        >
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
        </select>
        
        <button 
          onClick={clearFilters}
          className='py-2 px-4 rounded-2xl text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200'
        >
          Clear Filters
        </button>
      </div>
      
      <div className=''>
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
          value={searchParams.get('sort') || ''}
        >
          <option value="">Sort By</option>
          <option value="asc priceData.price">Price (low to high)</option>
          <option value="desc priceData.price">Price (high to low)</option>
          <option value="asc name">Name (A-Z)</option>
          <option value="desc name">Name (Z-A)</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
