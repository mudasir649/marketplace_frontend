import { Cancel, Email, Person, Title } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';
import signLogo from "../public/assets/signLogo.png";
import Image from 'next/image';


export default function ContactUs({ setShowContact }: any) {
    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-opacity-100 backdrop-blur-sm z-10 overflow-y-scroll`}>
            <div className='container mx-10 w-[800px] h-auto mt-12 bg-white shadow-3xl border rounded-lg'>
                <div className='flex justify-end'>
                    <button className='text-white text-xl lg:mr-[-30px]' onClick={() => setShowContact(false)}>
                        <Cancel className='text-[#e52320]' />
                    </button>
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
                        <h1 className='flex justify-center text-2xl font-bold'>Contact Us</h1>
                        <div className='flex flex-row border border-gray-200 hover:border-[#e52320] focus:border-[#e52320]
                                    cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                            <Person className='text-[#e52320]' />
                            <input className='border-none w-full bg-transparent focus:outline-none mt-[1px]' type="text" placeholder='Name*' />
                        </div>
                        <div className='flex flex-row border border-gray-200 hover:border-[#e52320] focus:outline-[#e52320]
                                cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                            <Email className='text-[#e52320]' />
                            <input className='border-none w-full bg-transparent focus:outline-none mt-[1px]' type="email" placeholder='Email*' />
                        </div>
                        <div className='flex flex-row border border-gray-200 hover:border-[#e52320] focus:outline-[#e52320]
                                    cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                            <Title className='text-[#e52320]' />
                            <input className='border-none w-full bg-transparent focus:outline-none mt-[1px]' type="text" placeholder='Subject*' />
                        </div>
                        <textarea className='flex flex-row border border-gray-200 hover:border-[#e52320] 
                                cursor-pointer focus:outline-[#e52320] rounded-md h-52 w-64 md:w-96 space-x-4 p-2 bg-gray-100'
                            maxLength={250}
                            placeholder='Message*'
                            style={{ resize: "none" }}
                        />
                        <div className='flex justify-center font-bold'>
                            <button className='border border-red-500 bg-gradient-to-r from-red-300 to-[#e52320] hover:border-[#e52320] hover:from-red-600 hover:to-red-600 rounded-lg w-40 p-1 space-x-2 text-white mb-8'>
                                <span>Submit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
