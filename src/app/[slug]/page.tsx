import React from 'react'
import Image from 'next/image'
import ProductImages from '@/components/ProductImages'
import CustomizeProducts from '@/components/CustomizeProducts'
import Add from '@/components/Add'

const SinglePage = () => {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
      {/* IMG */}
      <div className='w-full lg:w-1/2 lg:sticky'>
        <ProductImages />
      </div>
      {/* TEXTS */}
      <div className='w-full lg:w-1/2 flex flex-col gap-6'>
        <h1 className='text-4xl font-medium'>Product Name</h1>
        <p className='text-gray-500'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore corporis, quasi eligendi architecto cumque quas nesciunt sed esse impedit tempora illum necessitatibus quam similique nihil hic inventore repellendus optio modi.
        </p>
        <div className='h-[2px] bg-gray-100' />
        <div className='flex items-center gap-4'>
          <h3 className='text-xl text-gray-500 line-through'>$59</h3>
          <h2 className='font-medium text-2xl'>$49</h2>
        </div>
        <div className='h-[2px] bg-gray-100' />
        <CustomizeProducts />
        <Add />
        <div className='h-[2px] bg-gray-100' />
        <div className='text-sm'>
          <h4 className='font-medium mb-4'>Title</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, vero velit. Ducimus alias aut soluta ad adipisci velit cum facere in animi! Et odio velit ab voluptatem laborum dolorum excepturi?</p>
        </div>
        <div className='text-sm'>
          <h4 className='font-medium mb-4'>Title</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, vero velit. Ducimus alias aut soluta ad adipisci velit cum facere in animi! Et odio velit ab voluptatem laborum dolorum excepturi?</p>
        </div>
        <div className='text-sm'>
          <h4 className='font-medium mb-4'>Title</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, vero velit. Ducimus alias aut soluta ad adipisci velit cum facere in animi! Et odio velit ab voluptatem laborum dolorum excepturi?</p>
        </div>
      </div>
    </div>
  )
}

export default SinglePage
