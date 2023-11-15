import { Cancel, Https, LoginSharp, Mail } from '@mui/icons-material'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import googleLogo from "../public/assets/google_logo.png";
import signLogo from "../public/assets/signLogo.png";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from "../store/authSlice"
import { useLoginMutation } from '@/store/userApiSlice';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { setEmail, setProdId } from '@/store/appSlice';


export default function LoginPage() {
  const { t } = useTranslation(); // Initialize the translation hook

  const [email, setEmail1] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  const data = userInfo === null ? null : userInfo?.userInfo?.data;

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push('/')
    } catch (error: any) {      
      dispatch(setEmail(email))
      toast(error?.data?.message);
      router.push(`verify-account/${error.data?.data}`)
    }
  }

  useEffect(() => {
    if (userInfo !== null) {
      dispatch(setProdId(userInfo?.data?.userDetails.favAdIds));
    }
  }, [userInfo, dispatch])

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-opacity-100 backdrop-blur-sm`}>
      <div className='container mx-10 w-[800px] h-[600px] bg-white shadow-3xl border rounded-lg'>
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
              <Image src={signLogo} alt="logo" width={100} height={100} />
            </div>
            <h1 className='flex justify-center text-2xl font-bold'>{t('login.login')}</h1>
            <button className='border flex flex-row justify-center py-2 space-x-2 border-gray-200 rounded-md h-10 w-64 md:w-96'>
              <Image src={googleLogo} alt='google-logo' width={25} height={25} />
              <span className='text-md font-semibold'>{t('login.continueWithGoogle')}</span>
            </button>
            <div className='flex justify-center font-bold'>{t('login.or')}</div>
            <div className='flex flex-row border border-gray-200 hover:border-[#e52320] cursor-pointer rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
              <Mail className='text-[#FF0000] ml-5' />
              <input
              type="email"
              placeholder={t('login.yourEmailAddress')}
              className="focus:outline-none w-96 p-1 overflow-hidden bg-transparent focus:bg-transparent"
              name='email'
              value={email}
              onChange={(e: any) => setEmail1(e.target.value)}
            />
            </div>
            <div className='flex flex-row border border-gray-200 hover:border-[#e52320] rounded-md h-10 w-64 md:w-96 space-x-4 p-2 bg-gray-100'>
              <Https className='text-[#FF0000] ml-5' />
              <input
                className="focus:outline-none w-96 p-1 overflow-hidden bg-transparent focus:bg-transparent"
                type='password'
                placeholder={t('login.yourPassword')}
                name='password'
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex justify-center font-bold'>
              {!isLoading ? (
                <button
                  className='border border-red-400 bg-gradient-to-r from-red-300 to-[#e52320] hover:border-[#e52320] hover:from-red-600 hover:to-red-600 rounded-lg w-40 p-1 space-x-2 text-white'
                  onClick={(e: any) => submitHandler(e)}
                >
                  <LoginSharp />
                  <span>{t('login.loginButton')}</span>
                </button>
              ) : (
                <div className='spinner mt-8 w-10 h-10'></div>
              )}
            </div>
            <div className='flex justify-center'>
              <h1>
                <Link href='/forgot-password'>
                  <span className='text-[#FF0000] cursor-pointer hover:text-red-800'>
                    {t('labels.forgotPassword')}
                  </span>
                </Link>
              </h1>
            </div>
            <div className='flex justify-center'>
              <h1>
                {t('login.notAMember')}{" "}
                <Link href='/signup'>
                  <span className='text-[#FF0000] cursor-pointer hover:text-red-800'>
                    {t('login.createAccount')}
                  </span>
                </Link>
              </h1>
            </div>
          </div>
        </div> </div>
    </div >
  )
}
