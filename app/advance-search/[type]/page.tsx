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
  const { page, condition, brand, year, model , minPrice, maxPrice, sortBy, km, bodyShape, gearBox, fuelType } = useSelector(
    (state: any) => state.app
  );
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<any>();
  const [productsCount, setProductsCount] = useState<any>(0);
  const [brands, setBrands] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [models, setModels] = useState<string>("");
  
  function isNullOrNullOrEmpty(value: any) {
    return value === null || value === undefined || value === "";
  }

  console.log(type);
  
  
  const subCategory = subCategoryMap[type as string] || "";

  console.log(subCategory);
  
  
  const checkType = type1Map[type as string] || type;

  console.log(brand);
  

  useEffect(() => {

    const fetchData = async () => {
      const fetchBrands = async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleMake/${checkType}`
        );
        setBrands(res.data?.data);
      };
      const endpoint = subCategory
      ? `/ad?page=${page}&subCategory=${subCategory}&sortBy=${sortBy}&condition=${condition}&brand=${brand}&model=${model}&year=${year}&minPrice=${minPrice}&maxPrice=${maxPrice}&km=${km}&bodyShape=${bodyShape}&gearBox=${gearBox}&fuelType=${fuelType}`
      : `/ad?page=${page}&category=${checkType}&sortBy=${sortBy}&condition=${condition}&brand=${brand}&year=${year}&minPrice=${minPrice}&maxPrice=${maxPrice}&km=${km}&bodyShape=${bodyShape}&gearBox=${gearBox}&fuelType=${fuelType}`;

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
  }, [page, checkType, dispatch]);

  useEffect(() => {
    const fetchModels = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findModels/${checkType}/${brand}`
      );
      console.log(res.data?.data?.model);
      
      setModels(res.data?.data);
    };
    if((checkType === "Autos" || checkType === "Motorcycles")  && !isNullOrNullOrEmpty(brand)) {
      fetchModels();
    } else{
      return;
    }
  }, [brand])

  return (
    <div>
      <>
        <AdvanceSearch
          productData={productData}
          productsCount={productsCount}
          brands={brands}
          years ={years}
          models={models}
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
