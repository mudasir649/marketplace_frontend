import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import Home from '@/components/Home';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sign Up: Create Your Account Today',
  description: `Sign up and create your account today. Join our community and access exclusive features. It's quick, easy, and secure!`,
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