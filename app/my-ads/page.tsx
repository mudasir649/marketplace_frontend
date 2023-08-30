'use client'
import Home from '@/components/Home'
import ProductList from '@/components/ProductList';
import productData from '@/utils/data';
import React from 'react';

export default function MyAds() {


    return (
        <Home>
            <div className='container mx-auto'>
                <div className='text-center text-3xl font-bold mb-10'>
                    <h1>My Ads Listing</h1>
                </div>
                <ProductList productList={productData} />
            </div>
        </Home>
    )
}
