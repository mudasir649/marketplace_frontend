'use client'
import Product from "@/components/Product";
import Home from "../components/Home";
import productData from "@/utils/data";
import topProductData from "@/utils/data copy";
import FooterBanner from "@/components/FooterBanner";
import TopProducts from "@/components/TopProducts";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { East } from "@mui/icons-material";
import SellRepairComponent from "@/components/SellRepairComponent";
import ProductList from "@/components/ProductList";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {

  const [featuredAds, setFeaturedAds] = useState<any>()
  const [topAds, setTopAds] = useState<any>()

  const { width, height } = useWindowDimensions();
  const newWidth = width || 0;
  const newHeight = height || 0;

  useEffect(() => {
    const fetchTopData = async () => {
      const res = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/fetchTopAds`);
      setTopAds(res?.data?.data);
    }
    const fetchFeaturedData = async () => {
      const res = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/fetchFeatured`);
      setFeaturedAds(res?.data?.data);
    }
    fetchTopData();
    fetchFeaturedData();
  }, [])


  return (
    <div className="">
      <Home suppressHydrationWarning={true}>
        <SellRepairComponent />
        <TopProducts>
          <ProductList productList={topAds} />
        </TopProducts>
        <FooterBanner />
        <section className='mb-20'>
          <div className='container mx-auto flex justify-between mb-5'>
            <h1 className='text-xl lg:text-3xl font-bold ml-6 mt-1'>Top Inserts</h1>
            <span className='capitalize text-lg font-bold mt-[5px] mr-[25px]'>see all Ads <East className='text-[#e52320]' data-aos="fade-right" /> </span>
          </div>
          <ProductList productList={featuredAds} />
        </section>
      </Home>
    </div>
  )
}
