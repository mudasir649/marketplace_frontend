/* eslint-disable @next/next/no-img-element */
"use client";
import AdvanceSearch from "@/components/AdvanceSearch";
import Home from "@/components/Home";
import { setType } from "@/store/appSlice";
import { subCategoryMap, type1Map, validTypes } from "@/utils/dataVariables";
import axios from "axios";
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const { type } = useParams();
  const { page, condition, brand, minPrice, maxPrice, sortBy } = useSelector(
    (state: any) => state.app
  );
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<any>();
  const [productsCount, setProductsCount] = useState<any>(0);
  const [brands, setBrands] = useState<string>("");
  
  const subCategory = subCategoryMap[type as string] || "";

  console.log(subCategory);
  
  
  const checkType = type1Map[type as string] || type;

  useEffect(() => {

    const fetchData = async () => {
      const fetchBrands = async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleMake/${checkType}`
        );
        setBrands(res.data?.data);
      };
      const endpoint = subCategory
      ? `/ad?page=${page}&subCategory=${subCategory}&sortBy=${sortBy}&condition=${condition}&brand=${brand}&minPrice=${minPrice}&mxPrice=${maxPrice}`
      : `/ad?page=${page}&category=${checkType}&sortBy=${sortBy}&condition=${condition}&brand=${brand}&minPrice=${minPrice}&mxPrice=${maxPrice}`;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}${endpoint}`);
      const data = res.data?.data;

      setProductData(data?.ad);
      setProductsCount(data?.totalAds);
      dispatch(setType(checkType));

      if(!subCategory && !validTypes.includes(checkType as string)){
        fetchBrands();
      }
    }
      fetchData();
    // if (!subCategory) {
    //   const fetchData = async () => {
    //     const res = await axios.get(
    //       `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${checkType}&sortBy=${sortBy}&condition=${condition}&brand=${brand}&minPrice=${minPrice}&mxPrice=${maxPrice}`
    //     );
    //     setProductData(res.data?.data?.ad);
    //     setProductsCount(res.data?.data?.totalAds);
    //     dispatch(setType(checkType));
    //     if (!validTypes.includes(checkType as string)) {
    //       fetchBrands();
    //     }
    //   };
    //   fetchData();
    // } else {
    //   const fetchData = async () => {
    //     const res = await axios.get(
    //       `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&subCategory=${subCategory}&sortBy=${sortBy}&condition=${condition}&brand=${brand}&minPrice=${minPrice}&mxPrice=${maxPrice}`
    //     );
    //     setProductData(res.data?.data.ad);
    //     setProductsCount(res.data?.data.totalAds);
    //     dispatch(setType(checkType));
    //   };
    //   fetchData();
    // }
  }, [page, checkType, dispatch]);

  return (
    <div>
      <>
        <AdvanceSearch
          productData={productData}
          productsCount={productsCount}
          brands={brands}
          category={checkType}
          setProductData={setProductData}
          setProductsCount={setProductsCount}
          subCategory={subCategory}
        />
      </>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
