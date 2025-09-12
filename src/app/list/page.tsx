import React, { Suspense } from 'react'
import Image from 'next/image'
import Filter from '@/components/Filter'
import ProductList from '@/components/ProductList'
import { wixClientServer } from '@/lib/wixClientServer'

const page = async ({ searchParams }: { searchParams: any }) => {
  // console.log('search', searchParams);
  const wixClient = await wixClientServer();
  
  async function getCategoryBySlug(slug: string) {
    const { categories: cats } = await wixClient.categories.searchCategories({
      filter: {
        slug: slug
      }
    }, {
      treeReference: {
        appNamespace: "@wix/stores",
        treeKey: null
      }
    });
  
    return cats?.[0] ?? null;
  }
  
  const rawCat = Array.isArray(searchParams.cat)
    ? searchParams.cat[0]
    : searchParams.cat;

  const slug = typeof rawCat === "string"
    ? decodeURIComponent(rawCat).trim().toLowerCase()
    : "all-products"; // 默认兜底

  // 调用工具函数
  const cat = await getCategoryBySlug(slug);
  
  // If no category found and slug is not "all-products", try to find by category filter
  let categoryId = cat?._id;
  if (!categoryId && searchParams.category) {
    const categoryByFilter = await getCategoryBySlug(searchParams.category);
    categoryId = categoryByFilter?._id;
  }

  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      {/* CAMPAIGN */}
      <div className='hidden bg-pink-50 px-4 sm:flex justify-between h-64'>
        <div className='w-2/3 flex flex-col items-center justify-center gap-8'>
          <h1 className='text-4xl font-semibold leading-[48px] text-gray-700'>
            Grab up to 50% off on
            <br />Selected Products
          </h1>
          <button className='rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm'>Buy Now</button>
        </div>
        <div className='relative w-1/3'>
          <Image
            src='/woman.png'
            alt=''
            fill
            className='object-contain'
          />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCT */}
      <h1 className='mt-12 text-xl font-semibold'>Shoes For You</h1>
      <Suspense fallback={'loading'}>
      <ProductList categoryId={categoryId || 'all-products'} searchParams={searchParams}/>
      </Suspense>
    </div>
  )
}

export default page
