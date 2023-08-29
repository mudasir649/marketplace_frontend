import { Cancel, Google, Https, LoginSharp, Mail } from '@mui/icons-material'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import googleLogo from "../public/assets/google_logo.png";
import signLogo from "../public/assets/signLogo.png";
import useWindowDimensions from '@/utils/useWindowDimensions';

export default function LoginPage() {

    const { width, height } = useWindowDimensions();

    console.log(width);
    console.log(height);

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-opacity-100 backdrop-blur-sm`}>
            <div className='container mx-10 w-[800px] h-[600px] bg-white shadow-3xl border rounded-lg'>
                <div className='flex justify-end'>
                    <Link href="/">
                        <button className='text-white text-xl lg:mr-[-30px]'>
                            <Cancel className='text-[#e52320]' />
                        </button>
                    </Link>
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
                        <h1 className='flex justify-center text-2xl font-bold'>Login</h1>
                        <button className='border flex flex-row justify-center py-2 space-x-2 border-gray-200 rounded-md h-10 w-64 md:w-96'>
                            {/* <Google className='text-blue-400' /> */}
                            <Image
                                src={googleLogo}
                                alt='google-logo'
                                width={25}
                                height={25}
                            />
                            <span className='text-md font-semibold '>Continue with google</span>
                        </button>
                        <div className='flex justify-center font-bold'>or</div>
                        <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                            <Mail className='text-[#e52320] ml-5' />
                            <input className='border-none bg-transparent focus:outline-none' type="text" placeholder='Your email address' />
                        </div>
                        <div className='flex flex-row border border-gray-200 hover:border-[#e52320] rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                            <Https className='text-[#e52320] ml-5' />
                            <input className='border-none bg-transparent focus:outline-none' type="text" placeholder='Your password' />
                        </div>
                        <div className='flex justify-center font-bold'>
                            <button className='border border-red-400 bg-gradient-to-r from-red-300 to-[#e52320] hover:border-[#e52320] hover:from-red-600 hover:to-red-600 rounded-lg w-40 p-1 space-x-2 text-white'>
                                <LoginSharp />
                                <span>Login</span>
                            </button>
                        </div>
                        <div className='flex justify-center'>
                            <h1>Not a member?
                                <Link href="/signup">
                                    <span className='text-[#e52320] cursor-pointer hover:text-red-800'> Create Account</span>
                                </Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
