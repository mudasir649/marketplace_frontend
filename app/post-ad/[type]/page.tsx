'use client';
import Home from '@/components/Home';
import { ArrowForwardIos, Description, FormatListBulleted, Image, InsertLink, LinkOff, LinkOffOutlined, Person, PlaylistAdd } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';

export default function Addtype() {


    const handleInput = (e: any) => {
        console.log(e);
    }

    const style = {
        inputStyle: 'border border-gray-200 hover:border-red-500 focus:outline-red-500 w-full rounded-sm h-10 pl-3',
        divStyle: 'flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-1 md:space-y-0 mb-5 mt-5',
        h1Style: 'text-md font-bold w-40 mt-1',
    }

    return (
        <Home>
            <div className='container mx-auto'>
                <div className='border-none rounded-sm shadow-2xl h-full p-3'>
                    <div className='container mx-auto'>
                        <h1 className='space-x-3 border-b-2 pb-3'><PlaylistAdd className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Select Category</span></h1>
                    </div>
                    <div className=' container mx-auto flex flex-col mb-7'>
                        <div className='flex flex-row space-x-2 mt-5'>
                            <h1>{`autos`}</h1>
                            <ArrowForwardIos className='text-[12px] mt-[6.5px]' />
                            <h1 className='text-red-600 underline'>
                                <Link href="/post-ad">
                                    {'Change categroy'}
                                </Link>
                            </h1>
                        </div>
                        <div className='mt-5 w-full mb-5'>
                            <h1 className='space-x-3 border-b-2 pb-3'><Description className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Product Information</span></h1>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Title <span className='text-red-600'>*</span></h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <p className='text-gray-300 italic'>Character limit 25</p>
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Pricing <span className='text-red-600'>*</span></h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Price{`[CHF]`} <span className='text-red-600'>*</span></h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Condition <span className='text-red-600'>*</span></h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <p className='text-gray-300 italic'>Character limit 25</p>
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Brand <span className='text-red-600'>*</span></h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <p className='text-gray-300 italic'>Character limit 25</p>
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Description <span className='text-red-600'>*</span></h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <p className='text-gray-300 italic'>Character limit 25</p>
                            </div>
                        </div>
                        <div className='mt-5 w-full mb-5'>
                            <h1 className='space-x-3 border-b-2 pb-3'><FormatListBulleted className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Features</span></h1>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Features List</h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <div className='text-gray-300 italic'>
                                    <ul className='text-gray-400 italic text-sm'>
                                        <li>Write a feature in each line eg.</li>
                                        <li>Feature 1</li>
                                        <li>Feature 2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 w-full mb-5'>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <h1 className='space-x-3 border-b-2 pb-3'><Image className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Images</span></h1>
                        </div>
                        <div className={style.divStyle}>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <div className='bg-red-300 mt-4 p-2 border-none rounded-sm italic'>
                                    <ul className='italic text-sm space-y-2'>
                                        <li>Recommended image size to (870x493)px.</li>
                                        <li>Image maximum size 2 MB.</li>
                                        <li>Allowed image type (png, jpg, jpeg, webp).</li>
                                        <li>You can upload up to 5 images.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 w-full mb-5'>
                            <h1 className='space-x-3 border-b-2 pb-3'>
                                <InsertLink className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Video URL</span></h1>
                        </div>
                        <div className={style.divStyle}>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    placeholder='Only Youtube or Video Url'
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <p className='text-gray-300 text-sm mt-1'>
                                    E.g. https://www.youtube.com/watch?v=RiXdDGk_XCU, https://vimeo.com/620922414
                                </p>
                            </div>
                        </div>
                        <div className='mt-5 w-full mb-5'>
                            <h1 className='space-x-3 border-b-2 pb-3'>
                                <Person className='text-red-600 mt-[-4px]' />
                                <span className='text-lg font-bold'>Contact details</span></h1>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Location</h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Phone</h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>WhatsApp No</h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <p className='text-gray-400 text-sm mt-1'>
                                    Whatsapp number with your country code. e.g.+41xxxxxxxxxx
                                </p>
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Viber Number</h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <p className='text-gray-400 text-sm mt-1'>Viber number with your country code. e.g.+41xxxxxxxxxx</p>
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Email</h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Website</h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                                <p className='text-gray-400 text-sm'>e.g. https://example.com</p>
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>How to contact</h1>
                            <div className='flex flex-col w-full'>
                                <input type="text" className={style.inputStyle}
                                    name='firstName'
                                    value=''
                                    onChange={(e: any) => handleInput(e)} />
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={`${style.h1Style} invisible`}>ffj</h1>
                            <div className='flex flex-col w-full'>
                                <button className='bg-red-600 hover:bg-red-800 w-32 h-10 text-white font-bold'>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Home>
    )
}
