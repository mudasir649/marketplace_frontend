import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anmelden: Erstellen Sie noch heute Ihr Konto.',
  description: `Registrieren Sie sich noch heute und erstellen Sie Ihr Konto. Treten Sie unserer Community bei und nutzen Sie exklusive Funktionen. Es geht schnell, einfach und sicher!`,
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