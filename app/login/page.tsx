'use client'
import React, { useEffect, useState } from 'react'
import Home from '@/components/Home';
import Login from '@/components/Login';
import productData from '@/utils/data';
import Product from '@/components/Product';
import { useSelector } from "react-redux"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';


export default function LoginPage() {
    const router = useRouter();
    const [featuredAds, setFeaturedAds] = useState<any>([]);

    const { userInfo } = useSelector((state: any) => state.auth);

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
        <Home>
            {/* <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm'> */}
            <div className=''>
                <section className='mb-20'>
                    <div className='container mx-auto mt-20'>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14'>
                            {featuredAds?.map((product: any, i: any) => {
                                return (
                                    <Product product={product} key={i} url="login" />
                                )
                            })}
                        </div>
                    </div>
                </section>
                <Login />
            </div>
        </Home>
    )
}