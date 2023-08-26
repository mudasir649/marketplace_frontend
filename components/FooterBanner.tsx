import React, { useEffect } from 'react'
import style from "./banner.module.css";
import Aos from 'aos';

export default function FooterBanner() {

    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <div className='mb-10 bg-white mt-1 h-auto p-5' data-aos="fade-down">
            <div className={`container mx-auto ${style.bg}`}>
                {/* <h1 className='text-4xl lg:text-[58px] font-semibold leading-none lg:pl-52 pt-10'>
          <span className='text-[#e52320]'>Buy</span> <span className='text-black'>What ever you want.</span>
        </h1> */}
            </div>
        </div >
    )
}
