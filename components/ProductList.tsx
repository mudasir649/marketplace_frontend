'use client';
import useWindowDimensions from '@/utils/useWindowDimensions';
import React from 'react'
import Product from './Product';
import { AccessTime, Chat, Favorite, LocationOn, RemoveRedEye, Share } from '@mui/icons-material';

export default function ProductList({ productList }: any) {

    const { width, height } = useWindowDimensions();

    const newWidth = width || 0;
    const newHeight = height || 0;

    return (
        <>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {productList?.map((product: any, i: number) => (
                        <Product product={product} key={i} />
                    ))}
                </div>
            </div>
        </>
    )
}
