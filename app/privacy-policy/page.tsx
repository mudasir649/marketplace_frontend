"use client";
import Home from '@/components/Home'
import React from 'react'
import { useTranslation } from 'react-i18next'; 

export default function Page() {
    const { t } = useTranslation(); // Initialize the translation hook

    return (
        <div>
             <Home>
                <div className='container mx-auto mt-10'>
                    <div className='border-none rounded-sm bg-white mb-10 h-full p-8'>
                        <div className=''>
                            <h1 className='text-[50px] text-gray-800 mb-6 font-semibold ml-[-1px]'>
                                {t('privacyPolicy.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.intro')}
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>
                                {t('privacyPolicy.collectionAndUse.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.collectionAndUse.text')}
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>
                                {t('privacyPolicy.personalInfo.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.personalInfo.text')}
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>
                                {t('privacyPolicy.retentionPeriod.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.retentionPeriod.text')}
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>
                                {t('privacyPolicy.dataUsage.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.dataUsage.text')}
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>
                                {t('privacyPolicy.userRights.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.userRights.text')}
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>
                                {t('privacyPolicy.cookies.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.cookies.text')}
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>
                                {t('privacyPolicy.security.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.security.text')}
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>
                                {t('privacyPolicy.editData.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.editData.text')}
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>
                                {t('privacyPolicy.contact.heading')}
                            </h1>
                            <p className='text-md text-gray-500 mb-10'>
                                {t('privacyPolicy.contact.text')}
                            </p>
                        </div>
                    </div>
                </div>
            </Home>
        </div>
    );
}