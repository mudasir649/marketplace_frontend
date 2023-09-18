'use client'
import './globals.css'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from '@/store/store';
import { Inter } from 'next/font/google'
import Head from 'next/head';


const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Eidcarosse',
  description: 'Welcome to Eidcarosse - No.1 Autos Buy and Sell Marketplace. Explore a diverse range of autos, connect with Swiss buyers and sellers',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <link rel="icon" href="/eidcarosseIcon.png" />
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
