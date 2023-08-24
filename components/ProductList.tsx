'use client'
import React, { useState } from 'react'
import productData from "../utils/data"
import Link from 'next/link';
import Product from './Product';

export default function ProductList() {

  const [productList, setProductList] = useState(productData);
  // console.log(productList);
  


  return (
    <section className='mb-20'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14'>
          {productList?.map((product: any, i: any) => {
            return (
                <Product product={product} key={i}/>
            )
          })}
        </div>
      </div>
    </section>
  )
}
