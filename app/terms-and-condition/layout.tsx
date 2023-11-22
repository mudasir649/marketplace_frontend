import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Geschäftsbedingungen',
  description: 'Bevor Sie den Dienst der Eidcarosse-Mobilanwendung nutzen, ist es wichtig, dass Sie die folgenden Allgemeinen Geschäftsbedingungen sorgfältig durchlesen und zustimmen.',
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