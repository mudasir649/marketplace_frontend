'use client';
import useWindowDimensions from '@/utils/useWindowDimensions';
import React from 'react'
import Product from './Product';

export default function ProductList({ productList }: any) {

    const { width, height } = useWindowDimensions();

    const newWidth = width || 0;
    const newHeight = height || 0;

    return (
        <>
            <div className='container mx-auto'>
                <div className={`grid ${newWidth < 688 ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-14`}>
                    {productList?.map((product: any, i: any) => {
                        return (
                            <Product product={product} key={i} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
