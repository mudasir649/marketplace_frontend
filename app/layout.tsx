'use client'
import './globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from '@/store/store';
import { Inter } from 'next/font/google'
import Head from 'next/head';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Eidcarosse',
  description: 'Welcome to Eidcarosse - No.1 Autos Buy and Sell Marketplace. Explore a diverse range of autos, connect with Swiss buyers and sellers',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes='any' />
        <title>Eidcarosse.ch</title>
      </Head>
      <body className={`${inter.className}`}>
        <Provider store={store}>
          <ToastContainer autoClose={5000} />
          {children}
        </Provider>
      </body>
    </html>
  )
}
