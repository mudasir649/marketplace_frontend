import React, { useEffect } from 'react'
import { Agriculture, CarRepair, DirectionsBike, DirectionsCar, KeyboardArrowDown, LocalShipping, TwoWheeler } from '@mui/icons-material';
import Aos from 'aos';
import SearchPage from './Search';
import useWindowDimensions from '@/utils/useWindowDimensions';


export default function Banner() {

  useEffect(() => {
    Aos.init();
  }, []);

  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;

  return (
    <div className='mb-5  border-green-400 mt-1 h-[300px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row lg:space-x-10'>
          <div className='flex flex-row justify-between border border-gray-200 rounded-full h-8 w-52 hover:border-red-500 
              bg-white px-5 py-1 capitalize text-sm'>
            <h1>See all categories</h1>
            <KeyboardArrowDown className="h-5 w-5 border border-red-500 rounded-full bg-red-500 text-white" />
          </div>
          <div className='felx flex-row mt-4 lg:mt-0'>
            <h1 className='text-white text-lg font-semibold flex space-x-5'>
              Top Categories:
              <span className='ml-4'>Autos</span>
              <span>Parts</span>
            </h1>
          </div>
        </div>
      </div>
      <div className='pt-10'>
        <SearchPage />
        {/* <h1 className='text-4xl lg:text-[58px] font-semibold leading-none'>
            <span className='text-[#e52320]'>Buy</span> <span className='text-black'>What ever you want.</span>
          </h1> */}
      </div>
    </div >
  )
}
