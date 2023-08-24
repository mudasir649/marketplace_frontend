import Image from 'next/image'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import SearchPage from "../components/Search";
import ProductList from '@/components/ProductList';
export default function Home() {
  return (
    <div className="">
      <Header />
      <Banner />
      <SearchPage />
      <ProductList/>
      <Footer />
    </div>
  )
}
