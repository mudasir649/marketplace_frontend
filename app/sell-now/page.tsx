'use client';
import React, { useEffect, useState } from 'react';
import Login from '@/components/Login';
import Product from '@/components/Product';
import axios from 'axios';
import Image from 'next/image';
import SellNow from '@/components/SellNow';


export default function LoginPage() {
    const [featuredAds, setFeaturedAds] = useState<any>([]);

    useEffect(() => {
        Login
        const fetchFeaturedData = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/fetchFeatured`);
            setFeaturedAds(res?.data?.data);
        }
        fetchFeaturedData();
    }, []);


    if (!featuredAds) {
        return (
            <div className="flex justify-center mt-5">
                <Image
                    src='/assets/eidcarosse.gif'
                    alt="eidcarosse_logo"
                    width={500}
                    height={500}
                />
            </div>
        )
    }

    return (
            <div className=''>
                <><section className='mb-20'>
                    <div className='container mx-auto mt-20'>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14'>
                            {featuredAds?.map((product: any, i: any) => {
                                return (
                                    <Product product={product} key={i} url="login" />
                                );
                            })}
                        </div>
                    </div>
                </section><SellNow /></>
            </div>
    )
}