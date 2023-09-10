'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from '@/store/store';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
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
      <ToastContainer autoClose={5000} />
      <body className={`${inter.className}`}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
