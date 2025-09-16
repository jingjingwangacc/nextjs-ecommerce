import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';
import DOMPurify from "isomorphic-dompurify";
import Pagination from './Pagination';

const PRODUCT_PER_PAGE = 4;

const ProductList = async ({ categoryId, limit, searchParams }: { categoryId: string; limit?: number; searchParams?:any }) => {
    const wixClient = await wixClientServer();
    
    try {
      // First, get all products to calculate total count
      let allProductsQuery = wixClient.products.queryProducts();
      
      // Apply basic filters only
      if (searchParams?.type) {
        allProductsQuery = allProductsQuery.eq('productType', searchParams.type);
      }
      
      const allRes = await allProductsQuery.find();
      const allItems = allRes.items;
      
      // Calculate pagination info
      const page = searchParams?.page ? parseInt(searchParams.page) : 0;
      const limitValue = limit || PRODUCT_PER_PAGE;
      const totalItems = allItems.length;
      const totalPages = Math.ceil(totalItems / limitValue);
      const hasPrev = page > 0;
      const hasNext = page < totalPages - 1;
      
      // Apply pagination to the items
      const startIndex = page * limitValue;
      const endIndex = startIndex + limitValue;
      let items = allItems.slice(startIndex, endIndex);
      
      // Apply category filter after fetching (client-side filtering for now)
      if (categoryId && categoryId !== 'all-products') {
        items = items.filter(product => 
          product.collectionIds && 
          Array.isArray(product.collectionIds) && 
          product.collectionIds.includes(categoryId)
        );
      }
      
      // Apply price range filter (client-side)
      if (searchParams?.min) {
        const minPrice = parseFloat(searchParams.min);
        items = items.filter(product => (product.price?.price || 0) >= minPrice);
      }
      if (searchParams?.max) {
        const maxPrice = parseFloat(searchParams.max);
        items = items.filter(product => (product.price?.price || 0) <= maxPrice);
      }
      
      // Apply search filter (client-side)
      if (searchParams?.search) {
        const searchTerm = searchParams.search.toLowerCase();
        items = items.filter(product => 
          product.name?.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply sorting (client-side)
      if (searchParams?.sort) {
        const [sortType, sortBy] = searchParams.sort.split(' ');
        
        items.sort((a, b) => {
          let aValue, bValue;
          
          if (sortBy === 'priceData.price') {
            aValue = a.price?.price || 0;
            bValue = b.price?.price || 0;
          } else if (sortBy === 'name') {
            aValue = a.name || '';
            bValue = b.name || '';
          } else {
            return 0;
          }
          
          if (sortType === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }
      
      return (
        <div className='flex gap-x-8 gap-y-16 justify-between flex-wrap'>
          {items.length === 0 ? (
            <div className='w-full text-center py-12'>
              <p className='text-gray-500 text-lg'>No products found matching your criteria.</p>
            </div>
          ) : (
            items.map((product: products.Product) => (
              <Link href={"/" + product.slug} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]' key={product._id}>
                <div className='relative w-full h-80'>
                  <Image
                    src={product.media?.mainMedia?.image?.url || '/product.png'}
                    alt=''
                    fill
                    sizes='25vw'
                    className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
                  />
                  {product.media?.items && (<Image
                    src={product.media?.items[1]?.image?.url || '/product.png'}
                    alt=''
                    fill
                    sizes='25vw'
                    className='absolute object-cover rounded-md'
                  />)}
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>{product.name}</span>
                  <span className='font-semibold'>${product.price?.price}</span>
                </div>
                {product.additionalInfoSections && (
                  <div
                    className="text-sm text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        product.additionalInfoSections.find(
                          (section: any) => section.title === "shortDesc"
                        )?.description || ""
                      ),
                    }}
                  ></div>
                )}
                <button className='rounded-2xl ring-1 w-max ring-lama text-lama py-2 px-4 text-xs hover:bg-lama hover:text-white'>Add to Cart</button>
              </Link>
            ))
          )}
          <Pagination 
            currentPage={page} 
            hasPrev={hasPrev} 
            hasNext={hasNext}
          />
        </div>
      );
    } catch (error) {
      console.error('Error fetching products:', error);
      return (
        <div className='w-full text-center py-12'>
          <p className='text-red-500 text-lg'>Error loading products. Please try again later.</p>
        </div>
      );
    }
}

export default ProductList