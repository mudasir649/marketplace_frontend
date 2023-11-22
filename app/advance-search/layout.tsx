import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import Home from '@/components/Home';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Advanced Search: Find the Perfect Ads - Bikes, Vans, Cars, and More',
  description: `Explore a wide range of ads using our Advanced Search. Filter ads by category, including Bikes, Vans, Cars, and more. Refine your search with price conditions to find the perfect items.`,
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