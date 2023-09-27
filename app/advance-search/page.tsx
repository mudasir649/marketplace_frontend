/* eslint-disable @next/next/no-img-element */
'use client'
import AdvanceSearch from "@/components/AdvanceSearch"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {


    const [productData, setProductData] = useState<any>(null);
    const [productsCount, setProductsCount] = useState<any>(0);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}`);
            setProductData(res.data?.data?.ad);
            setProductsCount(res.data?.data?.totalAds)
        }
        fetchData();
    }, [page]);


    console.log(page);

    return (
        <AdvanceSearch productData={productData} productsCount={productsCount} page={page} setPage={setPage} />
    )
}
