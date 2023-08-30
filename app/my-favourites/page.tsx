import Home from '@/components/Home'
import ProductList from '@/components/ProductList'
import productData from '@/utils/data'
import React from 'react'

export default function Favorite() {

    return (
        <Home>
            <div className='container mx-auto'>
                <ProductList productList={productData} />
            </div>
        </Home>
    )
}
