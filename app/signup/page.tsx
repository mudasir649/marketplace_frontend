'use client'
import React from 'react'
import Home from '@/components/Home';
import productData from '@/utils/data';
import Product from '@/components/Product';
import Signup from '@/components/Signup';


export default function SignupPage() {
    const productList = productData;
    return (
        <Home>
            <div>
                <section className='mb-20'>
                    <div className='container mx-auto'>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14'>
                            {productList?.map((product: any, i: any) => {
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
