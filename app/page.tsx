'use client'
import Product from "@/components/Product";
import Home from "../components/Home";
import SearchPage from "../components/Search";
import productData from "@/utils/data";
import { useEffect, useState } from "react";
import FooterBanner from "@/components/FooterBanner";

export default function MainPage() {
  const productList = productData;

  return (
    <div className="">
      <Home>
        <SearchPage />
        <section className='mb-20'>
          <div className='container mx-auto'>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-14'>
              {productList?.map((product: any, i: any) => {
                return (
                  <Product product={product} key={i} />
                )
              })}
            </div>
          </div>
        </section>
        {/* <ProductList/> */}
        <FooterBanner />
      </Home>
    </div>
  )
}
