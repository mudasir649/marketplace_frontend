import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mein Profil: Verwalten Sie Ihre persönlichen Informationen',
  description: `Greifen Sie auf Ihr Profil zu und verwalten Sie die Informationen. Aktualisieren Sie persönliche Details, passen Sie Einstellungen an und sehen Sie Ihre Aktivitätshistorie auf unserer Plattform ein.`,
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