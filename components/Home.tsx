'use client';
import React from 'react'
import Banner from './Banner'
import Footer from './Footer'
import I18nProvider from './i18Provider';
import Header2 from './Header2';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { typeMap } from '@/utils/dataVariables';


export default function Home({ children }: any) {
  const { type1 } = useSelector((state: any) => state.app);
  const pathname = usePathname();
  const checkType: string = typeMap[type1] || type1

  return (
    <div className=''>
      <I18nProvider>
      <div className='w-full'>
        <Header2 />
        { (pathname === '/' || pathname === '/advance-search' || pathname === `/advance-search/${checkType}` || pathname === `/advance-search/search`) ? <Banner /> : '' }
      </div>
      {children}
      <Footer />
      </I18nProvider>
    </div>
  )
}
