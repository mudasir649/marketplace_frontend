'use client';
import Home from '@/components/Home'
import { Cancel, InsertPhoto, Person } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import useWindowDimensions from '@/utils/useWindowDimensions';
import Image from 'next/image';


interface IData {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    phoneNo: Number,
    website: string,
    viber: any,
    whatsapp: any
}


export default function MyProfile() {

    const [data, setData] = useState<IData>({
        firstName: '',
        lastName: null || '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNo: null || 0,
        website: '',
        viber: null,
        whatsapp: null
    });
    const [image, setImage] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { width, height } = useWindowDimensions();

    const newWidth = width || null;
    const newHeight = height || null;

    const handleImage = (e: any) => {
        const file = e.target.files[0];
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    }

    const handleInput = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    }

    const style = {
        inputStyle: 'border border-gray-200 hover:border-red-500 focus:outline-red-500 w-full rounded-sm h-10 pl-3 mb-10',
        divStyle: 'flex flex-col md:flex-row space-x-0 md:space-x-20 space-y-1 md:space-y-0 mb-5 mt-5',
        h1Style: 'text-md font-bold w-48',
    }

    const cancelImage = () => {
        setImage('');
        setImageUrl('');
    }

    const handleLogo = () => {
        fileInputRef.current?.click();
    }


    return (
        <Home>
            <div className='container mx-auto mb-20'>
                <div className='border-none rounded-sm bg-white h-full p-3'>
                    <div className='flex justify-center border-b-2 pb-5'>
                        <h1 className='space-x-3'><Person className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Basic Information</span></h1>
                    </div>
                    {/* {image &&
                        <div className='flex justify-center mt-2'>
                            <Cancel className='absolute text-red-600 ml-[275px]' onClick={() => cancelImage()} />
                            <Image alt='image' src={imageUrl} width={300} height={300} />
                        </div>} */}
                    <div className='flex justify-center mt-5'>
                        <div className='h-40 w-40 border rounded-full relative'>
                            {!image ?
                                <><input type="file" className='mt-20 mx-5'
                                    accept='/*'
                                    ref={fileInputRef}
                                    value={image}
                                    style={{ display: 'none' }}
                                    onChange={(e: any) => handleImage(e)} /><div className='flex flex-row my-16 cursor-pointer text-red-600 space-x-1' onClick={() => handleLogo()}>
                                        <InsertPhoto className='ml-3' />
                                        <h1>Select Image</h1>
                                    </div></>
                                : <div className='flex justify-center mt-2'>
                                    <Cancel className='z-10 text-red-600 ml-[50px]' onClick={() => cancelImage()} />
                                    <Image className='border rounded-full' alt='image' src={imageUrl} layout='fill' />
                                </div>
                            }
                        </div>
                    </div>
                    <div className='container mx-0 mt-6 lg:mx-20 w-auto'>
                        <div className='flex flex-col md:flex-row space-x-0 md:space-x-32 space-y-1 md:space-y-0 mb-6'>
                            <h1 className='text-md font-bold'>Username</h1>
                            <div>
                                <h1 className='text-md mt-[0.5px] pl-0 md:pl-[15px]'>mudasir649</h1>
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>First Name</h1>
                            <input type="text" className={style.inputStyle}
                                name='firstName'
                                value={data?.firstName}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Last Name</h1>
                            <input type="text" className={style.inputStyle}
                                name='LastName'
                                value={data?.lastName}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Email</h1>
                            <input type="text" className={style.inputStyle}
                                name='email'
                                value={data?.email}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Password</h1>
                            <input type="text" className={style.inputStyle}
                                name='password'
                                value={data?.password}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Confirm Password</h1>
                            <input type="text" className={style.inputStyle}
                                name='confirmPassword'
                                value={data?.confirmPassword}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Whats App</h1>
                            <input type="text" className={style.inputStyle}
                                name='whatsApp'
                                value={data?.whatsapp}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Viber</h1>
                            <input type="text" className={style.inputStyle}
                                name='viber'
                                value={data?.viber}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Website</h1>
                            <input type="text" className={style.inputStyle}
                                name='website'
                                value={data?.website}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </Home>
    )
}
