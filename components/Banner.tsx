'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material';
import Aos from 'aos';
import SearchPage from './Search';
import useWindowDimensions from '@/utils/useWindowDimensions';
import CategoryList from './CategoryList';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Banner() {

  const [isExpand, setIsExpand] = useState<Boolean>(false);
  const [allCategory, setAllCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleCat = (value: any) => {
    router.push(`/search-filter/${value}`)
  }

  return (
    <div className={`${pathname == '/my-ads' && 'mb-44 md:mb-10'} border-green-400 mt-1 h-[300px]`}>
      <div className='container mx-auto'>
        <div className='grid  grid-cols-2 md:grid-cols-3'>
          <div className='flex flex-col w-52' ref={dropdownRef}>
            <div className={`flex flex-row justify-between border border-gray-200 rounded-full h-8 w-52 hover:border-red-500 
              bg-white px-5 py-1 capitalize text-sm focus:border-red-800 focus:shadown-lg`} onClick={() => categoryHandle()}>
              <h1>See all categories</h1>
              <KeyboardArrowDown className="h-5 w-5 border border-red-500 rounded-full bg-red-500 text-white" />
            </div>
            {isExpand && <div className='h-auto p-2 w-auto lg:w-52 z-30 absolute bg-white border rounded-md mt-9' data-aos="fade-up">
              <CategoryList setCategory={setCategory} setExpand={setIsExpand} />
            </div>}
          </div>
          {/* <div className={`felx flex-row  bg-[#FF0000] ${newWidth <= 834 && newWidth >= 768 ? 'mt-[-1.5px] ml-5' : ' mt-4 lg:mt-0'}`}> */}
          <div className={`felx flex-row col-span-2 ml-[-0px] mt-2 md:mt-0 md:ml-[-5px] lg:ml-[-90px]`}>
            <h1 className='text-white text-lg font-semibold flex space-x-5'>
              Top Categories:
              <span className='ml-4 cursor-pointer' onClick={() => handleCat('Autos')}>Autos</span>
              <span className='cursor-pointer' onClick={() => handleCat('Parts')}>Parts</span>
            </h1>
          </div>
        </div>
      </div>
      <div className='pt-10'>
        <SearchPage />
      </div>
    </div >
  )
}
