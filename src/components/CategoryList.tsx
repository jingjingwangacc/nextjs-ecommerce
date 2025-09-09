import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { wixClientServer } from '@/lib/wixClientServer';

function wixMediaToUrl(wixUrl: string, opts?: { width?: number; height?: number }) {
    if (!wixUrl.startsWith("wix:image://")) return wixUrl;
  
    const [, after] = wixUrl.split("wix:image://v1/");
    const [mediaId] = after.split("/");
    let base = `https://static.wixstatic.com/media/${mediaId}`;
  
    if (opts?.width || opts?.height) {
      const w = opts.width ?? 0;
      const h = opts.height ?? 0;
      base += `/v1/fill/w_${w},h_${h},al_c,q_85`;
    }
  
    return base;
  }
  

const CategoryList = async() => {

    const wixClient = await wixClientServer();
    const cats = await wixClient.categories.searchCategories({}, {treeReference: {
      "appNamespace": "@wix/stores",
      "treeKey": null
    }});
    //console.log('cats', cats);

    return (
        <div className='px-4 overflow-x-scroll scrollbar-hide'>
            <div className='flex gap-4 md:gap-8'>
                {cats.categories?.map((item) => (
                    <Link 
                        href={`/list?cat=${item.slug}`}
                        className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'
                        key={item._id}>
                    <div className='relative bg-slate-100 w-full h-96'>
                        <Image
                            src={wixMediaToUrl(item.image!) || 'cat.png'}
                            alt=''
                            fill
                            sizes='20vw'
                            className='object-cover'
                        />
                    </div>
                    <h1 className='mt-8 font-light text-cl tracking-wide'>{item.name}</h1>
                </Link>
                ))}
                
                

            </div>

        </div>
    )
}

export default CategoryList
