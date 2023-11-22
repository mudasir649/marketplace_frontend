import { Cancel, Email, Person, Title } from '@mui/icons-material';
import Link from 'next/link';
import React, { useState } from 'react';
import signLogo from "../public/assets/signLogo.png";
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setShowContact } from '@/store/appSlice';
import { useTranslation } from 'react-i18next'; 
import { useRouter } from 'next/navigation';

interface IData {
    email: string,
    subject: string,
    message: string
}


export default function ContactUs() {
    const { t } = useTranslation(); // Initialize the translation hook

    const [data, setData] = useState<IData>({
        email: '',
        subject: '',
        message: ''
    });

    const router = useRouter();

    const handleData = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/send-email`, data);
        if (res.status == 200) {
            toast(res.data?.message);
        }
    }


    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-opacity-100 backdrop-blur-sm z-10 overflow-y-scroll`}>
            <div className='container mx-10 w-[800px] h-auto mt-12 bg-white shadow-3xl border rounded-lg'>
                <div className='flex justify-end'>
                    <button className='text-white text-xl lg:mr-[-30px]' onClick={() => router.push('/')}>
                        <Cancel className='text-[#FF0000]' />
                    </button>
                </div>
                <div className='flex justify-center'>
                    <div className='mt-10 space-y-4'>
                        <div className='flex justify-center mb-10'>
                            <Image
                                src={signLogo}
                                alt="logo"
                                width={100}
                                height={100}
                            />
                        </div>
                        <h1 className='flex justify-center text-2xl font-bold'>  {t('contactPage.contactUs')}</h1>
                        
                        <form className='space-y-4' onSubmit={(e: any) => handleSubmit(e)} method='post'>
                            <div className='flex flex-row border border-gray-200 hover:border-[#FF0000] focus:border-[#FF0000]
                                    cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                                <Person className='text-[#FF0000]' />
                                <input className='border-none w-full bg-transparent focus:outline-none mt-[1px]'
                                    type="text"
                                    placeholder={t('contactPage.placeholderEmail')}
                                    name='email'
                                    value={data.email}
                                    required
                                    onChange={(e) => handleData(e)}
                                />
                            </div>
                            <div className='flex flex-row border border-gray-200 hover:border-[#FF0000] focus:outline-[#FF0000]
                                    cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                                <Title className='text-[#FF0000]' />
                                <input className='border-none w-full bg-transparent focus:outline-none mt-[1px]'
                                    type="text"
                                    placeholder={t('contactPage.placeholderSubject')}
                                    name='subject'
                                    value={data.subject}
                                    required
                                    onChange={(e) => handleData(e)}
                                />
                            </div>
                            <textarea className='flex flex-row border border-gray-200 hover:border-[#FF0000] 
                                cursor-pointer focus:outline-[#FF0000] rounded-md h-52 w-64 md:w-96 space-x-4 p-2 bg-gray-100'
                                maxLength={250}
                                placeholder={t('contactPage.placeholderMessage')}
                                style={{ resize: "none" }}
                                name='message'
                                value={data.message}
                                required
                                onChange={(e) => handleData(e)}
                            />
                            <div className='flex justify-center font-bold'>
                                <button className='border border-red-500 bg-gradient-to-r from-red-300 to-[#FF0000] hover:border-[#FF0000] hover:from-red-600 hover:to-red-600 rounded-lg w-40 p-1 space-x-2 text-white mb-8'>
                                    <span>{t('contactPage.buttonSubmit')}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
