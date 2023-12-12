'use client';
import React, { useEffect, useState } from 'react'
import I18nProvider from '../components/i18Provider';
import { Provider, useDispatch } from 'react-redux';
import store from '@/store/store';
import AppComponent from '../components/AppComponent';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import Header2 from '../components/Header2';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import { usePathname } from 'next/navigation';
import { routeName } from '@/utils/dataVariables';
import axios from 'axios';
import { setVehicleList } from '@/store/appSlice';


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