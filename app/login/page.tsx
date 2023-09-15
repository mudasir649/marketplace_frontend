'use client'
import React, { useEffect } from 'react'
import Home from '@/components/Home';
import Login from '@/components/Login';
import productData from '@/utils/data';
import Product from '@/components/Product';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const router = useRouter();
    const productList = productData;

    const { userInfo } = useSelector((state: any) => state.auth);

    return (
        <Home>
            {/* <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm'> */}
            <div className=''>
                <section className='mb-20'>
                    <div className='container mx-auto'>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14'>
                            {productList?.map((product: any, i: any) => {
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