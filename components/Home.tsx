'use client';
import React from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import useWindowDimensions from '@/utils/useWindowDimensions';

export default function Home({ children }: any) {
  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;
  return (
    <div className=''>
      <div className={`bg-[#FF0000] rounded-br-[70px] rounded-bl-[70px] md:rounded-br-[120px] md:rounded-bl-[120px] `}>
        <Header />
        <Banner />
      </div>
      {children}
      <Footer />
    </div>
  )
}
