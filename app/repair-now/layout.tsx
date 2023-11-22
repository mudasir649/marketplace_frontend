import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jetzt reparieren: Schnelle und zuverlässige Reparaturen für Ihre Artikel',
  description: `Lassen Sie Ihre Artikel schnell und zuverlässig mit unserem 'Jetzt reparieren'-Service reparieren. Wir bieten effiziente Reparaturlösungen für eine Vielzahl von Produkten.`,
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