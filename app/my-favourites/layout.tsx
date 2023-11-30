import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Meine Favoriten: Gestalten Sie Ihre bevorzugten Inhalte',
  description: `Erkunden und verwalten Sie Ihre Lieblingsartikel an einem Ort. Stellen Sie eine Sammlung bevorzugter Inhalte, Produkte oder Dienstleistungen zusammen, um einfachen Zugriff und personalisierte Empfehlungen zu erhalten.`,
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