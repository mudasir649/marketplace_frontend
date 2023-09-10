'use client';
import Home from '@/components/Home';
import { ExpandMore, PlaylistAdd } from '@mui/icons-material';
import Link from 'next/link';
import React, { useState } from 'react';
import './post-ad.css';
import { list, subList } from '@/utils/dataVariables';
import { useRouter } from 'next/navigation';
export default function PostAd() {

    const router = useRouter();

    const [open, isOpen] = useState<Boolean>(false);
    const [openSub, isOpenSub] = useState<Boolean>(false);
    const [showSub, setShowSub] = useState<Boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [subCategory, setSubCategory] = useState<string>('');

    const handleCategory = (value: any) => {
        setCategory(value);
        if (value == 'Bikes') {
            setShowSub(true);
        }
        else {
            router.push(`/post-ad/${value}`);
        }
    }

    const handleSubCategory = (value: any) => {
        setSubCategory(value);
        router.push(`/post-ad/${value}`)
    }

    console.log(category);



    return (
        <Home>
            <div className='container mx-auto mb-20'>
                <div className='border-none box-container bg-white rounded-sm h-full p-3'>
                    <div className='container mx-auto'>
                        <h1 className='space-x-3 border-b-2 pb-3'><PlaylistAdd className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Select Category</span></h1>
                    </div>
                    <div className='container mx-0 mt-6 lg:mx-20 w-auto'>
                        <div className='flex flex-col md:flex-row justify-end space-x-0 md:space-x-20 space-y-2 md:space-y-0 mb-5 mt-5'>
                            <h1 className={`flex flex-row space-x-1 text-md font-bold ${showSub && 'w-40'}`}>Category <span className='text-red-600'>*</span></h1>
                            <div className='flex flex-col hover:border-red-500 w-full rounded-sm h-10'
                                onClick={() => isOpen(!open)}
                            >
                                <div className='flex flex-row border border-gray-300' >
                                    <h1 className='w-full p-2'>{category == '' ? `Select Category` : <>{category}</>}</h1>
                                    <div className={`p-1 pl-2 text-gray-600
                                        bg-gray-300 w-10`}>
                                        <ExpandMore className={`logo ${open ? 'active' : 'inactive'}`} />
                                    </div>
                                </div>
                                <div className={`menu-item flex flex-row border bg-white h-auto border-gray-300 
                                    w-full rounded-sm p-1 ${open ? 'active' : 'inactive'}`}
                                >
                                    <ul className='w-full'>
                                        {list?.map((lst: any, i: number) => (
                                            <li className={`hover:bg-red-500 hover:text-white 
                                                ml-1 mb-1 ${list.length - 1 == i ? '' : ' border-b-2'}`}
                                                key={i} onClick={() => handleCategory(lst.name)}>{lst?.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {showSub &&
                            <div className='flex flex-col md:flex-row justify-end space-x-0 md:space-x-20 space-y-2 md:space-y-0 mb-5 mt-5'>
                                <h1 className='flex flex-row space-x-1 text-md font-bold w-40'>Sub Category <span className='text-red-600'>*</span></h1>
                                <div className='flex flex-col hover:border-red-500 w-full rounded-sm h-10'
                                    onClick={() => isOpenSub(!openSub)}
                                >
                                    <div className='flex flex-row border border-gray-300' >
                                        <h1 className='w-full p-2'>Select Category</h1>
                                        <div className={`p-1 pl-2 text-gray-600
                                    bg-gray-300 w-10`}>
                                            <ExpandMore className={`logo ${open ? 'hidden' : 'visible'} ${openSub ? 'active' : 'inactive'}`} />
                                        </div>
                                    </div>
                                    <div className={`menu-item flex flex-row border bg-white h-auto border-gray-300 
                                w-full rounded-sm p-1 ${openSub ? 'active' : 'inactive'}`}
                                    >
                                        <ul className='w-full'>
                                            {subList?.map((lst: any, i: number) => (
                                                <li className={`hover:bg-red-500 hover:text-white 
                                            ml-1 mb-1 ${list.length - 1 == i ? '' : ' border-b-2'}`}
                                                    key={i} onClick={() => handleSubCategory(lst.name)}>{lst?.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Home>
    )
}
