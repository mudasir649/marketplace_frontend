"use client";
import AdvanceSearch from "@/components/AdvanceSearch";
import Home from "@/components/Home";
import { setProductData, setProductsCount } from "@/store/appSlice";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const { address, title, page } = useSelector((state: any) => state.app);
  const [productData, setProductData] = useState<any>();
  const [productsCount, setProductsCount] = useState<number>(0);
  const dispatch = useDispatch();

  alert("hhh")


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&address=${address}&title=${title}`
        );
        if (res.status == 200) {
          setProductData(res.data?.data?.ad);
          setProductsCount(res.data?.data?.totalAds);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [address, title, page, dispatch]);

  return (
    <>
        <AdvanceSearch
          setProductData={setProductData}
          setProductsCount={setProductsCount}
          productData={productData}
          productsCount={productsCount}
        />
    </>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
