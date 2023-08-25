import { AccessTime, Chat, LocationOn, Phone, PhoneIphone, RemoveRedEye, Share } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Product({ product, url }: any) {

  const { image, type, country, address, price, name, id } = product;

  useEffect(() => {
    AOS.init();
  }, [product])

  return (
    <div className='bg-white shadow-lg border-[#795453] rounded-lg my-5 w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition' data-aos={url !== "login" && url !== "signup" && "fade-up"}>
      <div className='border border-gray-300 mb-2'>
        <Link href={`product-details/${id}`}>
          <Image
            src={image}
            alt={name}
          />
        </Link>
      </div>
      <div className='p-5'>
        <div className='mb-4 flex gap-x-2 text-sm'>
          <div className='bg-[#e52320] text-white rounded-full px-3'>
            {type}
          </div>
          {/* <div className='bg-green-500 rounded-full text-white px-3'>
          {country}
        </div> */}
        </div>
        <div className='text-lg font-semibold max-w-[260px] cursor-pointer hover:text-[#e52320]'>
          <Link href={`product-details/${id}`}>
            {address}
          </Link>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center text-gray-600 gap-2 mt-2'>
            <div className='text-[10px]'>
              <AccessTime className="text-gray-500" />
            </div>
            <h1 className='text-sm'>3 days ago</h1>
          </div>
          <div className='flex items-center text-gray-600 gap-2 mt-2'>
            <div className='text-[10px]'>
              <LocationOn className="text-gray-500" />
            </div>
            <h1 className='text-sm'>6067 Sachseln , Obwalden Switzerland</h1>
          </div>
          <div className='flex items-center text-gray-600 gap-2 mt-2'>
            <div className='text-[10px]'>
              <RemoveRedEye className="text-gray-500" />
            </div>
            <h1 className='text-sm'>11 Views</h1>
          </div>
          <div className='space-y-1'>
            <h1 className='text-[#e52320] text-2xl font-bold'>CHF {price}</h1>
            <h1 className='text-gray-500 text-lg font-bold'>Euro {price * 2}</h1>
          </div>
          <div className='flex flex-row space-x-4 text-gray-600 w-full h-10 mb-10 border-t-2 pt-4'>
            <Share />
            <Chat />
            <Phone />
            {/* <div className=' p-3 border border-gray-400'>
          <div className='bg-green-600 rounded-full h-8 w-8 p-1 text-white'>
            <Share className='text-xl'/>
          </div>
        </div>
        <div className=' p-3 border border-gray-400'>
          <div className='bg-red-500 rounded-full h-8 w-8 p-1 text-white'>
            <PhoneIphone/>
          </div>
        </div> */}
          </div>
          <div className='invisible'>
            flflf
          </div>
        </div>
      </div>
    </div>
  )
}
