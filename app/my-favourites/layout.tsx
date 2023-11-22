import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import Home from '@/components/Home';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Favorites: Curate Your Preferred Content',
  description: `Explore and manage your favorite items in one place. Curate a collection of preferred content, products, or services for easy access and personalized recommendations.`,
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