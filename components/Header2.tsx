"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ListDownComponent from "./ListDownComponent";
import { Add, ExpandMore, FormatListNumbered, Login, Logout, Person, Favorite, ChatBubbleOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import "./Header.css";
import Link from "next/link";
import { useLogoutMutation } from "@/store/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function Header2() {

    const [logoutApiCall, { isLoading }] = useLogoutMutation();
    const dispatch = useDispatch();
    const { t } = useTranslation(); // Initialize the translation hook
    const [navbar, setNavbar] = useState<Boolean>(false);
    const [open, isOpen] = useState<Boolean>(false);
    const router = useRouter();
    const { userInfo } = useSelector((state: any) => state.auth);
    const userId = userInfo?.data?.userDetails?._id;
    const { showContact } = useSelector((state: any) => state.app);
    const { showShare, showSellNow, showRepairNow, showDeleteAd, page } = useSelector((state: any) => state.app);
    const userData = userInfo?.data?.userDetails;
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = useCallback((event: MouseEvent) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
        isOpen(false);
      }
    }, [])

    useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      }
    }, [handleOutsideClick])


    const navbarLiStyle = navbar
    ? "cursor-pointer hover:text-[#FF0000]"
    : "cursor-pointer hover:text-white hover:bg-[#FF0000] hover:p-2 ease-linear duration-300 hover:rounded-md";


    const DropdownItem = ({ logo, text, href }: any) => {
        return (
          <li className="dropdownItem space-x-2 hover:text-[#FF0000]">
            <span>{logo}</span>
            <Link className='text-md font-semibold' href={href} onClick={() => isOpen(false)}>
              {text}
            </Link>
          </li>
        )
      }

      const logoutHandler = async () => {
        try {
          await logoutApiCall({}).unwrap();
          dispatch(logout(null));
          router.push('/')
        } catch (error: any) {
          toast(error?.data?.message)
        }
      }

  return (
    <header>
    <div className="container mx-auto flex justify-between space-x-10 items-center mb-5 mt-4">
    <Image
          src="/assets/eidcarosse_website_logo.png"
          alt="eidcarosse_logo"
          width={300}
          height={300}
          className="mt-1"
        />
      <div className="w-full flex">
        <ul className="flex flex-row p-5 text-md space-x-7">
          <li className={navbarLiStyle}>Home</li>
          <li className={navbarLiStyle}>Advance Search</li>
          <li className={navbarLiStyle}>Contact Us</li>
          <li className="text-black">
            <ListDownComponent />
          </li>
          <li className="cursor-pointer hover:text-[#FF0000]">
            <ChatBubbleOutline />
          </li>
        </ul>
        <ul className="flex flex-row p-2 space-x-7">
        <li>
          <Link href='/post-ad'>
            <button className="border border-white hover:border-[#FF0000] bg-white hover:bg-[#FF0000] hover:text-white drop-shadow-lg rounded-lg p-3 flex flex-row space-x-3">
              <section className="">
                <Add className="text-md border border-[#FF0000] rounded-full bg-[#FF0000] text-white" />
              </section>
              <section className="capitalize text-lg line-clamp-1 font-semibold">
                {t("header.postYourAd")}
              </section>
            </button>
          </Link>
          </li>
          <li>
            {userInfo !== null ? (
              <div className="mt-[-4px]" ref={dropdownRef}>
                <button
                  className="h-20 flex flex-row space-x-2"
                  onClick={() => isOpen(!open)}
                >
                  <Image
                    className="h-12 w-12 md:h-16 md:w-16 border-2 border-[#FF0000] rounded-full"
                    width={200}
                    height={200}
                    src={userData?.image}
                    alt="profile_image"
                  />
                  <ExpandMore
                    className={`logo mt-3 text-[#FF0000] ${open ? "active" : "inactive"}`}
                  />
                </button>
                <div className={`dropdown-menu bg-white shadow-lg ml-[-150px] w-64 ${open ? "active" : "inactive"}`}>
                    <div className="border-b-2 pb-2 w-full">
                        <h1 className="text-md text-gray-700">Hello,</h1>
                        <h4 className="text-lg font-semibold hover:text-[#FF0000] text-gray-700 cursor-pointer">{userData?.firstName}  {userData?.lastName}</h4>
                    </div>
                    <ul className="flex flex-col space-y-3 w-full text-gray-700">
                    <DropdownItem logo={<Person />} text={t('header.myProfile')} href="/my-profile" />
                    <DropdownItem logo={<FormatListNumbered />} text={t('header.myAds')} href="/my-ads" />
                    <DropdownItem logo={<Favorite />} text={t('header.favourites')} href="/my-favourites" />
                  </ul>
                  <ul className="flex flex-col space-y-5 border-t-2 pt-3 w-full text-gray-700" onClick={() => logoutHandler()}>
                    <DropdownItem logo={<Logout />} text={t('header.logout')} href="/" />
                  </ul>
                </div>
              </div>
            ) : (
                <Link href='/login'>
                <button
                className="border border-[#FF0000] bg-[#FF0000] hover:bg-white hover:border-white text-white hover:text-[#FF0000] drop-shadow-lg rounded-lg p-3 flex flex-row space-x-1"
                onClick={() => setNavbar(true)}
              >
                <section className="">
                  <Login className="text-md rounded-full" />
                </section>
                <section className="capitalize text-lg line-clamp-1 mt-[0.5px] font-semibold">
                  {t("header.login")}
                </section>
              </button>
                </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
    </header>
  );
}
