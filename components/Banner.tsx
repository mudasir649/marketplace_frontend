import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Agriculture, CarRepair, DirectionsBike, DirectionsCar, KeyboardArrowDown, LocalShipping, TwoWheeler } from '@mui/icons-material';
import Aos from 'aos';
import SearchPage from './Search';
import useWindowDimensions from '@/utils/useWindowDimensions';
import CategoryList from './CategoryList';


export default function Banner() {

  const [isExpand, setIsExpand] = useState<Boolean>(false);
  const [allCategory, setAllCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    Aos.init();
  }, []);

  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;

  console.log(category);
  console.log(allCategory);

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
  }, [handleOutsideClick])



  return (
    <div className='mb-5  border-green-400 mt-1 h-[300px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row lg:space-x-10'>
          <div className='flex flex-col' ref={dropdownRef}>
            <div className={`flex flex-row justify-between border border-gray-200 rounded-full h-8 w-52 hover:border-red-500 
              bg-white px-5 py-1 capitalize text-sm focus:border-red-800 focus:shadown-lg`} onClick={() => setIsExpand(!isExpand)}>
              <h1>See all categories</h1>
              <KeyboardArrowDown className="h-5 w-5 border border-red-500 rounded-full bg-red-500 text-white" />
            </div>
            {isExpand && <div className='h-auto p-2 w-auto lg:w-52 z-10 absolute bg-white border rounded-md mt-9' data-aos="fade-up">
              <CategoryList setCategory={setAllCategory} setExpand={setIsExpand} />
            </div>}
          </div>
          <div className='felx flex-row mt-4 lg:mt-0'>
            <h1 className='text-white text-lg font-semibold flex space-x-5'>
              Top Categories:
              <span className='ml-4 cursor-pointer' onClick={() => setCategory("Autos")}>Autos</span>
              <span className='cursor-pointer' onClick={() => setCategory("Parts")}>Parts</span>
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
