'use client';
import Home from '@/components/Home'
import { Cancel, InsertPhoto, Person } from '@mui/icons-material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useWindowDimensions from '@/utils/useWindowDimensions';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { Theme } from '@mui/material';
import { setCredentials } from '@/store/authSlice';
import { refreshPage } from '@/store/appSlice';
import { useRouter } from 'next/navigation';

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
    firstName: string,
    lastName: string,
    phoneNo: any,
    website: string,
    viber: any,
    whatsapp: any
}


export default function MyProfile() {

    const classes = useStyles();
    const router = useRouter();
    const { userInfo } = useSelector((state: any) => state.auth);
    const { refresh } = useSelector((state: any) => state.app);

    useEffect(() => {
        if (userInfo === null) {
            router.push('/');
        }
    }, [userInfo, router])

    const userData = userInfo?.data?.userDetails;
    const [loading, setLoading] = useState<Boolean>(false);
    const [data, setData] = useState<IData>({
        firstName: '',
        lastName: '',
        phoneNo: '',
        website: '',
        viber: '',
        whatsapp: ''
    });
    const [image, setImage] = useState<string>('');
    const [showImage, setShowImage] = useState<Boolean>(false)
    const [imageUrl, setImageUrl] = useState<string>('');
    const [image1, setImage1] = useState<string>('');
    const [imageUrl1, setImageUrl1] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef1 = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const refreshMyProfile = useCallback(() => {
        if (refresh === true) {
            router.refresh();
        }
    }, [refresh, router])

    const { width, height } = useWindowDimensions();

    const newWidth = width || null;
    const newHeight = height || null;

    const handleImage = (e: any) => {
        const file = e.target.files[0];
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    }



    const handleImage1 = (e: any) => {
        const file = e.target.files[0];
        setImage1(file);
        setImageUrl1(URL.createObjectURL(file));
        setShowImage(true)
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

    const cancelImage1 = () => {
        setShowImage(false)
        setImage1('');
        setImageUrl1('');
    }

    const handleLogo = () => {
        fileInputRef.current?.click();
    }

    const handleLogo1 = () => {
        fileInputRef1.current?.click();
    }

    const updateProfile = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (!image && !image1) {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/userProfile/${userData?.id}`, data);
            if (res.data?.status === 200) {
                toast(res?.data?.message);
            }
        } else {
            const formData = new FormData();
            if (image) {
                formData.append('file', image);
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        formData.append(key, data[key as keyof IData]);
                    }
                }
            }
            if (image1) {
                formData.append('file', image1);
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        formData.append(key, data[key as keyof IData]);
                    }
                }
            }
            try {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/userProfile/${userData?.id}`, formData);
                if (res.status === 200) {
                    toast('user profile updated successfully');
                    dispatch(setCredentials(res?.data));
                    dispatch(refreshPage(true))
                    setLoading(false);
                    refreshMyProfile();
                }
            } catch (error: any) {
                console.log(error);
                setLoading(false)
            }
        }
        setLoading(false);
    }


    return (
        <Home>
            <div className='container mx-auto mb-20'>
                <ToastContainer />
                <div className='border-none rounded-sm bg-white h-full p-3'>
                    <div className='flex justify-center border-b-2 pb-5'>
                        <h1 className='space-x-3'><Person className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Basic Information</span></h1>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <div className='h-40 w-40 border rounded-full relative'>
                            {showImage ?
                                <div className='flex justify-center mt-2'>
                                    <Cancel className='z-10 text-red-600 ml-[100px]' onClick={() => cancelImage1()} />
                                    <Image className='border rounded-full' alt='image' src={imageUrl1} layout='fill' />
                                </div>
                                : userData?.image ?
                                    <Image className='border rounded-full' alt='image' src={userData?.image} layout='fill' />
                                    :
                                    <>
                                        {!image ? <><input type="file" className='mt-20 mx-5'
                                            accept='/*'
                                            ref={fileInputRef}
                                            value={image}
                                            style={{ display: 'none' }}
                                            onChange={(e: any) => handleImage(e)} /><div className='flex flex-row my-16 cursor-pointer text-red-600 space-x-1' onClick={() => handleLogo()}>
                                                <InsertPhoto className='ml-3' />
                                                <h1>Select Image</h1>
                                            </div></> :
                                            <div className='flex justify-center mt-2'>
                                                <Cancel className='z-10 text-red-600 ml-[100px]' onClick={() => cancelImage()} />
                                                <Image className='border rounded-full' alt='image' src={imageUrl} layout='fill' />
                                            </div>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                    {userData?.image && <div className='flex justify-center mt-4'>
                        <input type="file" className='mt-20 mx-5'
                            accept='/*'
                            ref={fileInputRef1}
                            value={image}
                            style={{ display: 'none' }}
                            onChange={(e: any) => handleImage1(e)} />
                        <button className='h-10 w-auto bg-red-600 text-white font-semibold p-2' onClick={() => handleLogo1()}>Upload Picture</button>
                    </div>
                    }
                    <div className='container mx-0 mt-6 lg:mx-20 w-auto'>
                        <div className='flex flex-col md:flex-row space-x-0 md:space-x-32 space-y-1 md:space-y-0 mb-6'>
                            <h1 className='text-md font-bold'>Username</h1>
                            <div>
                                <h1 className='text-md mt-[0.5px] pl-0 md:pl-[15px]'>{userData?.username}</h1>
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>First Name</h1>
                            <input type="text" className={style.inputStyle}
                                name='firstName'
                                placeholder={userData?.firstName}
                                value={data?.firstName}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Last Name</h1>
                            <input type="text" className={style.inputStyle}
                                name='lastName'
                                placeholder={userData?.lastName}
                                value={data?.lastName}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Phone</h1>
                            <input type="text" className={style.inputStyle}
                                name='phoneNo'
                                value={data?.phoneNo}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Whats App</h1>
                            <input type="text" className={style.inputStyle}
                                name='whatsapp'
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
                        <div className={style.divStyle}>
                            <h1 className={`${style.h1Style} invisible`}>submit</h1>
                            {loading ?
                                <div className={classes.root}>
                                    <CircularProgress color="secondary" />
                                </div>
                                :
                                <div className='flex flex-col w-full'>
                                    <button className='bg-red-600 hover:bg-red-800 w-32 h-10 text-white font-bold' onClick={(e: any) => updateProfile(e)}>Submit</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Home>
    )
}
