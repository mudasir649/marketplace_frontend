import React from 'react'

export default function Banner() {
  return (
    <div className='h-full max-h-[1150px] mb-5 bg-white'>
      <div className='flex flex-row'>
        <div className='lg:ml-8 xl:ml-[135px] mt-4 flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
          <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'>
            <span className='text-[#e52320]'>Buy</span> What ever you want.
          </h1>
          <p className='max-w-[480px] mb-8'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
        </div>
      </div>
    </div>
  )
}
