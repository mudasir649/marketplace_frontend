import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import Home from '@/components/Home';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Privacy Policy',
  description: 'The creators of the Eidcarosse mobile application prioritize and value the security and privacy of the information you share with us through Eidcarosse.',
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