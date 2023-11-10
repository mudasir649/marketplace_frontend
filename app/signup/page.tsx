'use client'
import React, { useEffect, useState } from 'react'
import Home from '@/components/Home';
import Product from '@/components/Product';
import Signup from '@/components/Signup';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import axios from 'axios';
import dynamic from 'next/dynamic';


function SignupPage() {
    const router = useRouter()

    const [featuredAds, setFeaturedAds] = useState<any>([]);

    const { userInfo } = useSelector((state: any) => state.auth);

    useEffect(() => {
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
            <div className='overflow-y-scroll:hidden'>
                <section className='mb-20'>
                    <div className='container mx-auto mt-20 '>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14'>
                            {featuredAds?.map((product: any, i: any) => {
                                return (
                                    <Product product={product} key={i} url="signup" />
                                )
                            })}
                        </div>
                    </div>
                </section>
                <Signup />
            </div>
        </Home>
    )
}

export default dynamic(() => Promise.resolve(SignupPage), { ssr: false });
