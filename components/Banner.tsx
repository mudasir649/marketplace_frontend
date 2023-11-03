'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material';
import Aos from 'aos';
import SearchPage from './Search';
import useWindowDimensions from '@/utils/useWindowDimensions';
import CategoryList from './CategoryList';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setProductData, setProductsCount } from '@/store/appSlice';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
export default function Banner() {
  const { t } = useTranslation(); // Initialize the translation hook

  const [isExpand, setIsExpand] = useState<Boolean>(false);
  const [allCategory, setAllCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const { page } = useSelector((state: any) => state.app)

  useEffect(() => {
    Aos.init();
  }, []);

  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;

  const closeDropdown = () => {
    setIsExpand(false);
  }

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [handleOutsideClick]);

  const categoryHandle = () => {
    setIsExpand(!isExpand);
  }

  const handleCat = async (value: any) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${value}`);
      if (res.status == 200) {
        dispatch(setProductData(res.data?.data?.ad));
        dispatch(setProductsCount(res.data?.data?.totalAds));
        router.push(`/advance-search/${value}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div className={`border-b-2 container mx-auto pb-5 ${newWidth <= 1024 ? 'mt-5' : ' -mt-10'}`}>
      <div className=''>
        <SearchPage />
      </div>
    </div >
    <div className='container mx-auto mt-5'>
        <div className='grid grid-cols-2 md:grid-cols-3'>
          <div className='flex flex-col w-52' ref={dropdownRef}>
            <div className={`flex flex-row justify-between border border-gray-200 rounded-full h-14 w-60 hover:border-red-500 
              bg-white px-5 py-4 capitalize text-sm focus:border-red-800 focus:shadown-lg font-semibold`} onClick={() => categoryHandle()}>
              <h1 className='whitespace-nowrap'>  {t('banner.seeAllCategories')}
              </h1>
              <KeyboardArrowDown className={`logo ${isExpand ? 'active': 'inactive'} h-5 w-5 text-[#FF0000] mt-[-3px]`} />
            </div>
            {isExpand && <div className='h-auto p-2 w-auto lg:w-60 z-30 absolute bg-white border rounded-md mt-16' data-aos="fade-up">
              <CategoryList setCategory={setCategory} setExpand={setIsExpand} />
            </div>}
          </div>
          <div className={`felx flex-row col-span-2 ml-[-0px] mt-2 md:mt-2 md:ml-[-5px] lg:ml-[-90px]`}>
            <div className=' text-lg font-semibold flex space-x-5 lg:space-x-8'>
              <h1 className='line-clamp-1'>{t('banner.topCategories')}</h1>
              <section className='cursor-pointer flex space-x-2' onClick={() => handleCat('Autos')}>
                <Image
                src='/assets/car_2.png'
                alt='car'
                width={100}
                height={100}
                className='h-8 w-8'
                /> 
                <h1>{t('banner.autos')}</h1>
              </section>
              <section className='cursor-pointer flex space-x-2' onClick={() => handleCat('Parts')}>
              <Image
                src='/assets/brake.png'
                alt='car'
                width={100}
                height={100}
                className='h-8 w-8'
                /> 
                <h1>{t('banner.parts')}</h1>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
