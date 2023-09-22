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
import axios, { AxiosRequestConfig } from 'axios';
import { refreshPage, setProductId, setShowDeleteAd } from '@/store/appSlice';
import { setShowShare } from '@/store/appSlice';

interface AdFavoriteData {
  userId: string;
  adId: string;
  favorite: boolean;
}

export default function Product({ product, url }: any) {

  // const { refresh } = useSelector((state: any) => state.app);

  console.log(product)

  const pathname = usePathname();
  const dispatch = useDispatch();

  const checkPathname = pathname == '/my-favourites' ? true : false;

  const [fav, setFav] = useState<Boolean>(checkPathname);

  const router = useRouter();

  const { width, height } = useWindowDimensions();

  const { userInfo } = useSelector((state: any) => state.auth);
  const { productId } = useSelector((state: any) => state.app);

  const userId = userInfo?.data?.userDetails?._id;

  const newWidth = width || 0;
  const newHeight = height || 0;


  useEffect(() => {
    AOS.init();
  }, [product]);


  const editAd = (id: any) => {
    console.log(id);
  }

  const deleteAd = async (id: any) => {
    dispatch(setProductId(id))
    dispatch(setShowDeleteAd(true))
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
    setCurrentSlide((prevSlide) => (prevSlide + 1) % product?.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? product?.images.length - 1 : prevSlide - 1
    );
  };

  const adFavorite = async () => {
    let data: AdFavoriteData = {
      userId: userId,
      adId: product?._id,
      favorite: true,
    }
    if (userInfo === null) {
      router.push('/login')
    } else {
      if (fav === false) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/adFavorite`, data);
          if (res?.status === 201) {
            setFav(true)
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const config: AxiosRequestConfig = {
          data: data
        }
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/removeFavorite/${product?.favAdId}`, config);
        if (res?.status === 204) {
          setFav(false);
          dispatch(refreshPage(true));
        }
      }
    }
  }

  const handleShare = () => {
    dispatch(setShowShare(true))
    dispatch(setProductId(product?._id))
  }



  return (
    <div className={`${newWidth < 688 ? 'max-w-[500px]' : 'max-w-[352px]'} bg-white shadow-lg border-[#795453] 
      rounded-lg my-2 w-full h-auto mx-auto cursor-pointer hover:shadow-md hover:opacity-25 hover:shadow-[#e52320]`}
      data-aos={url !== "login" && url !== "signup" && "fade-up"}
    >
      {/* <div className='border border-gray-300 mb-2 w-auto'>
          <Image
          src={pathname == '/' || pathname == '/my-ads' || pathname ? picOne : image}
          alt={name}
          width={500}
          height={500}
        />
        </div> */}
      <div className="image-slider group relative">
        <Link href={`product-details/${product?._id}`}>
          <div className="slide">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product?.images[currentSlide]} alt="Image" className='w-96 h-48' />
          </div>
        </Link>
        {product?.images?.length > 1 &&
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
                <h1 className='text-sm line-clamp-2'>{product?.address}</h1>
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
                <Share onClick={() => handleShare()} />
                <Chat />
                <Favorite className={`${fav ? 'text-red-600' : 'text-gray-300'}`} onClick={() => adFavorite()} />
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
