import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Inter } from "next/font/google";
import Home from "@/components/Home";
import AppComponent from "@/components/AppComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eidcarosse",
  description:
    "Welcome to Eidcarosse - No.1 Autos Buy and Sell Marketplace. Explore a diverse range of autos, connect with Swiss buyers and sellers",
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
