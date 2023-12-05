"use client";
import { PlaylistAdd } from "@mui/icons-material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setEmail } from "@/store/appSlice";
import { useDispatch } from "react-redux";

function ForgotPassword() {
    const { t } = useTranslation();
    const { userInfo } = useSelector((state: any) => state.auth);
    const router = useRouter();
    const { email } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();

    
    useEffect(() => {
      if (userInfo !== null) {
          router.replace('/');
      }
  }, [userInfo, router])

    const resetPassword = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/forgot-password`, { email });
            const token = res.data?.data;
            if(res.status === 200){                
                router.push(`/forgot-password/${token}`)
            }
        } catch (error: any) {
            toast(error.response.data.message)
            
        }
    }

      return (
        <>
          <div className="container mx-auto my-10 mb-36">
            <div className="bg-white p-4">
              <div className="container mx-auto">
                <h1 className="space-x-3 border-b-2 pb-3">
                  <PlaylistAdd className="text-[#FF0000] mt-[-4px]" />
                <span className="text-lg font-bold capitalize">
                    {t('forgot-password.forgotPassword')}
                </span>
                </h1>
                <h1 className="text-md pt-5">
                    {t('forgot-password.description')}
                </h1>
                <form method="POST" onSubmit={resetPassword}>
                <h1 className="text-md font-bold mt-5">
                    Email:
                </h1>
                <input type="email" className="w-full border border-md border-gray-300 hover:border-[#FF0000] focus:outline-[#FF0000] p-2 mt-3" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} />
                <button className="bg-[#FF0000] text-white hover:bg-white border-2 border-[#FF0000] hover:text-black p-2 mt-4 font-semibold rounded-sm">{t('forgot-password.resetPassword')}</button>
                </form>
            </div>
            </div>
        </div>
        </>
      );
    }

export default ForgotPassword;
