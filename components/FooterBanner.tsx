import React, { useEffect } from 'react'
import style from "./banner.module.css";
import Aos from 'aos';

export default function FooterBanner() {

    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <div className='mb-10 mt-1 h-auto p-5' data-aos="fade-down">
            <div className={`container mx-auto ${style.bg}`}>
                
            </div>
        </div >
    )
}
