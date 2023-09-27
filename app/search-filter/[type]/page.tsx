'use client';
import AdvanceSearch from '@/components/AdvanceSearch';
import Home from '@/components/Home'
import axios from 'axios';
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {

    const { type } = useParams();

    const [page, setPage] = useState<number>(1);
    const [productData, setProductData] = useState<any>(null);
    const [productsCount, setProductsCount] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/searchRecord?page=${page}&&category=${type}`);
            setProductData(res.data?.data?.ad);
            setProductsCount(res.data?.data?.totalAds)
        }
        fetchData()
    }, [page, type]);

    return (
        <AdvanceSearch productData={productData} productsCount={productsCount} page={page} setPage={setPage} />
    )
}
