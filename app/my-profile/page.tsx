'use client';
import Home from '@/app/Home'
import { Cancel, Person } from '@mui/icons-material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { setCredentials } from '@/store/authSlice';
import { refreshPage } from '@/store/appSlice';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';



interface IData {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    whatsapp: string,
    viber: string
}


export default function MyProfile() {

    const { t } = useTranslation(); // Initialize the translation hook

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
        phoneNumber: '',
        whatsapp: '',
        viber: '',
    });
    const [showImage, setShowImage] = useState<Boolean>(false)
    const [image1, setImage1] = useState<string>('');
    const [imageUrl1, setImageUrl1] = useState<string>('');
    const fileInputRef1 = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const refreshMyProfile = useCallback(() => {
        if (refresh === true) {
            router.refresh();
        }
    }, [refresh, router])

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

    const cancelImage1 = () => {
        setShowImage(false)
        setImage1('');
        setImageUrl1('');
    }

    const handleLogo1 = () => {
        fileInputRef1.current?.click();
    }

    const updateProfile = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (!image1) {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/userProfile/${userData?._id}`, data);
            if (res?.status === 200) {
                toast(res?.data?.message);
                dispatch(setCredentials(res.data));
                dispatch(refreshPage(true))
                setLoading(false);
                refreshMyProfile();
            }
        } else {
            const formData = new FormData();
            formData.append('file', image1);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    formData.append(key, data[key as keyof IData]);
                }
            }
            try {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/userProfile/${userData?._id}`, formData);
                if (res.status === 200) {
                    toast(res?.data?.message);
                    dispatch(setCredentials(res.data));
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
        <>
            <div className='container mx-auto mb-20 mt-10'>
                <ToastContainer />
                <div className='border-none rounded-sm bg-white h-full p-3'>
                    <div className='flex justify-center border-b-2 pb-5'>
                        <h1 className='space-x-3'><Person className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>{t('myProfile.labels.basicInformation')}</span></h1>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <div className='h-40 w-40 border rounded-full relative'>
                            {showImage ?
                                <div className='flex justify-center mt-2'>
                                    <Cancel className='z-10 text-[#FF0000] ml-[100px]' onClick={() => cancelImage1()} />
                                    <Image className='border rounded-full' alt='image' src={imageUrl1} layout='fill' />
                                </div>
                                : <Image className='border rounded-full' alt='image' src={userData?.image} layout='fill' />
                            }
                        </div>
                    </div>
                    {userData?.image && <div className='flex justify-center mt-4'>
                        <input type="file" className='mt-20 mx-5'
                            accept="image/png, image/jpeg"
                            ref={fileInputRef1}
                            style={{ display: 'none' }}
                            onChange={(e: any) => handleImage1(e)} />
                        <button className='h-10 w-auto bg-[#FF0000] hover:bg-red-700 text-white font-semibold p-2' onClick={() => handleLogo1()}>{t('myProfile.buttons.uploadPicture')}</button>
                    </div>
                    }
                    <div className='container mx-0 mt-6 lg:mx-20 w-auto'>
                        <div className='flex flex-col md:flex-row space-x-0 md:space-x-32 space-y-1 md:space-y-0 mb-6'>
                            <h1 className='text-md font-bold'>{t('myProfile.labels.username')}</h1>
                            <div>
                                <h1 className='text-md mt-[0.5px] pl-0 md:pl-[15px]'>{userData?.userName}</h1>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row space-x-0 md:space-x-32 space-y-1 md:space-y-0 mb-6'>
                            <h1 className='text-md font-bold'>{t('myProfile.labels.email')}</h1>
                            <div>
                                <h1 className='text-md mt-[0.5px] pl-0 md:pl-[52px]'>{userData?.email}</h1>
                            </div>
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>{t('myProfile.labels.firstName')}</h1>
                            <input type="text" className={style.inputStyle}
                                name='firstName'
                                placeholder={userData?.firstName}
                                value={data?.firstName}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>{t('myProfile.labels.lastName')}</h1>
                            <input type="text" className={style.inputStyle}
                                name='lastName'
                                placeholder={userData?.lastName}
                                value={data?.lastName}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>{t('myProfile.labels.phone')}</h1>
                            <input type="text" className={style.inputStyle}
                                name='phoneNumber'
                                placeholder={userData?.phoneNumber}
                                value={data?.phoneNumber}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Whatsapp</h1>
                            <input type="text" className={style.inputStyle}
                                name='whatsapp'
                                placeholder={userData?.whatsapp}
                                value={data?.whatsapp}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Viber</h1>
                            <input type="text" className={style.inputStyle}
                                name='viber'
                                placeholder={userData?.viber}
                                value={data?.viber}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={`${style.h1Style} invisible`}>{t('myProfile.labels.submit')}</h1>
                            {loading ?
                                <div className="spinner mt-8 w-10 h-10"></div>
                                :
                                <div className='flex flex-col w-full'>
                                    <button className='bg-[#FF0000] hover:bg-red-800 w-32 h-10 text-white font-bold' onClick={(e: any) => updateProfile(e)}>{t('myProfile.labels.submit')}</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
