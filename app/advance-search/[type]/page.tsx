/* eslint-disable @next/next/no-img-element */
'use client'
import AdvanceSearch from "@/components/AdvanceSearch"
import Home from "@/components/Home";
import { setProductData, setProductsCount, setType } from "@/store/appSlice";
import axios from "axios";
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {

    const { type } = useParams();

    const { page, sortBy } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();
    const [brands, setBrands] = useState<string>("");

    const subCategory = type == 'Bicycles' ? 'Bicycles' :
        type == 'E-scooter' ? 'E-scooter' :
            type == 'E-bikes' ? 'E-bikes' :
                type == 'Motorcycle' ? 'Motorcycle' : '';

    const checkType = type === 'Construction%20Machine' ? 'Construction Machine' : type;

    useEffect(() => {
        if (!subCategory) {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${checkType}&sortBy=${sortBy}`);
                dispatch(setProductData(res.data?.data.ad));
                dispatch(setProductsCount(res.data?.data.totalAds));
            }
            fetchData()
        } else {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&subCategory=${type}&sortBy=${sortBy}`);
                dispatch(setProductData(res.data?.data.ad));
                dispatch(setProductsCount(res.data?.data.totalAds));
            }
            fetchData()
        }
        const fetchBrands = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleMake/${type}`);
            setBrands(res.data?.data);
        }
        if (type !== 'Bikes' && type !== 'Parts' && type !== 'Others') {
            fetchBrands()
        }
        dispatch(setType(checkType));
    }, [type, dispatch, page, subCategory, checkType, sortBy]);

    return (
        <div>
            <Home>
                <AdvanceSearch category={checkType} subCategory={subCategory} brands={brands} />
            </Home>
        </div>
    )
}


export default dynamic(() => Promise.resolve(Page), { ssr: false });