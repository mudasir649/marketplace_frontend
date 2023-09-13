import { AccessTime, Chat, Delete, EditNote, Favorite, LocationOn, Phone, PhoneIphone, RemoveRedEye, Share } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import useWindowDimensions from '@/utils/useWindowDimensions';
import { usePathname } from 'next/navigation';
import picOne from "../public/assets/picSix.jpg";


export default function Product({ product, url }: any) {

  const { image, type, address, price, name, id } = product;
  const [fav, setFav] = useState(false);

  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;

  const pathname = usePathname();

  useEffect(() => {
    AOS.init();
  }, [product]);


  const editAd = (id: any) => {
    console.log(id);
  }

  const deleteAd = (id: any) => {
    console.log(id);
  }

  const showDate = () => {
    let date = new Date(`${product?.createdAt}`).getTime();
    let now = new Date().getTime();
    const difference = now - date
    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }

  showDate()

  return (
    <div className={`${newWidth < 688 ? 'max-w-[500px]' : 'max-w-[352px]'} bg-white shadow-lg border-[#795453] 
      rounded-lg my-2 w-full h-auto mx-auto cursor-pointer hover:shadow-md hover:opacity-25 hover:shadow-[#e52320]`}
      data-aos={url !== "login" && url !== "signup" && "fade-up"}
    >
      <div className='border border-gray-300 mb-2 w-auto'>
        <span className={`${fav ? 'text-red-600' : 'text-white'} absolute end-2 mt-1`}
          onDoubleClick={() => setFav(!fav)}>
          <Favorite />
        </span>
        {/* <Image
          src={pathname == '/' || pathname == '/my-ads' || pathname ? picOne : image}
          alt={name}
          width={500}
          height={500}
        /> */}
        {/* <Image
          src={product?.image[1]}
          alt={name}
          width={200}
          height={200}
          className='object-fill'
        /> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product?.image[1]} alt="Image" className='w-96 h-48' />
      </div>
      <div className='p-5'>
        <div className='mb-4 flex gap-x-2 text-sm'>
          <div className='bg-[#e52320] text-white rounded-full px-3'>
            {product?.category}
          </div>
        </div>
        <div className='text-md line-clamp-2 font-semibold max-w-[260px] cursor-pointer hover:text-[#e52320]'>
          <Link href={`product-details/${product?._id}`}>
            {product?.title}
          </Link>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center text-gray-600 gap-2 mt-2'>
            <div className='text-[10px]'>
              <AccessTime className="text-gray-500" />
            </div>
            <h1 className='text-sm'>{showDate() <= 2 ?
              <div className='bg-green-600 text-white rounded-full px-3'>{'new'}</div> : `${showDate()} days agos`}</h1>
          </div>
          {pathname == '/my-ads' ? '' :
            <div className='flex items-center text-gray-600 gap-2 mt-2'>
              <div className='text-[10px]'>
                <LocationOn className="text-gray-500" />
              </div>
              <h1 className='text-sm'>{address}</h1>
            </div>
          }
          <div className='flex items-center text-gray-600 gap-2 mt-2'>
            <div className='text-[10px]'>
              <RemoveRedEye className="text-gray-500" />
            </div>
            <h1 className='text-sm'>{product?.views} Views</h1>
          </div>
          {pathname == '/my-ads' ?
            <>
              <div className='flex flex-row space-x-2'>
                <EditNote className='text-4xl text-yellow-500' />
                <Delete className='text-3xl text-red-500 mt-1' />
              </div>
            </> :
            <>
              <div className='space-y-1'>
                <h1 className='text-[#e52320] text-2xl font-bold'>CHF {price}</h1>
                <h1 className='text-gray-500 text-lg font-bold'>Euro {price * 2}</h1>
              </div>
              <div className='flex flex-row space-x-4 text-gray-600 w-full h-10 mb-10 border-t-2 pt-4'>
                <Share />
                <Chat />
                <Phone />
              </div>
            </>
          }
          <div className='invisible'>
            flflf
          </div>
        </div>
      </div>
    </div>
  )
}
