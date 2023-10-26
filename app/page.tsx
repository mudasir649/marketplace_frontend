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
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslation } from 'react-i18next';




function MainPage() {

  const { t } = useTranslation(); // Initialize the translation hook

  const [featuredAds, setFeaturedAds] = useState<any>()
  const [topAds, setTopAds] = useState<any>()

  const { width, height } = useWindowDimensions();
  const newWidth = width || 0;
  const newHeight = height || 0;

  useEffect(() => {
    const fetchFeaturedData = async () => {
      const res = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/fetchFeatured`);
      setFeaturedAds(res?.data?.data);
    }
    fetchFeaturedData();
    // const fetchTopData = async () => {
    //   const res = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/fetchTopAds`);
    //   setTopAds(res?.data?.data);
    // }
    // fetchTopData();
  }, []);

  return (
    <div className="">
      <Home>
        <SellRepairComponent />
        {/* <TopProducts>
          <ProductList productList={topAds} />
        </TopProducts>
        <FooterBanner /> */}
        {!featuredAds ?
          <div className="flex justify-center mt-8">
            <Image
              src='/assets/eidcarosse.gif'
              alt="eidcarosse_logo"
              width={200}
              height={200}
            />
          </div>
          :
          <section className='mb-20 mt-5'>
            <div className='container mx-auto flex justify-between mb-5'>
              <h1 className='text-xl lg:text-3xl font-bold mt-1'>  {t('random.latestAds')}
              </h1>
              <Link href='/advance-search'>
                <span className='capitalize text-lg font-bold mt-[5px] mr-[-5px]'>  {t('random.seeAllAds')}
                  <East className='text-[#FF0000]' data-aos="fade-right" style={{fontSize:'20px'}} /> </span>
              </Link>
            </div>
            <ProductList productList={featuredAds} />
          </section>
        }
      </Home>
    </div>
  )
}

export default dynamic(() => Promise.resolve(MainPage), { ssr: false });