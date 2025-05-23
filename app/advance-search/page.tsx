/* eslint-disable @next/next/no-img-element */
'use client'
import AdvanceSearch from "@/components/AdvanceSearch"
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page() {

    const { page, minPrice, maxPrice, address } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();
    const [productData, setProductData] = useState<any>();
    const [productsCount, setProductsCount] = useState<number>(0);

    const api = (address !== "" || minPrice !== "" || maxPrice !== "") ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&address=${address}&minPrice=${minPrice}&maxPrice=${maxPrice}` : `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}`

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(api);
                if (res.status == 200) {
                setProductData(res.data?.data.ad);
                setProductsCount(res.data?.data.totalAds);
            }
        }
        fetchData();
    }, [page, dispatch])

    return (
        <div>
            <AdvanceSearch productData={productData} setProductData={setProductData} productsCount={productsCount} setProductsCount={setProductsCount} />
        </div>
    )
}


export default dynamic(() => Promise.resolve(Page), { ssr: false });