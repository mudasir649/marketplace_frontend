import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: "Post Ad",
  description: "Veröffentlichen Sie hier Ihre Anzeigebeschreibung und Informationen.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={`${inter.className} mx-0 lg:mx-16`}>{children}</section>
  )
}