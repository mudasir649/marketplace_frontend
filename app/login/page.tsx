'use client'
import React from 'react'
import Home from '@/components/Home';
import Login from '@/components/Login';
import productData from '@/utils/data';
import Product from '@/components/Product';


export default function LoginPage() {
    const productList = productData;
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
