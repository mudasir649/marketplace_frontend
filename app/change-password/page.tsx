'use client';
import Home from '@/components/Home'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


interface IData {
    oldPassword: string,
    newPassword: string,
    confirmPassword: any,
}


export default function MyProfile() {

    const router = useRouter();
    const { userInfo } = useSelector((state: any) => state.auth);
    const userId = userInfo?.data?.userDetails?._id;
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
        setLoading(true)
        if(data.newPassword === data.confirmPassword){
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/change-password/${userId}`, data);                
                if(res?.status === 200){
                    toast(res.data?.message);
                }
            } catch (error: any) {                
                if (error.response.data && error.response.data.errors) {
                    // If there are validation errors returned by the server
                    const errorMessages = error.response.data.errors.map((err: any) => err.path);        
                    // You can display each error message to the user
                    errorMessages.forEach((errorMsg: string) => {
                      toast(`${errorMsg} is invalid. Please! enter valid value`, { type: 'error' });
                    });
                  }else if(error.response.data && error.response.data.message){
                    toast(`${error.response.data.message}`, { type: 'error' });
                  } else {
                    // Handle other types of errors
                    toast('An error occurred. Please try again later.', { type: 'error' });
                  }
            }
        }else{
            toast('Password and Confirm Password is not same.')
        }
        setLoading(false);
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
                                name='newPassword'
                                value={data?.newPassword}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={style.divStyle}>
                            <h1 className={style.h1Style}>Confirm Password</h1>
                            <input type="password" className={style.inputStyle}
                                name='confirmPassword'
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
