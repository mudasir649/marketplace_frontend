import { AccessTime, ArrowBackIos, ArrowForwardIos, Chat, Delete, EditNote, Favorite, LocationOn, Phone, PhoneIphone, RemoveRedEye, Share } from '@mui/icons-material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import AOS, { refresh } from 'aos';
import 'aos/dist/aos.css';
import useWindowDimensions from '@/utils/useWindowDimensions';
import { usePathname } from 'next/navigation';
import './ImageSlider.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { refreshPage, setProductId, setShowDeleteAd } from '@/store/appSlice';
import { setShowShare } from '@/store/appSlice';

export default function Product({ product, url }: any) {

  const { refresh } = useSelector((state: any) => state.app);

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
    if (userInfo === null) {
      router.push('/login')
    } else {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/setFavorite/${product?._id}/${userId}`);
      if (res.status == 201) {
        setFav(true)
      } else {
        if (pathname == '/my-favourites') {
          dispatch(refreshPage(refresh + 1))
        } else {
          setFav(false)
        }
      }
    }
  }

  const handleShare = () => {
    dispatch(setShowShare(true))
    dispatch(setProductId(product?._id))
  }

  const addInvertedComma = (price: Number) => {
    let priceString = price.toLocaleString();

    priceString = priceString.replace(',', "'");

    return priceString;

  }


  return (
    <div data-aos="fade-up">
      <div className="image-slider group relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-2 cursor-pointer hover:shadow-md hover:shadow-[#e52320]">
        <Link href={`/product-details/${product?._id}`}>
          <div className='w-full h-52 md:h-40 flex justify-center bg-gray-50'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-40 object-cover image-transition" src={product?.images[currentSlide]} alt="Product Image" />
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
        <Link href={`/product-details/${product?._id}`}>
          <div className="px-6 py-4 flex flex-row justify-between max-w-full">
            <div className='space-y-4 w-auto overflow-hidden'>
              <section>
                <h2 className='text-[#FF0000] font-semibold text-lg'>CHF  {addInvertedComma(product?.price)}</h2>
                <h1 className='text-gray-400 font-semibold text-sm'>EURO {addInvertedComma(product?.price * 2)}</h1>
              </section>
              <h1 className='text-xl font-semibold text-black line-clamp-1'>{product?.title}</h1>
              <section className='flex flex-row space-x-2'>
                <LocationOn className="text-gray-400" />
                <h1 className='line-clamp-1 mt-[-1px] text-sm'>{product?.address}</h1>
              </section>
            </div>
            <div className='flex flex-row space-x-2'>
              <AccessTime className="text-gray-500 text-sm" />
              <h1 className='text-sm mt-[0.5px] w-16 truncate'>{showDate() <= 2 ?
                <div className='bg-green-600 text-white rounded-full px-3 text-center'>{'new'}</div> : Number.isNaN(showDate()) ? '0 days ago' : `${showDate()} days ago`}
              </h1>
            </div>
          </div>
        </Link>
        <div className='mx-5'>
          <div className='flex justify-between space-x-4 text-gray-600 w-full h-10 mb-10 border-t-2 pt-4 px-3'>
            {pathname == '/my-ads' ?
              <div className='flex flex-row space-x-2'>
                <EditNote className='text-4xl text-yellow-500' />
                <Delete className='text-3xl text-red-500' onClick={() => deleteAd(product?._id)} />
              </div>
              :
              <>
                <div className='space-x-3'>
                  <Share
                    onClick={() => handleShare()}
                    className='cursor-pointer'
                  />
                  <Chat />
                  <Favorite className={`${fav ? 'text-[#FF0000]' : 'text-gray-300'} cursor-pointer`} onClick={() => adFavorite()} />
                </div>
                <div className='flex flex-row space-x-3'>
                  <RemoveRedEye className="text-gray-500" />
                  <h1>{product?.views}</h1>
                </div>
              </>}
          </div>
        </div>
      </div>
    </div>
  )

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
            <div className='bg-[#FF0000] text-white rounded-full px-3'>
              {product?.category}
            </div>
          </div>
          <div className='text-md line-clamp-2 h-5 font-semibold max-w-[260px] cursor-pointer hover:text-[#FF0000]'>
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
                <h1 className='text-[#FF0000] text-2xl font-bold'>CHF {product?.price}</h1>
                <h1 className='text-gray-500 text-lg font-bold'>Euro {product?.price * 2}</h1>
              </div>
              <div className='flex flex-row space-x-4 text-gray-600 w-full h-10 mb-10 border-t-2 pt-4'>
                <Share onClick={() => handleShare()} />
                <Chat />
                <Favorite className={`${fav ? 'text-[#FF0000]' : 'text-gray-300'}`} onClick={() => adFavorite()} />
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
