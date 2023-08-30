import Home from '@/components/Home'
import ProductList from '@/components/ProductList'
import productData from '@/utils/data'
import React from 'react'

export default function page() {

    return (
        <Home>
            <div className='container mx-auto'>
                {/* <ProductList productList={productData} /> */}
                <h1>My Profile</h1>
            </div>
        </Home>
    )
}
