import { AccountCircle, Badge, Cancel, Https, Mail, PersonAdd, Phone } from '@mui/icons-material'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import googleLogo from "../public/assets/google_logo.png";
import signLogo from "../public/assets/signLogo.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '@/store/appSlice';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Signup() {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail1] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<Boolean>(false);

  const checkEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validEmail = regex.test(email);
    return validEmail;
  }

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!userName) {
      toast("Please! enter user name. username cannot be empty.");
      return;
    }
    if (email) {
      const isValid = checkEmail(email);
      if (!isValid) {
        return;
      }
    }
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password,
      phoneNumber
    }
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/register`, data);
      console.log(res);
      if(res.data?.success === true){
        dispatch(setEmail(email));      
        router.push(`/verify-account/${res.data?.data?.token}`);
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
    setLoading(false);
  }



  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-sopacity-100 backdrop-blur-sm overflow-y-scroll`}>
      <div className='container mx-10 w-[800px] h-auto bg-white shadow-3xl border rounded-lg mt-32 mb-10'>
        <div className='flex justify-end'>
          <Link href="/">
            <button className='text-white text-xl lg:mr-[-30px]'>
              <Cancel className='text-[#FF0000]' />
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
            <h1 className='flex justify-center text-2xl font-bold'>{t("signup.createAccount")}</h1>
            {/* First Name */}
            <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
              <AccountCircle className='text-[#FF0000] ml-5' />
              <input required={true}
                className="focus:outline-none w-96 p-1 overflow-hidden bg-transparent focus:bg-transparent"
                type="text"
                placeholder={t("signup.firstNamePlaceholder")}
                name='firstName'
                value={firstName}
                onChange={(e: any) => setFirstName(e.target.value)}
              />
            </div>
            {/* Last Name */}
            <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
              <AccountCircle className='text-[#FF0000] ml-5' />
              <input required={true}
                className="focus:outline-none w-96 p-1 overflow-hidden bg-transparent focus:bg-transparent"
                type="text"
                placeholder={t("signup.lastNamePlaceholder")}
                name='lastName'
                value={lastName}
                onChange={(e: any) => setLastName(e.target.value)}
              />
            </div>
            {/* Phone Number */}
            <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
              <Phone className='text-[#FF0000] ml-5' />
              <input required={true}
                className="focus:outline-none w-96 p-1 overflow-hidden bg-transparent focus:bg-transparent"
                type="text"
                placeholder={t("signup.phoneNumberPlaceholder")}
                name='phoneNumber'
                value={phoneNumber}
                onChange={(e: any) => setPhoneNumber(e.target.value)}
              />
            </div>
            {/* Username */}
            <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
              <AccountCircle className='text-[#FF0000] ml-5' />
              <input required={true}
                className="focus:outline-none w-96 p-1 overflow-hidden bg-transparent focus:bg-transparent"
                type="text"
                placeholder={t("signup.usernamePlaceholder")}
                name='username'
                value={userName}
                onChange={(e: any) => setUserName(e.target.value)}
              />
            </div>
            {/* Email */}
            <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
              <Mail className='text-[#FF0000] ml-5' />
              <input required={true}
                className="focus:outline-none w-96 p-1 overflow-hidden bg-transparent focus:bg-transparent"
                type="text"
                placeholder={t("signup.emailPlaceholder")}
                name='email'
                value={email}
                onChange={(e: any) => setEmail1(e.target.value)}
              />
            </div>
            {/* Password */}
            <div className='flex flex-row border border-gray-200 hover:border-[#e52320] rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
              <Https className='text-[#FF0000] ml-5' />
              <input required={true}
                className="focus:outline-none w-96 p-1 overflow-hidden bg-transparent focus:bg-transparent"
                type="password"
                placeholder={t("signup.passwordPlaceholder")}
                name='password'
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex justify-center font-bold'>
              {!loading ? (
                <button className='border border-red-400 bg-gradient-to-r from-red-300 to-[#e52320] 
            hover:border-[#e52320] hover:from-red-600 hover:to-red-600 rounded-lg w-40 
            p-1 space-x-2 text-white' onClick={(e: any) => submitHandler(e)}>
                  <PersonAdd />
                  <span>{t("signup.registerButton")}</span>
                </button>
              ) : (
                <div className="spinner mt-8 w-10 h-10"></div>
              )}
            </div>
            <div className='flex justify-center font-bold'>{t("signup.or")}</div>
            {/* Continue with Google */}
            <button className='border flex flex-row justify-center py-2 space-x-2 border-gray-200 hover:bg-red-400 hover:text-white rounded-md h-10 w-64 md:w-96'>
              <Image
                src={googleLogo}
                alt='google-logo'
                width={25}
                height={25}
              />
              <span className='text-md font-semibold '>{t("signup.continueWithGoogle")}</span>
            </button>
            <div className='flex justify-center mb-20'>
              <h1>
                {t("signup.alreadyHaveAccount")}
                <Link href="/login">
                  <span className='text-[#FF0000] cursor-pointer hover:text-red-800'> {t("signup.login")}</span>
                </Link>
              </h1>
            </div>
            <div className='invisible'>flklf</div>
          </div>
        </div>
      </div>
    </div>
  )
}
