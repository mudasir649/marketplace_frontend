'use client';
import AdvanceSearch from '@/components/AdvanceSearch';
import Home from '@/components/Home'
import axios from 'axios';
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {

    const { type } = useParams();

    const subCategory = type == 'Bicycles' ? 'Bicycles' :
        type == 'E-scooter' ? 'E-scooter' :
            type == 'E-bikes' ? 'E-bikes' :
                type == 'Motorcycle' ? 'Motorcycle' : '';

    const [page, setPage] = useState<number>(1);
    const [productData, setProductData] = useState<any>(null);
    const [productsCount, setProductsCount] = useState<number>(0);
    useEffect(() => {
        if (!subCategory) {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/searchRecord?page=${page}&&category=${type}`);
                setProductData(res.data?.data?.ad);
                setProductsCount(res.data?.data?.totalAds)
            }
            fetchData()
        } else {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/searchRecord?page=${page}&&subCategory=${subCategory}`);
                setProductData(res.data?.data?.ad);
                setProductsCount(res.data?.data?.totalAds)
            }
            fetchData()
        }
    }, [page, type, subCategory]);

    return (
        <AdvanceSearch productData={productData} category={type} productsCount={productsCount} page={page} setPage={setPage} subCategory={subCategory} />
    )
}
