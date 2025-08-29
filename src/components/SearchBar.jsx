'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
const SearchBar = () => {

    const router = useRouter();
    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');

        if (name) {
            router.push(`/search?name=${name}`)
        }
    }
  return (
    <form className='flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1'onSubmit={handleSearch}>
      <input type='text' name='name'placeholder='Search' className='flex-1 outline-none bg-transparent'/>
      <button className='cursor-pointer'>
        <Image src='/search.png' alt='search' width={16} height={16} />
      </button>
    </form>
  )
}

export default SearchBar
