"use client";
import Home from "../components/Home";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { East } from "@mui/icons-material";
import SellRepairComponent from "@/components/SellRepairComponent";
import ProductList from "@/components/ProductList";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { NextSeo } from 'next-seo'

function MainPage() {
  const { t } = useTranslation(); // Initialize the translation hook

  const [featuredAds, setFeaturedAds] = useState<any>();
  const [topAds, setTopAds] = useState<any>();

  const { width, height } = useWindowDimensions();
  const newWidth = width || 0;
  const newHeight = height || 0;

  useEffect(() => {
    const fetchFeaturedData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/fetchFeatured`);
        setFeaturedAds(res?.data?.data);

        // Dynamically update metadata here
        document.title = 'Eidcarosse';
        document.querySelector('meta[name="description"]')?.setAttribute('content', 'Your dynamic description here');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFeaturedData();
  }, []);

  // useEffect(() => {
  //   const fetchFeaturedData = async () => {
  //     const res = await axios(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/fetchFeatured`
  //     );
  //     setFeaturedAds(res?.data?.data);
  //   };
  //   fetchFeaturedData();
  //   // const fetchTopData = async () => {
  //   //   const res = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/fetchTopAds`);
  //   //   setTopAds(res?.data?.data);
  //   // }
  //   // fetchTopData();
  // }, []);

  return (
    <div className="">
        <Head>
          {/* The title and meta tags will be dynamically updated after fetching data */}
          {/* <title>Eidcarosse.ch</title>
          <meta name="description" content="Welcome to Eidcarosse - No.1 Autos Buy and Sell Marketplace. Explore a diverse range of autos, connect with Swiss buyers and sellers" /> */}
        </Head>
      <Home>
        {/* <TopProducts>
          <ProductList productList={topAds} />
        </TopProducts>
        <FooterBanner /> */}
        {!featuredAds ? (
          <div className="flex justify-center mt-8">
          <Image
          src='/assets/eidcarosse.gif'
          alt="eidcarosse_logo"
          width={200}
          height={200}
          />
      </div> 
        ) : (
          <>
            <section className="mb-20 mt-5">
              <div className="container mx-auto flex justify-between mb-5">
                <h1 className="text-xl lg:text-3xl font-bold mt-1">
                  {" "}
                  {t("random.latestAds")}
                </h1>
                <Link href="/advance-search">
                  <span className="capitalize text-lg font-bold mt-[5px] mr-[-5px]">
                    {" "}
                    {t("random.seeAllAds")}
                    <East
                      className="text-[#FF0000]"
                      data-aos="fade-right"
                      style={{ fontSize: "20px" }}
                    />{" "}
                  </span>
                </Link>
              </div>
              <ProductList productList={featuredAds} />
            </section>
            <div className="bg-white">
            <SellRepairComponent />
            </div>
          </>
        )}
      </Home>
    </div>
  );
}

export default dynamic(() => Promise.resolve(MainPage), { ssr: false });
