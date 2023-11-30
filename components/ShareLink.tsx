'use client';
import { setShowShare } from '@/store/appSlice';
import { Cancel, Facebook, LinkedIn, Mail, Twitter } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ShareLink() {

    const dispatch = useDispatch();

    const { productId } = useSelector((state: any) => state.app);

    const handleShare = () => {
        dispatch(setShowShare(false));
    }

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-opacity-100 backdrop-blur-sm z-10 overflow-y-scroll`}>
            <div className='container mx-10 w-[800px] h-auto mt-12 bg-white shadow-3xl border rounded-lg'>
                <div className='flex justify-end'>
                    <button className='text-white text-xl lg:mr-[-30px]' onClick={() => handleShare()}>
                        <Cancel className='text-[#FF0000]' />
                    </button>
                </div>
                <h1 className='font-bold m-5 border border-gray-400 p-2 whitespace-nowrap'>{`${process.env.NEXT_PUBLIC_LINK_URI}/product-details/${productId}`}</h1>
                <div className='flex gap-2 mx-5 mb-6'>
                    <Facebook className='text-blue-500' />
                    <Twitter className='text-blue-700' />
                    <LinkedIn className='text-blue-700' />
                    <Mail className='text-[#FF0000]' />
                </div>
            </div>
        </div>
    )
}
