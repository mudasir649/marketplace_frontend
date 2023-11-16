'use client';
import React from 'react'
import Banner from './Banner'
import Footer from './Footer'
import I18nProvider from './i18Provider';
import Header2 from './Header2';
import { usePathname } from 'next/navigation';
import { Provider, useSelector } from 'react-redux';
import { typeMap } from '@/utils/dataVariables';
import store from '@/store/store';
import AppComponent from './AppComponent';
import { ToastContainer } from 'react-toastify';


export default function Home({ children }: any) {
  return (
    <Provider store={store}>
          <ToastContainer autoClose={5000} />
      <I18nProvider>
      <AppComponent>
        {children}
      </AppComponent>
      </I18nProvider>
    </Provider>
  )
}
