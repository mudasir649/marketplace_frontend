'use client'
import Home from '@/components/Home'
import ProductList from '@/components/ProductList';
import productData from '@/utils/data';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

export default function MyAds() {
    const { userInfo } = useSelector((state: any) => state.auth);
    const userData = userInfo?.data?.userDetails?._id;
    const router = useRouter();

    const [userAds, setUserAds] = useState<any>();

    const { refresh } = useSelector((state: any) => state.app);
    
    const { t } = useTranslation(); // Initialize the translation hook


    useEffect(() => {
        if (userInfo === null) {
            router.push('/');
        }
        const fetchData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/getUserAds/${userData}`)
            setUserAds(res?.data.data);
        }
        fetchData();
    }, [userData, router, userInfo, refresh]);



    return (
        <Home>
            {!userAds ? 
            <div className="flex justify-center mt-5">
            <Image
                src='/assets/eidcarosse.gif'
                alt="eidcarosse_logo"
                width={500}
                height={500}
            />
        </div>
            : 
            <div className='container mx-auto mt-10'>
                <div className='text-center text-3xl font-bold mb-10'>
                    <h1>{t('random.myAdsListing')}</h1>
                </div>
                <ProductList productList={userAds} />
            </div>
}
        </Home>
    )
}
