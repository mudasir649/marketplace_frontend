"use client";
import ProductList from "@/components/ProductList";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from 'react-i18next';


export default function Favorite() {
  const [favAds, setFavAds] = useState<any>();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { refresh } = useSelector((state: any) => state.app);
  const userId = userInfo?.data?.userDetails?._id;
  const router = useRouter();
  const { t } = useTranslation(); // Initialize the translation hook

  useEffect(() => {
    const fetchAds = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/getFavAds/${userId}`
      );
      if (res.status === 200) {
        setFavAds(res?.data?.data);
      }
    };
    fetchAds();
  }, [userId, refresh]);

  useEffect(() => {
    if (userInfo === null) {
      router.push("/");
    }
  }, [userId, userInfo, favAds, router]);

  return (
    <>
      {!favAds ? (
        <div className="flex justify-center mt-5">
          <Image
            src="/assets/eidcarosse.gif"
            alt="eidcarosse_logo"
            width={200}
            height={200}
          />
        </div>
      ) : (
        <div className="container mx-auto mt-10">
          <div className="text-center text-3xl font-bold mb-10">
            <h1>{t('random.myFavouriteListings')}</h1>
          </div>
          <ProductList productList={favAds} />
        </div>
      )}
    </>
  );
}
