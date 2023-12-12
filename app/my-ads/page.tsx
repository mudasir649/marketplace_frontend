'use client'
import Home from '@/app/Home'
import ProductList from '@/components/ProductList';
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


    console.log(userAds);
    

    return (
        <>
            {!userAds ? 
            <div className="flex justify-center mt-5">
            <Image
                src='/assets/eidcarosse.gif'
                alt="eidcarosse_logo"
                width={200}
                height={200}
            />
        </div>
            : 
            <div className='container mx-auto mt-10'>
                <div className='text-center text-3xl font-bold mb-10'>
                    <h1>{t('random.myAdsListing')}</h1>
                </div>
                {userAds.length <= 0 ? 
                <div className='flex justify-center'>
                <Image className='h-80 w-80' src="/assets/no_record.png" width={500} height={500} alt='no_record_picture' />
                </div> :  
                <ProductList productList={userAds} />
            }
            </div>
}
        </>
    )
}
