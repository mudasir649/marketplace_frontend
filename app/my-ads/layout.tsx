import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Meine Anzeigen: Verwalten und Überwachen Sie Ihre Anzeigen',
  description: `Greifen Sie auf Ihre Anzeigen an einem Ort zu und verwalten Sie sie. Überwachen Sie die Leistung, bearbeiten Sie Details und optimieren Sie Ihre Werbestrategie mühelos.`,
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