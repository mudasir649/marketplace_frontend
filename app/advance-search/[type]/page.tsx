/* eslint-disable @next/next/no-img-element */
"use client";
import AdvanceSearch from "@/components/AdvanceSearch";
import Home from "@/components/Home";
import { setProductData, setProductsCount, setType } from "@/store/appSlice";
import { Category } from "@mui/icons-material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const { type } = useParams();
  const { page, condition, brand, minPrice, maxPrice, sortBy } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<any>();
  const [productsCount, setProductsCount] = useState<any>(0);
  const [brands, setBrands] = useState<string>("");
  const subCategory = type === 'Bicycles' ? 'Bicycles' :
  type == 'E-Scooters' ? 'E-scooter' :
      type == 'E-Bikes' ? 'E-bikes' :
          type == 'Motorcycles' ? 'Motorcycle' : '';

          console.log(subCategory);
          

  const checkType = type === "Construction%20Machines" ? "Construction Machines" : type;
  

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleMake/${checkType}`
      );
      setBrands(res.data?.data);
    };
    if(!subCategory){
        const fetchData = async () => {
            const res =  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${checkType}&sortBy=${sortBy}&condition=${condition}&brand=${brand}&minPrice=${minPrice}&mxPrice=${maxPrice}`);
            setProductData(res.data?.data?.ad);
            setProductsCount(res.data?.data?.totalAds);
            dispatch(setType(checkType));
            if (
              checkType !== "Bikes" &&
              checkType !== "Parts" &&
              checkType !== "Others"
            ) {
              fetchBrands();
            }
        };
        fetchData();
    }else{
        const fetchData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&subCategory=${subCategory}&sortBy=${sortBy}&condition=${condition}&brand=${brand}&minPrice=${minPrice}&mxPrice=${maxPrice}`);
            setProductData(res.data?.data.ad);
            setProductsCount(res.data?.data.totalAds);
            dispatch(setType(checkType));
        }
        fetchData()
    }
  }, [page, checkType, dispatch]);


  return (
    <div>
      <Home>
        <AdvanceSearch
          productData={productData}
          productsCount={productsCount}
          brands={brands}
          category={checkType}
          setProductData={setProductData}
          setProductsCount={setProductsCount}
          subCategory={subCategory} 
        />
      </Home>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
