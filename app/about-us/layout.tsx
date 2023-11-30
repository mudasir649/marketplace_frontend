import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Über uns',
  description: 'Eidcarosse ist ein umfassender Online-Marktplatz, der sich darauf spezialisiert hat, den Kauf und Verkauf von Fahrzeugen zu erleichtern.',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={`${inter.className} mx-0 lg:mx-16`}>{children}</section>
  )
}