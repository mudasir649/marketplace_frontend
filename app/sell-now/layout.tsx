import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sofort verkaufen: Schneller und einfacher Verkaufsprozess.',
  description: `Verkaufen Sie Ihre Artikel schnell mit unserem einfachen 'Jetzt verkaufen'-Prozess. Erhalten Sie sofortige Angebote, schnelle Transaktionen und verwandeln Sie Ihre Artikel in Bargeld.`,
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