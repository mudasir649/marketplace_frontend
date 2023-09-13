'use client';
import Home from '@/components/Home'
import { Cancel, InsertPhoto, Person } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import useWindowDimensions from '@/utils/useWindowDimensions';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);


interface IData {
    userId: string,
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

    const classes = useStyles();
    const { userInfo } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState<Boolean>(false);
    const [data, setData] = useState<IData>({
        userId: userInfo?.data?.userId,
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

    const updateProfile = async (e: any) => {
        e.preventDefault();
        setLoading(false);
        if (!image) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/userProfile`, data);
            if (res.data?.status === 200) {
                toast(res?.data?.message);
            }
        } else {
            const formData = new FormData();
            formData.append('file', image);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    formData.append(key, data[key as keyof IData]);
                }
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/userProfile`, data);
            if (res.data?.status === 200) {
                toast(res?.data?.message);
            }
        }
        setLoading(false);
    }


    return (
        <Home>
            <div className='container mx-auto mb-20'>
                <div className='border-none rounded-sm bg-white h-full p-3'>
                    <div className='flex justify-center border-b-2 pb-5'>
                        <h1 className='space-x-3'><Person className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Basic Information</span></h1>
                    </div>
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
                        {!loading ?
                            <div className={style.divStyle}>
                                <h1 className={`${style.h1Style} invisible`}>submit</h1>
                                <div className='flex flex-col w-full'>
                                    <button className='bg-red-600 hover:bg-red-800 w-32 h-10 text-white font-bold' onClick={(e: any) => updateProfile(e)}>Submit</button>
                                </div>
                            </div>
                            :
                            <div className={classes.root}>
                                <CircularProgress color="secondary" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Home>
    )
}
