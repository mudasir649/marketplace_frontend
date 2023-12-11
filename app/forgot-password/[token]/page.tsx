"use client";
import { PlaylistAdd, RemoveRedEye } from "@mui/icons-material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useLoginMutation } from "@/store/userApiSlice";
import { setCredentials } from "@/store/authSlice";
import { useTranslation } from "react-i18next";

interface IData {
  email: string;
  password: string;
  confirmPassword: string;
  token: any;
}

export default function Page() {

  const { t } = useTranslation();
  const [login, { isLoading }] = useLoginMutation();
  const { email } = useSelector((state: any) => state.app);
  const { token } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [passwordInputType, setPasswordInputType] = useState('password');
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState('password');
  const [isVerified, setIsVerified] = useState<Boolean>(false);
  const [isTimerOver, setIsTimerOver] = useState<Boolean>(false);
  const [codeVerified, setCodeVerified] = useState<Boolean>(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [code, setCode] = useState<string>("");
  const [data, setData] = useState<IData>({
    email: email,
    password: "",
    confirmPassword: "",
    token: token,
  });

  const emptyToken = useCallback(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/empty-token?token=${token}`
    );
    console.log(res);
  }, [token]);

  const resetTimer: any = async () => {
    setIsTimerOver(true);
    emptyToken();
  };

  const checkToken = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/checkToken?token=${token}`
      );
      if (res.status === 200) {
        setIsVerified(true);
      }
    } catch (error: any) {
      if (error.response?.data?.success === false) {
        router.push(`/`);
      }
    }
  }, [token, router]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const verifyCode = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/verify-code/${code}`
      );
      if (res.status === 200) {
        setCodeVerified(true);
      }
    } catch (error: any) {
      toast(error.response.data?.message);
    }
  };

  const redirectLogin = async () => {
    const { password, email } = data;
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push('/')
    } catch (error: any) {
      console.log(error);
    }
  }

  const resetPassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { password, confirmPassword } = data;
    if (password === confirmPassword) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/reset-password`,
        data
      );
      if (res.status === 200) {
        toast(res.data?.message);
        router.push('/login')
        // await redirectLogin();
      }
    }
    setLoading(false);
  };

  const resendCode = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/forgot-password`,
        { email }
      );
      const token = res.data?.data;

      if (res.status === 200) {
        router.push(`/forgot-password/${token}`);
      }
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };

  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    setPasswordInputType((prevState: any) => prevState === 'password' ? 'text' : 'password');
  }


  const showConfirmPassword = () => {
    setConfirmPasswordInputType((prevType: any) => prevType === 'password' ? 'text' : 'password');
  }

  if (isVerified === true) {
    return (
        <div className="container mx-auto my-10">
          <div className="bg-white p-4">
            <div className="container mx-auto">
              <h1 className="space-x-3 border-b-2 pb-3">
                <PlaylistAdd className="text-[#FF0000] mt-[-4px]" />
                <span className="text-lg font-semibold capitalize">
                  {t(`forgot-password.formToReset`)}
                </span>
              </h1>
              <h1 className="text-md pt-5"></h1>
              {codeVerified ? (
                <form method="POST" onSubmit={resetPassword}>
                  <div>
                    <h1 className="text-md font-bold mt-5">Password:</h1>
                    <div className="border border-md border-gray-300 hover:border-[#FF0000] focus:outline-[#FF0000] flex justify-between">
                    <input
                      type={passwordInputType}
                      value={data.password}
                      name="password"
                      placeholder="Enter password"
                      className="w-full focus:outline-none p-2"
                      ref={passwordRef}
                      onChange={(e) => handleData(e)}
                    />
                    <div className="bg-gray-200 hover:bg-gray-300 w-10 px-2 py-1 cursor-pointer" onClick={showPassword}>
                      <RemoveRedEye className={`${passwordInputType === "text" ? "text-gray-400" : ''} hover:text-gray-400`} />
                    </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-md font-bold mt-5">
                      Confirm Password:
                    </h1>
                    <div className="border border-md border-gray-300 hover:border-[#FF0000] focus:outline-[#FF0000] flex justify-between">
                    <input
                      type={confirmPasswordInputType}
                      value={data.confirmPassword}
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                      className="w-full focus:outline-none p-2"
                      onChange={(e) => handleData(e)}
                    />
                    <div className="bg-gray-200 hover:bg-gray-300 w-10 px-2 py-1 cursor-pointer" onClick={showConfirmPassword}>
                      <RemoveRedEye className={`${confirmPasswordInputType === "text" ? "text-gray-400" : ''} hover:text-gray-400`} />
                    </div>
                    </div>
                  </div>
                  {isLoading ? 
                    <div className="spinner mt-8 w-10 h-10"></div>
                  :
                  <button className="bg-[#FF0000] text-white hover:bg-red-700 border-2 border-[#FF0000] hover-text-black p-2 mt-4 font-semibold rounded-sm">
                    {t('forgot-password.updatePassword')}
                  </button>
  }
                </form>
              ) : (
                <>
                  <form method="POST" onSubmit={verifyCode}>
                    {!isTimerOver ? 
                    <>
                    <h1 className="text-md font-bold mt-5">
                    {t('forgot-password.codeToReset')}
                    </h1>
                    <input
                      type="text"
                      value={code}
                      className="w-full border border-md border-gray-300 hover:border-[#FF0000] focus:outline-[#FF0000] p-2 mt-3"
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="bg-[#FF0000] hover:bg-red-700 hover:border-red-700 text-white hover-bg-white border-2 border-[#FF0000] hover-text-black p-2 mt-4 font-semibold rounded-sm">
                            {t('forgot-password.resetPassword')}
                    </button>
                    <div className="flex justify-center text-center">
                      <CountdownCircleTimer
                        isPlaying
                        duration={60}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[7, 5, 2, 0]}
                        size={120}
                        onComplete={() => resetTimer()}
                      >
                        {({ remainingTime }) => remainingTime}
                      </CountdownCircleTimer>
                    </div>
                    </> : <div className="flex justify-center">
                    <button
                            className="bg-[#FF0000] hover:bg-red-700 text-white hover-bg-white border-2 border-[#FF0000] hover:border-red-700 p-2 mt-4 font-semibold rounded-sm"
                            onClick={resendCode}
                          >
                            {t('forgot-password.resendCode')}
                          </button>
                    </div>}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
    );
  }
}
