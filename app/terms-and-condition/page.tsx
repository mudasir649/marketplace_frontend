"use client";
import Home from '@/components/Home'
import dynamic from 'next/dynamic'
import React from 'react'
import { useTranslation } from 'react-i18next'; 


function Page() {
    const { t } = useTranslation(); // Initialize the translation hook

    return (
        <div>
 <>
    <div className='container mx-auto mt-10'>
        <div className='border-none rounded-sm bg-white mb-10 h-full p-8'>
            <div>
                <h1 className='text-[50px] text-gray-800 mb-6 font-semibold ml-[-1px]'>{t('TermsAndConditions.title')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.intro')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title1')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content1')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title2')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content2')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title3')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content3')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title4')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content4')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title5')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content5')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title6')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content6')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title7')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content7')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title8')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content8')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title9')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content9')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title10')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content10')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title11')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content11')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title12')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content12')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title13')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content13')}</p>

                <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{t('TermsAndConditions.title14')}</h1>
                <p className='text-md text-gray-500 mb-10'>{t('TermsAndConditions.content14')}</p>
            </div>
        </div>
    </div>
</>  </div>
    )
}


export default dynamic(() => Promise.resolve(Page), { ssr: false });