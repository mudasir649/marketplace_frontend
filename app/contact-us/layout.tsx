import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Contact Us: Get in Touch with Our Team.',
  description: `Contact us for inquiries, support, or any questions you may have. Reach our team easily and get the assistance you need. We're here to help!.`,
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