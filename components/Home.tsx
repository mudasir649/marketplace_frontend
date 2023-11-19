'use client';
import React from 'react'
import I18nProvider from './i18Provider';
import { Provider } from 'react-redux';
import store from '@/store/store';
import AppComponent from './AppComponent';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';


function Home({ children }: any) {
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
export default dynamic(() => Promise.resolve(Home), { ssr: false });