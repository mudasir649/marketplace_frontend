import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kontaktiere uns: Kommuniziere mit unserem Team',
  description: `Kontaktieren Sie uns für Anfragen, Unterstützung oder Fragen, die Sie haben könnten. Erreichen Sie unser Team einfach und erhalten Sie die Hilfe, die Sie benötigen. Wir sind hier, um zu helfen!`,
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