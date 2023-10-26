/*
This page is about is about product details. In this page there is two divs one for showing product details and one for showing sellers 
details. Both divs are named in comments

*/
'use client';
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { AccessTime, ArrowBackIos, ArrowForwardIos, Camera, CameraAlt, Cancel, Category, Facebook, Favorite, FavoriteBorder, InsertLink, Language, Mail, Phone, PhoneInTalk, Place, Share, Twitter, Visibility, WarningAmber, WhatsApp } from '@mui/icons-material';
import Link from 'next/link';
import MapContainer from '@/components/MapContainer';
import Home from '@/components/Home';
import AOS from 'aos'
import useWindowDimensions from '@/utils/useWindowDimensions';
import axios, { AxiosRequestConfig } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './productDetails.css';
import formatDateTime from '@/utils/checkTime';
import { refreshPage, setProductId, setShowShare, setProductUserId } from '@/store/appSlice';
import dynamic from 'next/dynamic';
import addInvertedComma from '@/utils/addInvertedComma';
import { useTranslation } from 'react-i18next';

interface AdFavoriteData {
  userId: string,
  adId: string,
  favorite: Boolean
}

function ProductDetails() {
  const { t } = useTranslation(); // Initialize the translation hook

  const { id } = useParams();
  const [product, setProduct] = useState<any>();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo?.data?.userDetails?._id;

  const { refresh } = useSelector((state: any) => state.app);
  const [fav, setFav] = useState<Boolean>(false);
  const [clicked, setClicked] = useState(false);
  const userData = userInfo?.data?.userDetails;
  const router = useRouter();
  const dispatch = useDispatch();
  const [prodId, setProdId] = useState<any>([]);


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
  }, [id, refresh])

  const [currentImage, setCurrentImage] = useState(0);

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

  const handleEmail = (email: string) => {
    if (!clicked) {
      window.location.href = `mailto:${email}`;
      setClicked(true);
    }
  }

  const nextSlide = () => {
    setCurrentImage((prevSlide) => (prevSlide + 1) % product?.images.length);
    setSlide(slide + 1);
  };

  const prevSlide = () => {
    setCurrentImage((prevSlide) =>
      prevSlide === 0 ? product?.images.length - 1 : prevSlide - 1
    );
    setSlide(slide + 1)
  };

  const adFavorite = async (productId: any) => {
    if (userInfo === null) {
      router.push('/login')
    } else {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/setFavorite/${productId}/${userId}`);
      if (res.status == 201) {
        setProdId([...prodId, productId]);
      } else {
        const newProdId = prodId.filter((prod: any, i: number) => {
          return prod !== productId;
        });
        setProdId(newProdId);
      }
    }
  }


  const findProductId = (productId: any) => {
    return prodId.includes(productId);
  }

  const handleShare = (productId: string) => {
    dispatch(setShowShare(true))
    dispatch(setProductId(productId))
  }

  const handleChat = async () => {
    if (userInfo !== null) {
      dispatch(setProductId(product?._id));
      dispatch(setProductUserId(product?.userId?._id));
      const data = {
        userId: userId,
        productUserId: product?.userId?._id,
        productId: product?._id
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/chatroom`, data);
      if (res.status === 200) {
        router.push('/chat');
      }
    } else {
      router.push('/login')
    }
  }

  return (
    <>
      <Home>
        {!product ?
          <div className="flex justify-center mt-5">
            <Image
              src='/assets/eidcarosse.gif'
              alt="eidcarosse_logo"
              width={500}
              height={500}
            />
          </div> :
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 grid-flow-rows mx-4 lg:mx-20 mt-10'>
            <div className='col-span-2'>
              <div className={`lg:w-auto min-h-[800px] mb-5 border rounded-lg bg-white p-5`}>
                <div className='flex flex-col max-w-[1400px] h-[550px] w-full m-auto relative items-start gap-8 lg:flex-row group'>
                  {/* <div style={{ backgroundImage: `url(${product?.images[currentImage]})` }} className='w-full h-full rounded-lg bg-center bg-cover duration-500'>
                </div> */}
                  <div className='h-full w-full'>
                    <div className='image-gallery p-5 border-none rounded-md bg-gray-50 overflow-hidden'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product?.images[currentImage]}
                        className='w-full ease-linear duration-150'
                        alt=''
                      />
                    </div>
                  </div>
                  {product?.images.length >= 2 &&
                    <>
                      <div className='hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-35%] md:left-5 lg:left-10 text-2xl 
                    rounded-full p-2 text-[#FF0000] cursor-pointer' onClick={prevSlide}>
                        <ArrowBackIos />
                      </div>
                      <div className='hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-35%] md:right-5 lg:right-10 text-2xl 
                  rounded-full p-2 text-[#FF0000] cursor-pointer' onClick={nextSlide}>
                        <ArrowForwardIos />
                      </div>
                    </>
                  }
                </div>
                {product?.images.length > 1 &&
                  <div className='flex flex-col md:flex-row justify-between my-[20px]'>
                    <div className='flex flex-row space-x-4 mb-2'>
                      {product?.images?.map((image: any, i: any) => (
                        <div key={i} className="w-[60px] h-auto md:w-[100px] bg-gray-500">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className='h-auto w-full cursor-pointer' onClick={() => setCurrentImage(i)} src={image} alt={`Image ${i}`} />
                        </div>))}
                    </div>
                    <div><CameraAlt /> {currentImage + 1} / {product?.images.length}</div>
                  </div>
                }
                {product?.price * 1 === 0 ?
                  <div className='bg-black space-y-2 rounded-lg rounded-tr-[700px] rounded-br-[700px] w-40 p-2 h-16 md:w-64 md:h-auto'>
                    <h1 className='text-white text-sm md:text-3xl font-bold'>{t('product.contactForPrice')}</h1>
                  </div>
                  :
                  <div className='bg-[#FF0000] space-y-2 rounded-lg rounded-tr-[700px] rounded-br-[700px] w-40 p-2 h-16 md:w-64 md:h-auto'>
                    <h1 className='text-white text-sm md:text-3xl font-bold'>CHF {addInvertedComma(product?.price * 1)}</h1>
                    <h1 className='text-gray-300 text-sm md:text-xl font-semibold'>Euro {addInvertedComma(product?.price * 2)}</h1>
                  </div>
                }
                <div className='flex flex-col md:flex-row justify-between my-6'>
                  <div className='space-y-4 mb-5 md:mb-0'>
                    <div className='text-black font-bold text-3xl'>
                      <h1>{product?.title}</h1>
                    </div>
                    <div className='flex flex-row gap-2 text-gray-600'>
                      <Category className='text-[#FF0000]' />
                      <h1 className='text-black'>{product?.category}</h1>
                    </div>
                    <div className='flex flex-row gap-2 text-gray-600'>
                      <Place className='text-[#FF0000]' />
                      <h1 className='text-black'>{product?.address}</h1>
                    </div>
                    <div className='flex flex-row gap-2 text-gray-600'>
                      <AccessTime className='text-[#FF0000]' />
                      <h1 className='text-black'>{formatDateTime(product?.createdAt)}</h1>
                    </div>
                  </div>
                  <div className='flex flex-row space-x-3'>
                    <h1><Visibility className='text-gray-500' /> <span className={listStyle2}>{product?.views}</span></h1>
                    <Favorite className={`${findProductId(product?._id) ? 'text-[#FF0000]' : 'text-gray-300'} cursor-pointer`} onClick={() => adFavorite(product?._id)} />
                    <h1><Share className='text-gray-500' onClick={() => handleShare(product?._id)} /></h1>
                  </div>
                </div>
                <div className='border-t-2'>
                  <div className='mt-5'>
                    <h1 className='text-xl font-bold'>
                      <span className="relative">
                        <span>{t('product.Overview')}</span>
                        <span className="absolute bottom-0 left-0 w-8 h-1 bg-[#FF0000] top-7"></span>
                      </span>

                    </h1>
                    <ul className='grid grid-cols-3 mt-5 gap-3 mb-5'>
                      {!product?.subCategory ? '' : <li><span className={overviewStyle}>{t('product.subCategory')}: </span> {product?.subCategory}</li>}
                      {!product?.condition ? '' : <li><span className={overviewStyle}>{t('product.Condition')}: </span> {product?.condition}</li>}
                      {!product?.brand ? '' : <li><span className={overviewStyle}>{t('product.Brand')}: </span> {product?.brand}</li>}
                      {!product?.year ? '' : <li><span className={overviewStyle}>{t('product.Year')}: </span> {product?.year}</li>}
                      {!product?.bodyShape ? '' : <li><span className={overviewStyle}>{t('product.BodyShape')}: </span> {product?.bodyShape}</li>}
                      {!product?.gearBox ? '' : <li><span className={overviewStyle}>{t('product.Gearbox')}: </span> {product?.gearBox}</li>}
                      {!product?.fuelType ? '' : <li><span className={overviewStyle}>{t('product.FuelType')}: </span> {product?.fuelType}</li>}
                      {!product?.km ? '' : <li><span className={overviewStyle}>{t('product.Kilometers')}: </span> {product?.km}</li>}
                      {!product?.engineCapacity ? '' : <li><span className={overviewStyle}>{t('product.EngineCapacity')}: </span> {product?.engineCapacity}</li>}
                      {product?.category == 'Autos' && <li><span className={overviewStyle}>{t('product.Cylinders')}: </span> {product?.cylinder}</li>}
                      {!product?.extriorColor ? '' : <li><span className={overviewStyle}>{t('product.Exterior')}: </span> {product?.exteriorColor}</li>}
                      {product?.category == 'Autos' && <li><span className={overviewStyle}>{t('product.Interior')}: </span> {product?.interiorColor}</li>}
                    </ul>
                  </div>
                </div>
                {product?.description !== "" &&
                  <div className='border-t-2 space-y-8 mt-2'>
                    <h1 className='text-xl font-bold mt-5'>
                      <span className="relative">
                        <span>Desc</span>
                        <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#FF0000] top-7"></span>
                      </span>
                      <span>ription</span>
                    </h1>
                    <p className='inline-block break-words w-full border-b-2 p-2'>
                      {product?.description}
                    </p>
                  </div>
                }
                <section className='space-y-1 mt-3'>
                  {product?.videoUrl && <div className='flex flex-row space-x-2'><span className={`${overviewStyle}`}> <InsertLink className='text-[#FF0000] mt-[-4px]' /> Video URL: </span>{product?.videoUrl}</div>}
                  {product?.website && <div className='flex flex-row space-x-2'><span className={`${overviewStyle}`}> <Language className='text-[#FF0000] mt-[-4px]' /> Website: </span>{product?.website}</div>}
                </section>
              </div>
            </div>

            <div className=''>
              <div className='w-full lg:w-auto max-h-[440px]'>
                <div className=' bg-white p-5 border rounded-lg'>
                  <div className='border-b border-gray-300'>
                    <h1 className='text-xl text-center font-bold uppercase mb-3'>{t('product.SellerInformation')}</h1>
                  </div>
                  <div className='flex flex-row mt-4 space-x-4'>
                    <Image
                      className='h-16 w-16 border rounded-full'
                      src={product?.userId?.image}
                      alt="logo"
                      width={100}
                      height={100}
                    />
                    <h1 className='mt-5 text-lg font-semibold'>{product?.userId?.firstName + " " + product?.userId.lastName} </h1>
                  </div>
                  <div className='space-y-3 mt-7'>
                    {!contact && <div className='border bg-gray-800 text-md font-semibold text-white p-2 rounded-md cursor-pointer' onClick={handleChange}>
                      <div className='flex flex-row justify-center gap-2'>
                        <Phone />
                        <span>{t('product.ContactSeller')}</span>
                      </div>
                    </div>}
                    {contact &&
                      <div className='bg-gray-100 text-black border border-gray-100 flex justify-center transition ease-out duration-200'>
                        <span className='absolute ml-[390px]'>
                          <Cancel className='text-red-500' onClick={() => setContact(false)} />
                        </span>
                        <ul className='space-y-3 py-3'>
                          {product?.viber && <li className='space-x-3'><PhoneInTalk className='text-white border bg-purple-500 border-purple-500 rounded-lg mr-3' /> {product?.viber}</li>}
                          {product?.whatsapp && < li > <WhatsApp className='text-green-500 mr-3' /> {product?.whatsapp}</li>}
                          {product?.userId?.phoneNumber && < li > <Phone className='text-[#FF0000] mt-[-1px] mr-3' /> {product?.userId?.phoneNumber}</li>}
                        </ul>
                      </div>
                    }
                    {userId === product?.userId._id ?
                      ''
                      : <div className='border bg-[#FF0000] text-md font-semibold text-white p-2 rounded-md cursor-pointer'>
                        <a className='flex flex-row justify-center gap-2' onClick={handleChat}>
                          <Mail />
                          <span>{t('product.SendMessage')}</span>
                        </a>
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className='mt-5 bg-white p-3 space-y-3'>
                <h1 className='font-bold text-xl'>  {t('product.Location')}
                </h1>
                <div className='flex flex-row gap-2 text-gray-600'>
                  <Place className='text-[#FF0000]' />
                  <h1>{product?.address}</h1>
                </div>
                <MapContainer apikey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API} address={product?.address} />
              </div>
            </div>
          </div>
        }
      </Home >
    </>
  )
}



export default dynamic(() => Promise.resolve(ProductDetails), { ssr: false });
