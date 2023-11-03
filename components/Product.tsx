import { AccessTime, ArrowBackIos, ArrowForward, ArrowForwardIos, ArrowForwardIosOutlined, Chat, Delete, EditNote, Favorite, KeyboardArrowLeft, KeyboardArrowRight, LocationOn, Phone, PhoneIphone, RemoveRedEye, Share } from '@mui/icons-material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import AOS, { refresh } from 'aos';
import 'aos/dist/aos.css';
import { usePathname } from 'next/navigation';
import './ImageSlider.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { refreshPage, setProdId, setProductId, setProductUserId, setShowDeleteAd } from '@/store/appSlice';
import { setShowShare } from '@/store/appSlice';
import addInvertedComma from '@/utils/addInvertedComma';
import showDate from '@/utils/showDate';
import { useTranslation } from 'react-i18next';
import "./product.css";

export default function Product({ product, url }: any) {

  const { refresh } = useSelector((state: any) => state.app);
  const { t } = useTranslation(); // Initialize the translation hook


  const pathname = usePathname();
  const dispatch = useDispatch();
  const checkPathname = pathname == '/my-favourites' ? true : false;
  const [fav, setFav] = useState<Boolean>(checkPathname);
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { prodId } = useSelector((state: any) => state.app);
  const userId = userInfo?.data?.userDetails?._id;

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
        dispatch(setProdId([...prodId, product]));
        dispatch(refreshPage(refresh + 1))
      } else {
        if (pathname == '/my-favourites') {
          dispatch(refreshPage(refresh + 1))
          const newRecord = prodId?.filter((item: any) => {
            return item._id !== product?._id
          });
          dispatch(setProdId(newRecord));
        } else {
          const newRecord = prodId?.filter((item: any) => {
            return item._id !== product?._id
          });
          dispatch(setProdId(newRecord));
          setFav(false)
        }
      }
    }
  }
  const handleShare = () => {
    dispatch(setShowShare(true))
    dispatch(setProductId(product?._id))
  }

  const handleChat = async () => {    
    if (userInfo !== null) {
      dispatch(setProductId(product?._id));
      dispatch(setProductUserId(product?.userId?._id));
      const data = {
        userId: userId,
        productUserId: product?.userId,
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



  useEffect(() => {
    const fetchAds = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/getFavAds/${userId}`);
      if (res.status === 200) {
        dispatch(setProdId(res?.data?.data));
      }
    }
    if (userInfo !== null) {
      fetchAds();
    }
  }, [userId, dispatch, userInfo]);

  const checkFavAds = () => {
    return prodId.some((item: any) => item._id === product?._id)
  }


  return (
    <div className='mb-3' data-aos="fade-up">
      <div className="image-slider group relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-2 cursor-pointer hover:shadow-md hover:shadow-[#e52320]">
        <Link href={`/product-details/${product?._id}`}>
        <div className="w-full h-52 md:h-40 relative overflow-hidden">
  <div
    className="image-slider-container"
    style={{
      transform: `translateX(-${currentSlide * (100 / product?.images.length)}%)`,
      transition: "transform 0.5s ease-in-out",
      display: "flex",
      width: `${product?.images.length * 100}%`, // Adjust the width
    }}
  >
    {product?.images.map((image: string, index: number) => (
      <img
        key={index}
        className="h-40 object-contain image-transition"
        src={image}
          alt="Product Image"
        style={{ flex: `0 0 ${100 / product?.images.length}%` }}
      />
    ))}
  </div>
</div>         

        </Link>
        {product?.images?.length > 1 && (
  <div className="slide-buttons">
    <button className="prev-button hidden group-hover:block" onClick={prevSlide}>
      <KeyboardArrowLeft style={{ background: 'transparent' }} />
    </button>
    <button className="next-button hidden group-hover:block" onClick={nextSlide}>
      <KeyboardArrowRight style={{ background: 'transparent' }} />
    </button>
  </div>
)}
        <Link href={`/product-details/${product?._id}`}>
          <div className="px-6 py-4 max-w-full"> 
            <div className='w-auto overflow-hidden flex flex-row justify-between'>
              <section className='overflow-hidden'>
                {product?.price * 1 === 0 ?
                  <h1 className='bg-black text-white text-center py-2 w-32 h-10 border-none rounded-lg text-[14px] font-semibold'>{t('product.contactForPrice')}</h1>
                  :
                  <>
                    <h2 className='text-[#FF0000] font-bold text-[17px] w-32 truncate'>CHF {addInvertedComma(product?.price * 1)}</h2>
                    <h1 className='text-gray-400 font-semibold text-[13px] w-32 truncate'>EURO {addInvertedComma(product?.price * 2)}</h1>
                  </>
                }
              </section>
              <section className='flex flex-row space-x-1'>
                <AccessTime className="text-gray-400" style={{ fontSize: "22px" }} />
                <h1 className='text-sm w-16 truncate'>{showDate(product?.createdAt) <= 2 ?
                  <div className='bg-green-600 text-white rounded-full px-3 text-center'>{t('condition.new')}</div> : <div className='text-[12px] mt-[0.5px]'>{Number.isNaN(showDate(product?.createdAt)) ? '0 days ago' : `${showDate(product?.createdAt)} days ago`}</div>
                }</h1>
              </section>
            </div>
            <div className='space-y-3 mt-5'>
              <h1 className='text-xl font-semibold text-black w-52 truncate'>{product?.title}</h1>
              <section className='flex flex-row space-x-1 w-52 truncate'>
                <LocationOn className="text-gray-400" style={{ fontSize: "20px" }} />
                <h1 className='mt-[-1px] text-sm line-clamp-1'>{product?.address}</h1>
              </section>
            </div>
          </div>
        </Link>
        <div className='mx-5'>
          <div className='flex flex-ro justify-between space-x-4 text-gray-600 w-full h-10 mb-10 border-t-2 pt-4 px-1'>
            {pathname == '/my-ads' ?
              <div className='flex flex-row space-x-2'>
                <EditNote className='text-4xl text-yellow-500' />
                <Delete className='text-3xl text-red-500' onClick={() => deleteAd(product?._id)} />
              </div>
              :
              <>
                <div className='space-x-3 w-52'>
                  <Share
                    onClick={() => handleShare()}
                    className='cursor-pointer'
                    style={{ fontSize: "20px" }}
                  />
                  <Chat style={{ fontSize: "20px" }} onClick={() => handleChat()} />
                  <Favorite className={`${checkFavAds() ? 'text-[#FF0000]'
                    : 'text-gray-300'} cursor-pointer`}
                    onClick={() => adFavorite()}
                    style={{ fontSize: "20px" }}
                  />
                </div>
                <div className='flex flex-row space-x-1 mt-1'>
                  <RemoveRedEye className="text-gray-500" style={{ fontSize: "20px" }} />
                  <h1 className='text-sm'>{product?.views}</h1>
                </div>
              </>}
          </div>
        </div>
      </div>
    </div>
  )
}