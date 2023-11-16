"use client";
import Home from '@/components/Home';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import React from 'react';

function Page() {
    const { t } = useTranslation(); // Initialize the useTranslation hook

    return (
        <div>
                <div className='container mx-auto mb-10 mt-10'>
                    <div className='border-none rounded-sm bg-white p-8'>
                        <h1 className='text-[50px] text-gray-800 mb-6 font-semibold'>
                            {t('aboutUs.title')}
                        </h1>
                        <p className='mb-10'>
                            {t('aboutUs.description')}
                        </p>
                        <h1 className='text-xl text-gray-800 mb-6 font-semibold'>
                            {t('buyers.title')}
                        </h1>
                        <ol className='mb-10' style={{ listStyleType: "disc" }}>
                            <li className='ml-5'>
                                {t('buyers.description.0')}
                            </li>
                            <li className='ml-5'>
                                {t('buyers.description.1')}
                            </li>
                        </ol>
                        <h1 className='text-xl text-gray-800 mb-6 font-semibold'>
                            {t('sellers.title')}
                        </h1>
                        <ol style={{ listStyleType: "disc" }}>
                            <li className='ml-5'>
                                {t('sellers.description.0')}
                            </li>
                            <li className='ml-5'>
                                {t('sellers.description.1')}
                            </li>
                            <li className='ml-5'>
                                {t('sellers.description.2')}
                            </li>
                        </ol>
                        <p className='mb-1 mt-10'>
                            {t('pageDescription.0')}
                        </p>
                        <p className='mb-1 mt-10'>
                            {t('pageDescription.1')}
                        </p>
                    </div>
                </div>
        </div>
    );
}

export default Page;
