'use client';
import Home from '@/components/Home';
import { useTranslation } from 'react-i18next'; 

import { AddCircle, RemoveCircle } from '@mui/icons-material';
import React, { useState } from 'react';

export default function Page() {
    const { t } = useTranslation(); // Initialize the translation hook

    const faqs = [
        {
            title: t("faq.title1"),
            description: t("faq.description1")
        },
        {
            title: t("faq.title2"),
            description: t("faq.description2")
        },
        {
            title: t("faq.title3"),
            description: t("faq.description3")
        },
        {
            title: t("faq.title4"),
            description: t("faq.description4")
        },
        {
            title: t("faq.title5"),
            description: t("faq.description5")
        },
        {
            title: t("faq.title6"),
            description: t("faq.description6")
        },
        {
            title: t("faq.title7"),
            description: t("faq.description7")
        },
        {
            title: t("faq.title8"),
            description: t("faq.description8")
        },
    ];
    const [showDesc, setShowDesc] = useState<Array<boolean>>(faqs.map(() => false));

    return (
        <div>
            <Home>
                <div className='container mx-auto mt-10 mb-10'>
                    <div className='border-none rounded-sm bg-white p-8'>
                        <h1 className='text-center text-3xl md:text-[50px] text-gray-800 uppercase mt-10'>{t("faq.pageTitle")}</h1>
                        <div className='border-t-2 border-[#FF0000] h-3 mx-auto lg:mx-40 my-10'></div>
                        {faqs.map((data: any, i: number) => (
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
                                    <p className='text-justify my-5 mb-10 text-lg mt-3 ease-in-out duration-200'>{data.description}</p>
                                    :
                                    ''}
                            </div>
                        ))}
                    </div>
                </div>
            </Home>
        </div>
    )
}
