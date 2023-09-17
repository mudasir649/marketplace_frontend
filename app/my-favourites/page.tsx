'use client';
import Home from '@/components/Home';
import ProductList from '@/components/ProductList';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Favorite() {
    const [favAds, setFavAds] = useState<any>();
    const { userInfo } = useSelector((state: any) => state.auth);
    const userId = userInfo?.data?.userDetails?.id;
    const router = useRouter();
    useEffect(() => {
        if (userInfo === null) {
            router.push('/');
        }
        const fetchAds = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/getFavAds/${userId}`);
            if (res.status === 200) {
                setFavAds(res?.data?.data);
            }
        }
        fetchAds()
    }, [userId, userInfo, favAds, router]);

    if (!favAds) {
        return <div className="flex justify-center mt-5">
            <Image
                src='/assets/eidcarosse.gif'
                alt="eidcarosse_logo"
                width={500}
                height={500}
            />
        </div>
    }

    return (
        <Home>
            <div className='container mx-auto'>
                <ProductList productList={favAds} />
            </div>
        </Home>
    )
}
