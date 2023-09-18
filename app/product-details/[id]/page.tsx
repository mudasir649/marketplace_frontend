/*
This page is about is about product details. In this page there is two divs one for showing product details and one for showing sellers 
details. Both divs are named in comments

*/
'use client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { AccessTime, ArrowBackIos, ArrowForwardIos, Camera, CameraAlt, Cancel, Facebook, FavoriteBorder, Mail, Phone, PhoneInTalk, Place, Share, Twitter, Visibility, WarningAmber, WhatsApp } from '@mui/icons-material';
import Link from 'next/link';
import MapContainer from '@/components/MapContainer';
import Home from '@/components/Home';
import AOS from 'aos'
import useWindowDimensions from '@/utils/useWindowDimensions';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './productDetails.css'

export default function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState<any>();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userData = userInfo?.data?.userDetails;

  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const addView = async () => {
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/addView?id=${id}`)
    }
    const fetchData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/getSpecific/${id}`);
      setProduct(res.data?.data);
    }
    addView()
    fetchData();
  }, [id])

  const [currentImage, setCurrentImage] = useState(0)
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

  const nextSlide = () => {
    setCurrentImage((prevSlide) => (prevSlide + 1) % product?.image.length);
    setSlide(slide + 1);
  };

  const prevSlide = () => {
    setCurrentImage((prevSlide) =>
      prevSlide === 0 ? product?.image.length - 1 : prevSlide - 1
    );
    setSlide(slide + 1)
  };

  if (!product) {
    return (
      <div className="flex justify-center mt-5">
        <Image
          src='/assets/eidcarosse.gif'
          alt="eidcarosse_logo"
          width={500}
          height={500}
        />
      </div>
    )
  }


  return (
    <>
      <Home>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 grid-flow-rows mx-20'>
          <div className='col-span-2'>
            <div className={`lg:w-auto min-h-[800px] mb-5 border rounded-lg bg-white p-5`} data-aos="fade-up">
              <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div>
                  <h1 className='text-2xl font-semibold'>{product?.title}</h1>
                  <h1 className='text-lg mb-4'>{product?.address}</h1>
                </div>
                <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
                  <h1 className={`${newWidth === 1024 && newHeight === 885 ? 'text-sm' : 'text-xl'} font-semibold text-white bg-red-600 px-3 rounded-full`}>{product?.category}</h1>
                </div>
              </div>
              <div className='flex flex-col items-start gap-8 lg:flex-row'>
                <div className='max-x-[768px] group relative'>
                  <div className='mb-2'>
                    <Image
                      className={`border rounded-lg cursor-pointer`}
                      src={product?.image[currentImage]}
                      alt={name}
                      width={800}
                      height={500}
                    />
                  </div>
                </div>
                {product?.image.length > 1 &&
                  <div className='absolute text-red-600 space-x-[680px] mx-5 mt-44'>
                    <button className="prev-button p-2 bg-gray-200 border-none rounded-full" onClick={prevSlide}>
                      <ArrowBackIos />
                    </button>
                    <button className="next-button p-2 bg-gray-200 border-none rounded-full" onClick={nextSlide}>
                      <ArrowForwardIos />
                    </button>
                  </div>
                }
              </div>
              {/* <div className="font-semibold mb-5 space-y-2 border rounded-lg rounded-bl-[70px] border-[#e52320] md:w-72 md:h-auto w-40 h-32 p-4 px-12 bg-white">
                  <h1 className='text-[#e52320] text-sm md:text-3xl'>CHF {product?.price}</h1>
                  <h1 className='text-gray-600 text-sm md:text-xl'>Euro {Number(product?.price) * 2}</h1>
                </div> */}
              {product?.image.length > 1 &&
                <div className='my-5'>
                  <div className='flex flex-row space-x-4'>
                    {product?.image?.map((image: any, i: any) => (
                      <div key={i} className="image-item" onClick={() => setCurrentImage(i)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className='h-32 w-32' src={image} alt={`Image ${i}`} />
                      </div>))}
                  </div>
                </div>
              }
              <h1 className='mb-3'><CameraAlt /> {currentImage + 1} / {product?.image.length} </h1>
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
              <div className='mt-5 bg-red-600 text-white w-32 p-1 text-center text-md border-none rounded-full'>Description</div>
              <div className='mt-5'>{product?.description}</div>
              <div className='flex flex-col md:flex-row justify-between'>
                <div className='mt-5'>
                  <h1 className='text-xl font-bold'>
                    <span className="relative">
                      <span>Ove</span>
                      <span className="absolute bottom-0 left-0 w-7 h-1 bg-red-500 top-7"></span>
                    </span>
                    <span>rview</span>
                  </h1>
                  <ul className='space-y-2 mb-5 mt-5'>
                    <li><span className={overviewStyle}>Condition: </span> {product?.condition}</li>
                    <li><span className={overviewStyle}>Brand: </span> {product?.brand}</li>
                    <li><span className={overviewStyle}>Year: </span> 2013</li>
                    {/* <li><span className={overviewStyle}>Body Shape: </span> {product?.bodyShape}</li>
                    <li><span className={overviewStyle}>Gearbox: </span> {product?.gearBox}</li>
                    <li><span className={overviewStyle}>fuel type: </span> {product?.fuelType}</li>
                    <li><span className={overviewStyle}>Kilometers: </span> {product?.kiloMeters}</li>
                    <li><span className={overviewStyle}>Engine capacity: </span> {product?.engineCapacity}</li>
                    <li><span className={overviewStyle}>Cylinders: </span> {product?.cylinders}</li>
                    <li><span className={overviewStyle}>Exterior: </span> {product?.exteriorColor}</li> */}
                  </ul>
                  <div className={listStyle}>
                    <Visibility className='text-gray-500' /> <span className={listStyle2}>{product?.views} views</span>
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
              </div>
            </div>
          </div>

          <div className=''>
            <div className='w-full lg:w-auto max-h-[440px]'>
              <div className=' bg-white p-5 border rounded-lg'>
                <div className='border-b border-gray-300'>
                  <h1 className='text-xl text-center font-bold uppercase mb-3'>Seller Information</h1>
                </div>
                <div className='flex flex-row mt-4 space-x-4'>
                  {/* <Image
                    className='h-16 w-16 border bg-green-500 rounded-full'
                    src={product?.userId?.image}
                    alt="logo"
                    width={100}
                    height={100}
                  /> */}
                  <h1 className='mt-5 text-lg font-semibold'>{product?.userId?.firstName + " " + product?.userId?.lastName} </h1>
                </div>
                <div className='space-y-3'>
                  <div className='flex flex-row mt-5'>
                    <div className='flex flex-row gap-2 text-gray-600'>
                      <Place className='text-[#e52320]' />
                      <h1>{product?.address}</h1>
                    </div>
                  </div>
                  {!contact && <div className='border bg-gray-800 text-md font-semibold text-white p-2 rounded-md cursor-pointer' onClick={handleChange}>
                    <div className='flex flex-row justify-center gap-2'>
                      <Phone />
                      <span>Contact Seller</span>
                    </div>
                  </div>}
                  {contact &&
                    <div className='bg-gray-100 text-black border border-gray-100 flex justify-center transition ease-out duration-200'>
                      <span className='absolute end-36'>
                        <Cancel className='text-red-500' onClick={() => setContact(false)} />
                      </span>
                      <ul className='space-y-3 py-3'>
                        {product?.viber && <li className='space-x-3'><PhoneInTalk className='text-white border bg-purple-500 border-purple-500 rounded-lg mr-3' /> {product?.viber}</li>}
                        {product?.whatsApp && < li > <WhatsApp className='text-green-500 mr-3' /> {product?.whatsApp}</li>}
                      </ul>
                    </div>}
                  <div className='border bg-[#e52320] text-md font-semibold text-white p-2 rounded-md'>
                    <Link className='flex flex-row justify-center gap-2' href={`mailto:${product?.email}`}>
                      <Mail />
                      <span>Send Email</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-5 bg-white p-3 space-y-3'>
              <h1 className='font-bold text-xl'>Location</h1>
              <div className='flex flex-row gap-2 text-gray-600'>
                <Place className='text-[#e52320]' />
                <h1>{product?.address}</h1>
              </div>
              <MapContainer apikey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API} address={product?.address} />
            </div>
          </div>

        </div>
      </Home>
    </>
  )

  return (
    <>
      <Home>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 grid-flow-rows mx-20'>
          <div className='col-span-2'>
            {/* <div className={`${newWidth <= 1024 && newHeight <= 885 ? 'md:mx-5' : 'md:mx-10'}  lg:w-[890px] min-h-[800px] mb-5 border rounded-lg bg-white p-5`} data-aos="fade-up"> */}
            <div className={`lg:w-auto min-h-[800px] mb-5 border rounded-lg bg-white p-5`} data-aos="fade-up">
              <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div>
                  <h1 className='text-2xl font-semibold'>{product?.title}</h1>
                  <h1 className='text-lg mb-4'>{product?.address}</h1>
                </div>
                <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
                  <h1 className={`${newWidth === 1024 && newHeight === 885 ? 'text-sm' : 'text-xl'} font-semibold text-white bg-red-600 px-3 rounded-full`}>{product?.category}</h1>
                </div>
              </div>
              <div className='flex flex-col items-start gap-8 lg:flex-row'>
                <div className='max-x-[768px] group relative'>
                  <div className='mb-2'>
                    <Image
                      className={`border rounded-lg cursor-pointer`}
                      src={product?.image[currentImage]}
                      alt={name}
                      width={800}
                      height={500}
                    />
                  </div>
                </div>
                {product?.image.length > 1 &&
                  <div className='absolute text-red-600 space-x-[680px] mx-5 mt-44'>
                    <button className="prev-button p-2 bg-gray-200 border-none rounded-full" onClick={prevSlide}>
                      <ArrowBackIos />
                    </button>
                    <button className="next-button p-2 bg-gray-200 border-none rounded-full" onClick={nextSlide}>
                      <ArrowForwardIos />
                    </button>
                  </div>
                }
              </div>
              {/* <div className="font-semibold mb-5 space-y-2 border rounded-lg rounded-bl-[70px] border-[#e52320] md:w-72 md:h-auto w-40 h-32 p-4 px-12 bg-white">
                  <h1 className='text-[#e52320] text-sm md:text-3xl'>CHF {product?.price}</h1>
                  <h1 className='text-gray-600 text-sm md:text-xl'>Euro {Number(product?.price) * 2}</h1>
                </div> */}
              {product?.image.length > 1 &&
                <div className='my-5'>
                  <div className='flex flex-row space-x-4'>
                    {product?.image?.map((image: any, i: any) => (
                      <div key={i} className="image-item" onClick={() => setCurrentImage(i)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className='h-32 w-32' src={image} alt={`Image ${i}`} />
                      </div>))}
                  </div>
                </div>
              }
              <h1 className='mb-3'><CameraAlt /> {currentImage + 1} / {product?.image.length} </h1>
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
              <div className='mt-5 bg-red-600 text-white w-32 p-1 text-center text-md border-none rounded-full'>Description</div>
              <div className='mt-5'>{product?.description}</div>
              <div className='flex flex-col md:flex-row justify-between'>
                <div className='mt-5'>
                  <h1 className='text-xl font-bold'>
                    <span className="relative">
                      <span>Ove</span>
                      <span className="absolute bottom-0 left-0 w-7 h-1 bg-red-500 top-7"></span>
                    </span>
                    <span>rview</span>
                  </h1>
                  <ul className='space-y-2 mb-5 mt-5'>
                    <li><span className={overviewStyle}>Condition: </span> {product?.condition}</li>
                    <li><span className={overviewStyle}>Brand: </span> {product?.brand}</li>
                    <li><span className={overviewStyle}>Year: </span> 2013</li>
                    {/* <li><span className={overviewStyle}>Body Shape: </span> {product?.bodyShape}</li>
                    <li><span className={overviewStyle}>Gearbox: </span> {product?.gearBox}</li>
                    <li><span className={overviewStyle}>fuel type: </span> {product?.fuelType}</li>
                    <li><span className={overviewStyle}>Kilometers: </span> {product?.kiloMeters}</li>
                    <li><span className={overviewStyle}>Engine capacity: </span> {product?.engineCapacity}</li>
                    <li><span className={overviewStyle}>Cylinders: </span> {product?.cylinders}</li>
                    <li><span className={overviewStyle}>Exterior: </span> {product?.exteriorColor}</li> */}
                  </ul>
                  <div className={listStyle}>
                    <Visibility className='text-gray-500' /> <span className={listStyle2}>{product?.views} views</span>
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
              </div>
            </div>
          </div>

          <div className=''>
            <div className='w-full lg:w-auto max-h-[440px]'>
              <div className=' bg-white p-5 border rounded-lg'>
                <div className='border-b border-gray-300'>
                  <h1 className='text-xl text-center font-bold uppercase mb-3'>Seller Information</h1>
                </div>
                <div className='flex flex-row mt-4 space-x-4'>
                  <Image
                    className='h-16 w-16 border bg-green-500 rounded-full'
                    src={product?.userId?.image}
                    alt="logo"
                    width={100}
                    height={100}
                  />
                  <h1 className='mt-5 text-lg font-semibold'>{product?.userId?.firstName + " " + product?.userId?.lastName} </h1>
                </div>
                <div className='space-y-3'>
                  <div className='flex flex-row mt-5'>
                    <div className='flex flex-row gap-2 text-gray-600'>
                      <Place className='text-[#e52320]' />
                      <h1>{product?.address}</h1>
                    </div>
                  </div>
                  {!contact && <div className='border bg-gray-800 text-md font-semibold text-white p-2 rounded-md cursor-pointer' onClick={handleChange}>
                    <div className='flex flex-row justify-center gap-2'>
                      <Phone />
                      <span>Contact Seller</span>
                    </div>
                  </div>}
                  {contact &&
                    <div className='bg-gray-100 text-black border border-gray-100 flex justify-center transition ease-out duration-200'>
                      <span className='absolute end-36'>
                        <Cancel className='text-red-500' onClick={() => setContact(false)} />
                      </span>
                      <ul className='space-y-3 py-3'>
                        {product?.viber && <li className='space-x-3'><PhoneInTalk className='text-white border bg-purple-500 border-purple-500 rounded-lg mr-3' /> {product?.viber}</li>}
                        {product?.whatsApp && < li > <WhatsApp className='text-green-500 mr-3' /> {product?.whatsApp}</li>}
                      </ul>
                    </div>}
                  <div className='border bg-[#e52320] text-md font-semibold text-white p-2 rounded-md'>
                    <Link className='flex flex-row justify-center gap-2' href={`mailto:${product?.email}`}>
                      <Mail />
                      <span>Send Email</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-5 bg-white p-3 space-y-3'>
              <h1 className='font-bold text-xl'>Location</h1>
              <div className='flex flex-row gap-2 text-gray-600'>
                <Place className='text-[#e52320]' />
                <h1>{product?.address}</h1>
              </div>
              <MapContainer apikey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API} address={product?.address} />
            </div>
          </div>
        </div>
      </Home >

    </>
  )
}
