import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import Home from "@/components/Home";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eidcarosse",
  description:
    "Willkommen bei Eidcarosse - dem Marktplatz Nr. 1 für den Kauf und Verkauf von Autos. Entdecken Sie eine vielfältige Auswahl an Fahrzeugen und treten Sie mit Schweizer Käufern und Verkäufern in Kontakt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* eslint-disable-next-line react/no-children-prop */}
        <Home>{children}</Home>
      </body>
    </html>
  );
}
