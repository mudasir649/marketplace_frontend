'use client';
import React from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'
import useWindowDimensions from '@/utils/useWindowDimensions';
import I18nProvider from './i18Provider';
import i18n from 'i18next';
import Header2 from './Header2';



export default function Home({ children }: any) {
  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;
  return (
    <div className=''>
      <I18nProvider>
      {/* <div className={`bg-gradient-to-b from-red-600 to-[#FF0000] rounded-br-[70px] rounded-bl-[70px] md:rounded-br-[120px] md:rounded-bl-[120px] `}>
        <Header />
      </div> */}
      <div className='w-full'>
        <Header2 />
        <Banner />
      </div>
      {children}
      <Footer />
      </I18nProvider>
    </div>
  )
}
