import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Frequently Asked Questions (FAQ): Ihre Antworten auf häufig gestellte Fragen.',
  description: 'Erkunden Sie unseren Abschnitt mit häufig gestellten Fragen (FAQ) für Antworten auf gängige Anfragen. Finden Sie Lösungen für Ihre Probleme und erhalten Sie ein besseres Verständnis unserer Produkte/Dienstleistungen.',
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