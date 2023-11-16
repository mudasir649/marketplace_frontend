"use client";
import Home from "@/components/Home";
import { setCredentials } from "@/store/authSlice";
import { PlaylistAdd } from "@mui/icons-material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Page() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const [code, setCode] = useState<any>("");
  const { email } = useSelector((state: any) => state.app);
  const [isVerified, setIsVerified] = useState<Boolean>(false);
  const [isTimerOver, setIsTimerOver] = useState<Boolean>(false);
  const { token } = useParams();

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

  const verifyAccount = async (e: any) => {
    e.preventDefault();
    const data = {
      code: code,
      email: email,
      token1: token
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/verify-account`,
        data
      );
      if (res.status === 200) {
        toast(res.data?.message);        
        dispatch(setCredentials({ ...res.data }))
        router.push("/");
      }
    } catch (error: any) {
      toast(error.data?.message);
    }
  };

  const resendCode = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/forgot-password`,
        { email }
      );
      const token = res.data?.data;

      if (res.status === 200) {
        router.push(`/verify-account/${token}`);
      }
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };

  if (isVerified === true) {
    return (
      <>
        <div className="container mx-auto my-10">
          <div className="bg-white p-4">
            <div className="container mx-auto">
              <h1 className="space-x-3 border-b-2 pb-3">
                <PlaylistAdd className="text-[#FF0000] mt-[-4px]" />
                <span className="text-lg font-bold capitalize">
                  Verify Account
                </span>
              </h1>
              {isTimerOver ? (
                <div className="text-center">
                <button
                  className="bg-[#FF0000] text-white hover:bg-white border-2 border-[#FF0000] hover:text-black p-2 mt-4 font-semibold rounded-sm"
                  onClick={resendCode}
                >
                  {t("forgot-password.resendCode")}
                </button>
                </div>
              ) : (
                <form method="POST" onSubmit={verifyAccount} className="text-center">
                  <h1 className="text-md font-bold mt-5">Enter Code:</h1>
                  <input
                    type="text"
                    className="w-full border border-md border-gray-300 hover:border-[#FF0000] focus:outline-[#FF0000] p-2 mt-3"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter verification code to verify account..."
                  />
                  <button className="bg-[#FF0000] text-white hover:bg-white border-2 border-[#FF0000] hover:text-black p-2 mt-4 font-semibold rounded-sm">
                    {t("forgot-password.resetPassword")}
                  </button>
                  <div className="flex justify-center text-center mt-10">
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
                </form>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
