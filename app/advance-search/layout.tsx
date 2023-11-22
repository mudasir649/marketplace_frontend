import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Erweiterte Suche: Finden Sie die perfekten Anzeigen - Fahrräder, Lieferwagen, Autos und mehr',
  description: `Entdecken Sie eine Vielzahl von Anzeigen mit unserer erweiterten Suche. Filtern Sie Anzeigen nach Kategorie, einschließlich Fahrräder, Lieferwagen, Autos und mehr. Verfeinern Sie Ihre Suche mit Preisbedingungen, um die perfekten Artikel zu finden.`,
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