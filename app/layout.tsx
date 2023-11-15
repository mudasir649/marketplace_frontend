import './globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from '@/store/store';
import { Inter } from 'next/font/google'
import Head from 'next/head';
import { Metadata } from 'next';


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
      <body className={`${inter.className}`}>
        <Provider store={store}>
          <ToastContainer autoClose={5000} />
          {children}
        </Provider>
      </body>
    </html>
  )
}
