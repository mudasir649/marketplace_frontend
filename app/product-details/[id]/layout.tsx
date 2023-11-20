import '../../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import Home from '@/components/Home';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Eidcarosse Product Details',
  description: 'Welcome to Eidcarosse - No.1 Autos Buy and Sell Marketplace. Explore a diverse range of autos, connect with Swiss buyers and sellers',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={`${inter.className} mx-16`}>{children}</section>
  )
}