/*
This page is about is about product details. In this page there is two divs one for showing product details and one for showing sellers 
details. Both divs are named in comments

*/
'use client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import productData from '@/utils/data';
import Image from 'next/image';
import { AccessTime, Facebook, FavoriteBorder, Mail, Phone, PhoneInTalk, Place, Share, Twitter, Visibility, WarningAmber, WhatsApp } from '@mui/icons-material';
import profilePic from "../../../public/assets/profile_pic.jpeg";
import Link from 'next/link';
import MapContainer from '@/components/MapContainer';
import Home from '@/components/Home';
import AOS from 'aos'
import useWindowDimensions from '@/utils/useWindowDimensions';

export default function ProductDetails() {

  const { id } = useParams();

  const product = productData.find((product) => {
    return product.id === Number(id)
  });

  let image: any = product?.image || '';
  let name: string = product?.name || '';

  const [contact, setContact] = React.useState(false);

  useEffect(() => {
    AOS.init();
  }, [id])

  const handleChange = () => {
    setContact(!contact)
  };

  const overviewStyle = 'text-md font-bold';
  const listStyle = 'border-t border-gray-400 py-3 w-52';
  const listStyle2 = 'text-sm text-gray-500';

  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;


  return (
    <>
      <Home>
        <section className='flex lg:mx-20 md:mx-0 md:my-20 mx-4 md:flex-row flex-col'>
          {/* Products details div start */}
          <div className={`${newWidth <= 1024 && newHeight <= 885 ? 'md:mx-5' : 'md:mx-10'}  lg:w-[890px] min-h-[800px] mb-5 border rounded-lg bg-white p-5`} data-aos="fade-up">
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
              <div>
                <h1 className='text-2xl font-semibold'>{product?.name}</h1>
                <h1 className='text-lg mb-4'>{product?.address}</h1>
              </div>
              <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
                <h1 className={`${newWidth === 1024 && newHeight === 885 ? 'text-sm' : 'text-xl'} font-semibold text-white bg-green-500 px-3 rounded-full`}>{product?.type}</h1>
              </div>
            </div>
            <div className='flex flex-col items-start gap-8 lg:flex-row'>
              <div className='max-x-[768px]'>
                <div className='mb-8'>
                  <Image
                    className='border rounded-lg'
                    src={image}
                    alt={name}
                    width={800}
                    height={800}
                  />
                </div>
              </div>
            </div>
            {/* <div className="font-semibold mb-5 space-y-2 border rounded-lg rounded-bl-[70px] border-[#e52320] md:w-72 md:h-auto w-40 h-32 p-4 px-12 bg-white">
          <h1 className='text-[#e52320] text-sm md:text-3xl'>CHF {product?.price}</h1>
          <h1 className='text-gray-600 text-sm md:text-xl'>Euro {Number(product?.price) * 2}</h1>
        </div> */}
            <div className='bg-[#e52320] space-y-2 rounded-lg rounded-tr-[700px] rounded-br-[700px] w-40 p-2 mb-5 h-16 md:w-64 md:h-auto'>
              <h1 className='text-white text-sm md:text-3xl font-bold'>CHF {product?.price}</h1>
              <h1 className='text-gray-300 text-sm md:text-xl font-semibold'>Euro {Number(product?.price) * 2}</h1>
            </div>
            <div className='flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-2'>
              <div className='flex flex-row gap-2 text-gray-600'>
                <AccessTime className='text-[#e52320]' />
                <h1>17/08/2023 9:20</h1>
              </div>
              <div className='flex flex-row gap-2 text-gray-600'>
                <Place className='text-[#e52320]' />
                <h1>{product?.address}</h1>
              </div>
            </div>
            <div className='mt-5'>{product?.description}</div>
            <div className='flex flex-col md:flex-row justify-between'>
              <div className='mt-5'>
                {/* <h1 className='text-3xl font-bold mb-3'>Overview</h1> */}
                <h1 className='text-xl font-bold'>
                  <span className="relative">
                    <span>Ove</span>
                    <span className="absolute bottom-0 left-0 w-7 h-1 bg-red-500 top-7"></span>
                  </span>
                  <span>rview</span>
                </h1>
                <ul className='space-y-2 mb-5 mt-5'>
                  <li><span className={overviewStyle}>Condition: </span> New</li>
                  <li><span className={overviewStyle}>Brand: </span> BMW</li>
                  <li><span className={overviewStyle}>Year: </span> 2013</li>
                  <li><span className={overviewStyle}>Body Shape: </span> Others</li>
                  <li><span className={overviewStyle}>Gearbox: </span> Automatic</li>
                  <li><span className={overviewStyle}>fuel type: </span> Electric</li>
                  <li><span className={overviewStyle}>Kilometers: </span> 1000</li>
                  <li><span className={overviewStyle}>Engine capacity: </span> 2500</li>
                  <li><span className={overviewStyle}>Cylinders: </span> Good</li>
                  <li><span className={overviewStyle}>Exterior: </span> White</li>
                </ul>
                <div className={listStyle}>
                  <Visibility className='text-gray-500' /> <span className={listStyle2}>16 views</span>
                </div>
                <div className={listStyle}>
                  <FavoriteBorder className='text-gray-500' /> <span className={listStyle2}>Add to Favourites</span>
                </div>
                <div className={listStyle}>
                  <WarningAmber className='text-gray-500' /> <span className={listStyle2}>Report abuse</span>
                </div>
                <div className={listStyle}>
                  <Share className='text-gray-500' /> <span className={listStyle2}>Share this add</span>
                  <div className='space-x-2 mt-4'>
                    <Facebook className='text-blue-600 text-3xl' /><Twitter className='text-blue-400 text-3xl' /><WhatsApp className='text-green-400 text-3xl' />
                  </div>
                </div>
              </div>
              <div className='mt-8 mr-10'>
                <MapContainer apikey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API} address={product?.address} />
              </div>
            </div>
          </div>
          {/* Products details div end */}

          {/* Seller details div start */}
          <div className='max-h-[440px] lg:w-[450px] w-auto' data-aos="fade-up">
            <div className='container mb-14 bg-white p-5 border rounded-lg'>
              <div className='border-b border-gray-300'>
                <h1 className='text-xl text-center font-bold uppercase mb-3'>Seller Information</h1>
              </div>
              <div className='flex flex-row mt-4 space-x-2'>
                <Image
                  className='h-20 w-20 border bg-green-500 rounded-full'
                  src={profilePic}
                  alt="logo"
                  width={100}
                  height={100}
                />
                <h1 className='mt-5 text-lg font-semibold'>User Profile 1</h1>
              </div>
              <div className='space-y-3'>
                <div className='flex flex-row mt-5'>
                  <div className='flex flex-row gap-2 text-gray-600'>
                    <Place className='text-[#e52320]' />
                    <h1>Escher Straße 129-131, 50739 Cologne , Westphalia Germany</h1>
                  </div>
                </div>
                {!contact && <div className='border bg-gray-800 text-md font-semibold text-white p-2 rounded-md cursor-pointer' onClick={handleChange}>
                  <div className='flex flex-row justify-center gap-2'>
                    <Phone />
                    <span>Contact Seller</span>
                  </div>
                </div>}
                {contact &&
                  <div className='bg-gray-300 text-black border border-gray-300 flex justify-center transition ease-out duration-200'>
                    <ul className='space-y-3 py-3'>
                      <li className='space-x-3'><PhoneInTalk className='text-white border bg-purple-500 border-purple-500 rounded-lg mr-3' /> 8749834389</li>
                      <li><WhatsApp className='text-green-500 mr-3' /> 8938943382434</li>
                    </ul>
                  </div>}
                <div className='border bg-[#e52320] text-md font-semibold text-white p-2 rounded-md'>
                  <Link className='flex flex-row justify-center gap-2' href={`mailto:mudasirriaz649@gmail.com`}>
                    <Mail />
                    <span>Send Email</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Seller details div end */}
        </section>
      </Home>

    </>
  )
}
