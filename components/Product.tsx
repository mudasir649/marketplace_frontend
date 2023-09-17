import { AccessTime, ArrowBackIos, ArrowForwardIos, Chat, Delete, EditNote, Favorite, LocationOn, Phone, PhoneIphone, RemoveRedEye, Share } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import useWindowDimensions from '@/utils/useWindowDimensions';
import { usePathname } from 'next/navigation';
import './ImageSlider.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { refreshPage } from '@/store/appSlice';

export default function Product({ product, url }: any) {

  const { refresh } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  const { image, type, address, price, name, id } = product;
  const [fav, setFav] = useState(false);
  const router = useRouter();

  const { width, height } = useWindowDimensions();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo?.data?.userDetails?.id;

  const newWidth = width || 0;
  const newHeight = height || 0;

  const pathname = usePathname();

  useEffect(() => {
    AOS.init();
  }, [product]);


  const editAd = (id: any) => {
    console.log(id);
  }

  const deleteAd = async (id: any) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/deleteAd/${id}`);
      if (res.status === 204) {
        dispatch(refreshPage(true));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const showDate = () => {
    let date = new Date(`${product?.createdAt}`).getTime();
    let now = new Date().getTime();
    const difference = now - date;
    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % product?.image.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? product?.image.length - 1 : prevSlide - 1
    );
  };

  const adFavorite = async () => {
    if (userInfo === null) {
      router.push('/login')
    } else {
      const data = {
        userId: userId,
        adId: product?._id,
        favorite: true,
      }
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/adFavorite`, data);
        if (res?.status === 201) {
          setFav(true)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }



  return (
    <div className={`${newWidth < 688 ? 'max-w-[500px]' : 'max-w-[352px]'} bg-white shadow-lg border-[#795453] 
      rounded-lg my-2 w-full h-auto mx-auto cursor-pointer hover:shadow-md hover:opacity-25 hover:shadow-[#e52320]`}
      data-aos={url !== "login" && url !== "signup" && "fade-up"}
    >
      <Link href={`product-details/${product?._id}`}>
        {/* <div className='border border-gray-300 mb-2 w-auto'>
          <Image
          src={pathname == '/' || pathname == '/my-ads' || pathname ? picOne : image}
          alt={name}
          width={500}
          height={500}
        />
        </div> */}
        <div className="image-slider group relative">
          <div className="slide">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product?.image[currentSlide]} alt="Image" className='w-96 h-48' />
          </div>
          {product?.image.length > 1 &&
            <>
              <button className="prev-button hidden group-hover:block" onClick={prevSlide}>
                <ArrowBackIos />
              </button>
              <button className="next-button hidden group-hover:block" onClick={nextSlide}>
                <ArrowForwardIos />
              </button>
            </>
          }
        </div>
      </Link>
      <div className='p-5'>
        <Link href={`/product-details/${product?._id}`}>
          <div className='mb-4 flex gap-x-2 text-sm'>
            <div className='bg-[#e52320] text-white rounded-full px-3'>
              {product?.category}
            </div>
          </div>
          <div className='text-md line-clamp-2 h-5 font-semibold max-w-[260px] cursor-pointer hover:text-[#e52320]'>
            {product?.title}
          </div>
        </Link>
        <div className='space-y-4'>
          <Link href={`/product-details/${product?._id}`}>
            <div className='flex items-center text-gray-600 gap-2 mt-2 h-10'>
              <div className='text-[10px]'>
                <AccessTime className="text-gray-500" />
              </div>
              <h1 className='text-sm'>{showDate() <= 2 ?
                <div className='bg-green-600 text-white rounded-full px-3'>{'new'}</div> : Number.isNaN(showDate()) ? '0 days ago' : `${showDate()} days ago`}</h1>
            </div>
            {pathname == '/my-ads' ? '' :
              <div className='flex items-center text-gray-600 gap-2 mt-2 h-10'>
                <div className='text-[10px]'>
                  <LocationOn className="text-gray-500" />
                </div>
                <h1 className='text-sm'>{product?.address}</h1>
              </div>
            }
            <div className='flex items-center text-gray-600 gap-2 mt-2'>
              <div className='text-[10px]'>
                <RemoveRedEye className="text-gray-500" />
              </div>
              <h1 className='text-sm'>{product?.views} Views</h1>
            </div>
          </Link>
          {pathname == '/my-ads' ?
            <>
              <div className='flex flex-row space-x-2'>
                <EditNote className='text-4xl text-yellow-500' />
                <Delete className='text-3xl text-red-500 mt-1' onClick={() => deleteAd(product?._id)} />
              </div>
            </> :
            <>
              <div className='space-y-1'>
                <h1 className='text-[#e52320] text-2xl font-bold'>CHF {product?.price}</h1>
                <h1 className='text-gray-500 text-lg font-bold'>Euro {product?.price * 2}</h1>
              </div>
              <div className='flex flex-row space-x-4 text-gray-600 w-full h-10 mb-10 border-t-2 pt-4'>
                <Share />
                <Chat />
                <Phone />
                <Favorite className={`${fav && 'text-red-600'}`} onDoubleClick={() => adFavorite()} />
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
