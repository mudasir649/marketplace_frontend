'use client';
import Home from '@/components/Home';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import React, { useState } from 'react';
import "./sell-fast.css";
import sell from '@/utils/howToSell';
import Image from 'next/image';

export default function Page() {
    const [showDesc, setShowDesc] = useState<Array<boolean>>(sell.map(() => false));

    return (
        <div>
            <Home>
                <div className='container mx-auto mt-10 mb-10'>
                    <div className='border-none rounded-sm bg-white p-8'>
                        <h1 className='text-center text-3xl md:text-[50px] text-gray-800 uppercase mt-10'>How to sell fast</h1>
                        <div className='border-t-2 border-[#FF0000] h-3 mx-auto lg:mx-40 my-10'></div>
                        {sell.map((data: any, i: number) => (
                            <div className='mx-auto lg:mx-40 border-b-2 border-gray-300' key={i}>
                                <div className='flex justify-between my-5 cursor-pointer mb-8 mt-10' onClick={() => {
                                    const updatedShowDesc = [...showDesc];
                                    updatedShowDesc[i] = !updatedShowDesc[i];
                                    setShowDesc(updatedShowDesc);
                                }}>
                                    <h1 className='text-md md:text-2xl font-semibold'>{data.title}</h1>
                                    {showDesc[i] ? <RemoveCircle style={{ fontSize: "25px" }} /> : <AddCircle style={{ fontSize: "25px" }} />}
                                </div>
                                {showDesc[i] ?
                                    <div className='text-center my-5'>
                                        <section className='flex justify-center'>
                                            <Image
                                                src={data.image}
                                                alt='this is image 1'
                                                height={300}
                                                width={300}
                                            />
                                        </section>
                                        <p className='mb-10 text-lg mt-3'>{data.description}</p>
                                    </div>
                                    :
                                    ''}
                            </div>
                        ))}
                    </div>
                </div>
            </Home >
        </div >
    )
}



