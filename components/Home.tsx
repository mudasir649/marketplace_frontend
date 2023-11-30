'use client';
import React from 'react'
import I18nProvider from './i18Provider';
import { Provider } from 'react-redux';
import store from '@/store/store';
import AppComponent from './AppComponent';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import Header2 from './Header2';
import Banner from './Banner';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import { routeName } from '@/utils/dataVariables';


function Home({ children }: any) {
  const pathname = usePathname();  
  const checkType = routeName.includes(pathname);

  return (
    <Provider store={store}>
          <ToastContainer autoClose={5000} />
      <I18nProvider>
      <Header2 />
      {!checkType ? <Banner /> : ''}
      {children}
      <Footer />
      </I18nProvider>
    </Provider>
  )
}
export default dynamic(() => Promise.resolve(Home), { ssr: false });