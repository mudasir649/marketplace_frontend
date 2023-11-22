import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wie man schnell verkauft: Tipps und Strategien für schnelle Verkäufe',
  description: 'Erfahren Sie effektive Tipps und Strategien, wie Sie schnell verkaufen können. Entdecken Sie bewährte Techniken, um Ihre Verkäufe zu steigern und schnell Käufer anzuziehen.',
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