'use client'
import Home from '@/components/Home'
import ProductList from '@/components/ProductList';
import productData from '@/utils/data';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function MyAds() {
    const { userInfo } = useSelector((state: any) => state.auth);
    const userId = userInfo?.userInfo?.data?.userDetails.id;

    const [userAds, setUserAds] = useState<any>()

    useEffect(() => {
        const fetchData = async () => {
            // const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/getUserAds/${userId}`);
            const res = await axios.get('http://localhost:4000/auth/getUserAds/6502dfff6eac8c07ee077054')
            setUserAds(res?.data.data?.adIds);
        }
        fetchData();
    }, [userId]);


    return (
        <Home>
            <div className='container mx-auto'>
                <div className='text-center text-3xl font-bold mb-10'>
                    <h1>My Ads Listing</h1>
                </div>
                <ProductList productList={userAds} />
            </div>
        </Home>
    )
}
