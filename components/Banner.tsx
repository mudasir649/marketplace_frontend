import React from 'react'
import style from "./banner.module.css";``

export default function Banner() {
  return (
    <div className='h-full max-h-[1150px] mb-5 bg-white border-green-400 mt-5'>
            <div className={`${style.bg} -mt-[17px]`}>
              {/* <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'>
                <span className='text-[#e52320]'>Buy</span> <span className='text-white'>What ever you want.</span>
              </h1> */}
            </div>
      {/* <div className='flex flex-row'>
        <div className='lg:ml-8 xl:ml-[135px] mt-4 flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
          <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'>
            <span className='text-[#e52320]'>Buy</span> What ever you want.
          </h1>
        </div>
      </div> */}
    </div>
  )
}
