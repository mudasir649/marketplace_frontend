import { East } from '@mui/icons-material'
import Aos from 'aos'
import Link from 'next/link';
import React, { useEffect } from 'react'


export default function TopProducts({ children }: any) {

    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <div className='mt-32 lg:mt-5'>
            <div className='container mx-auto flex justify-between'>
                <h1 className='text-xl lg:text-3xl font-bold ml-6 mt-1'>Top Inserts</h1>
                <Link href='/advance-search'>
                    <span className='capitalize text-lg font-bold mt-[5px] mr-[25px]'>see all Ads <East className='text-[#FF0000]' data-aos="fade-right" /> </span>
                </Link>
            </div>
            <div className='my-10'>
                <div className='container mx-auto'>
                    {children}
                </div>
            </div>
        </div>
    )
}
