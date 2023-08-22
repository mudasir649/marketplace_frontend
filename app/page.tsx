import Image from 'next/image'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Search from "../components/Search";
export default function Home() {
  return (
    <div className="max-w-[1440px] mx-auto ">
      <Header />
      <Banner />
      <Search />
      {/* <Footer /> */}
    </div>
  )
}
