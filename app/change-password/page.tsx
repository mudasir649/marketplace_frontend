'use client';
import Home from '@/components/Home'
import { Cancel, Person } from '@mui/icons-material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { setCredentials } from '@/store/authSlice';
import { refreshPage } from '@/store/appSlice';
import { useRouter } from 'next/navigation';


interface IData {
    oldPassword: string,
    newPassword: string,
    confirmPassword: any,
}


export default function MyProfile() {

    const router = useRouter();
    const { userInfo } = useSelector((state: any) => state.auth);
    const { refresh } = useSelector((state: any) => state.app);

    useEffect(() => {
        if (userInfo === null) {
            router.push('/');
        }
    }, [userInfo, router])

    const [loading, setLoading] = useState<Boolean>(false);
    const [data, setData] = useState<IData>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const dispatch = useDispatch();

    const refreshMyProfile = useCallback(() => {
        if (refresh === true) {
            router.refresh();
        }
    }, [refresh, router])

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

    const updateProfile = async (e: any) => {
        e.preventDefault();
        
    }


    return (
        <Home>
            <div className='container mx-auto mb-20 mt-10'>
                <ToastContainer />
                <div className='border-none rounded-sm bg-white h-full p-3'>
                    <div className='container mx-0 mt-6 lg:mx-20 w-auto'>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Old Password</h1>
                            <input type="password" className={style.inputStyle}
                                name='oldPassword'
                                value={data?.oldPassword}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>New Password</h1>
                            <input type="password" className={style.inputStyle}
                                name='lastName'
                                value={data?.newPassword}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Confirm Password</h1>
                            <input type="password" className={style.inputStyle}
                                name='phoneNumber'
                                value={data?.confirmPassword}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={`${style.h1Style} invisible`}>submit</h1>
                            {loading ?
                                <div className="spinner mt-8 w-10 h-10"></div>
                                :
                                <div className='flex flex-col w-full'>
                                    <button className='bg-[#FF0000] hover:bg-red-800 w-32 h-10 text-white font-bold' onClick={(e: any) => updateProfile(e)}>Submit</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Home>
    )
}
