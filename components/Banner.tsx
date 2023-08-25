import React, { useEffect } from 'react'
import { Agriculture, CarRepair, DirectionsBike, DirectionsCar, LocalShipping, TwoWheeler } from '@mui/icons-material';
import Aos from 'aos';


export default function Banner() {

  const categoryDivStyle = 'h-20 w-20 lg:h-24 lg:w-24 border rounded-full bg-gray-300';
  const categorySpanStyle = 'absolute top-[252px] pl-1 lg:pl-[17px] lg:top-[233px]';
  const categoryIconStyle = 'text-5xl lg:text-6xl text-[#e52320]';

  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <div className='mb-5 bg-white border-green-400 mt-1 h-[300px]'>
      <div className={` md:-mt-[17px]`}>
        <div className='pl-5 lg:pl-52 pt-10'>
          <h1 className='text-4xl lg:text-[58px] font-semibold leading-none'>
            <span className='text-[#e52320]'>Buy</span> <span className='text-black'>What ever you want.</span>
          </h1>
          <div className='mt-10'>
            <ul className='flex flex-row space-x-8 lg:space-x-10'>
              <li className=''>
                <div className={categoryDivStyle}></div>
                <span className={categorySpanStyle}>
                  <DirectionsCar className={categoryIconStyle} />
                </span>
              </li>
              <li className=''>
                <div className={categoryDivStyle}></div>
                <span className={categorySpanStyle}>
                  <DirectionsBike className={categoryIconStyle} />
                </span>
              </li>
              <li className=''>
                <div className={categoryDivStyle}></div>
                <span className={categorySpanStyle}>
                  <TwoWheeler className={categoryIconStyle} />
                </span>
              </li>
              <li className=''>
                <div className={categoryDivStyle}></div>
                <span className={categorySpanStyle}>
                  <CarRepair className={categoryIconStyle} />
                </span>
              </li>
              <li className=''>
                <div className={categoryDivStyle}></div>
                <span className={categorySpanStyle}>
                  <LocalShipping className={categoryIconStyle} />
                </span>
              </li>
              <li className=''>
                <div className={categoryDivStyle}></div>
                <span className={categorySpanStyle}>
                  <Agriculture className={categoryIconStyle} />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}
