import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Passwort ändern: Aktualisieren Sie Ihr Kontopasswort sicher',
  description: `Ändern Sie Ihr Kontopasswort sicher. Schützen Sie Ihr Konto, indem Sie Ihr Passwort regelmäßig aktualisieren. Befolgen Sie unsere einfachen Schritte, um die Sicherheit Ihres Kontos zu gewährleisten.`,
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