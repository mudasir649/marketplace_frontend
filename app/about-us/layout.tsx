import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import Home from '@/components/Home';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'About Us',
  description: 'Eidcarosse is a comprehensive online marketplace dedicated to facilitating the buying and selling of vehicles.',
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