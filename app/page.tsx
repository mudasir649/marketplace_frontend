"use client";
import SellRepairComponent from "@/components/SellRepairComponent";
import ProductList from "@/components/ProductList";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

export default function MainPage() {
  const { t } = useTranslation(); // Initialize the translation hook

  const [featuredAds, setFeaturedAds] = useState<any>();

  useEffect(() => {
    const fetchFeaturedData = async () => {
      try {
        const res = await axios(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/fetchFeatured`
        );
        setFeaturedAds(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeaturedData();
  }, []);

  console.log(featuredAds);
  

  return (
    <div className="">
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
                  <span className="capitalize text-lg font-bold mt-[5px] mr-[-5px] whitespace-nowrap">
                    {" "}
                    {t("random.seeAllAds")}
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
    </div>
  );
}
