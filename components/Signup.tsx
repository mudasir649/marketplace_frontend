import { AccountCircle, Badge, Cancel, Https, Mail, PersonAdd } from '@mui/icons-material'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import googleLogo from "../public/assets/google_logo.png";
import signLogo from "../public/assets/signLogo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core';

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

export default function Signup() {

    const [name, setName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<Boolean>(false);
    const classes = useStyles();

    const checkEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const validEmail = regex.test(email);
        return validEmail;
    }

    const checkPassword = (password: string) => {
        const regex = /^.{8,}$/;
        const validPasswrd = regex.test(password);
        return validPasswrd;
    }


    const submitHandler = async (e: any) => {
        e.preventDefault();
        if (!name) {
            toast("Please! enter full name. full name cannot be empty.");
        }
        if (!userName) {
            toast("Please! enter user name. username cannot be empty.");
        }
        if (!email) {
            toast("Please! enter email. email cannot be empty.");
        }
        if (!password) {
            toast("Please! enter user name. password cannot be empty.");
        }
        if (email) {
            const isValid = checkEmail(email);
            if (!isValid) {
                return;
            }
        }
        if (password) {
            const isValid = checkPassword(password);
            if (!isValid) {
                return;
            }
        }
        try {
            setLoading(true)
            const data: any = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/register`, {
                name,
                userName,
                email,
                password
            });

            if (data?.status == 200) {
                toast(data?.data?.message)
                setLoading(false);
            }
        } catch (error: any) {
            if (error?.response?.status == 400) {
                console.log(error?.response?.data?.message);
                toast(error?.response?.data?.message);
                setLoading(false);
            }
            if (error?.status == 500) {
                console.log(error);
            }
        }
        setLoading(false)
    }


    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-sopacity-100 backdrop-blur-sm`}>
            <div className='container mx-10 w-[800px] h-auto bg-white shadow-3xl border rounded-lg'>
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
                        <h1 className='flex justify-center text-2xl font-bold'>Create Account</h1>
                        <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                            <Badge className='text-[#e52320] ml-5' />
                            <input required={true}
                                className='border-none bg-transparent focus:outline-none'
                                type="text" placeholder='Enter your full name'
                                name="name"
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                            <AccountCircle className='text-[#e52320] ml-5' />
                            <input required={true}
                                className='border-none bg-transparent focus:outline-none'
                                type="text"
                                placeholder='Enter your username'
                                name='username'
                                value={userName}
                                onChange={(e: any) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                            <Mail className='text-[#e52320] ml-5' />
                            <input required={true}
                                className='border-none bg-transparent focus:outline-none'
                                type="text"
                                placeholder='Enter your email address'
                                name='email'
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row border border-gray-200 hover:border-[#e52320] rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
                            <Https className='text-[#e52320] ml-5' />
                            <input required={true}
                                className='border-none bg-transparent focus:outline-none'
                                type="password"
                                placeholder='Enter your password'
                                name='password'
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center font-bold'>
                            {!loading ? <button className='border border-red-400 bg-gradient-to-r from-red-300 to-[#e52320] 
                                hover:border-[#e52320] hover:from-red-600 hover:to-red-600 rounded-lg w-40 
                                p-1 space-x-2 text-white' onClick={(e: any) => submitHandler(e)}>
                                <PersonAdd />
                                <span>Register</span>
                            </button>
                                :
                                <div className={classes.root}>
                                    <CircularProgress color="secondary" />
                                </div>}
                        </div>
                        <div className='flex justify-center font-bold'>or</div>
                        <button className='border flex flex-row justify-center py-2 space-x-2 border-gray-200 hover:bg-red-400 hover:text-white rounded-md h-10 w-64 md:w-96'>
                            <Image
                                src={googleLogo}
                                alt='google-logo'
                                width={25}
                                height={25}
                            />
                            <span className='text-md font-semibold '>Continue with google</span>
                        </button>
                        <div className='flex justify-center mb-20'>
                            <h1>Already have account?
                                <Link href="/login">
                                    <span className='text-[#e52320] cursor-pointer hover:text-red-800'> Login</span>
                                </Link></h1>
                        </div>
                        <div className='invisible'>flklf</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
