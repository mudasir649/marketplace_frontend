/* eslint-disable @next/next/no-img-element */
'use client'
import AdvanceSearch from "@/components/AdvanceSearch"
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {

    const { page } = useSelector((state: any) => state.app);
    const [productData, setProductData] = useState<any>()
    const [productsCount, setProductsCount] = useState<number>(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}`);
            if (res.status == 200) {
                setProductData(res.data?.data.ad);
                setProductsCount(res.data?.data.totalAds);
            }
        }
        fetchData();
    }, [page, dispatch])

    return (
        <AdvanceSearch setProductData={setProductData} setProductsCount={setProductsCount} productData={productData} productsCount={productsCount} />
    )
}
