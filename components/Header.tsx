'use client';
import { Add, AddAPhoto, AdminPanelSettings, ArrowDropDown, Cancel, Chat, Checklist, ExpandMore, Favorite, FormatListNumbered, Login, Logout, Person, PlusOne, Sms } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';
import ListDownComponent from "./ListDownComponent";
import ContactUs from "./ContactUs";
import useWindowDimensions from "@/utils/useWindowDimensions";

export default function Header() {

  const [navbar, setNavbar] = useState<Boolean>(false);
  const [showContact, setShowContact] = useState(false);
  const navbarLiStyle = navbar ? 'cursor-pointer hover:text-[#e52320]' : 'cursor-pointer hover:p-2 hover:border hover:rounded-md hover:bg-white hover:text-red-600 font-[600] ease-in duration-150';
  const [open, isOpen] = useState<Boolean>(false);
  const [userLogged, setUserLogged] = useState<Boolean>(true);

  const handleContact = () => {
    setShowContact(true);
    setNavbar(false);
  }

  const DropdownItem = ({ logo, text, href }: any) => {
    return (
      <li className="dropdownItem space-x-2 hover:text-red-600">
        <span>{logo}</span>
        <Link className='text-md font-semibold' href={href} onClick={() => isOpen(false)}>
          {text}
        </Link>
      </li>
    )
  }

  const { width, height } = useWindowDimensions();
  const newWidth = width || 0;
  const newHeight = height || 0;


  return (
    <>
      {navbar &&
        <div className="h-[800px] w-96 absolute z-10 bg-white">
          <ul className="flex flex-col space-y-5 uppercase m-7">
            <li className={navbarLiStyle}>
              <Link href="/" onClick={() => setNavbar(false)}>
                home
              </Link>
            </li>
            <li className={navbarLiStyle} >
              <Link href="/advance-search" onClick={() => setNavbar(false)}>
                advance search
              </Link>
            </li>
            <li className={navbarLiStyle} onClick={handleContact}>contact us</li>
            <li>
              <ListDownComponent />
            </li>
            <li className={navbarLiStyle}><Chat className="text-3xl -mt-1" /></li>
            <li className={navbarLiStyle}><AdminPanelSettings className="text-3xl -mt-1" /></li>
            <li className="cursor-pointer">
              <Link href="/login">
                <button className="flex flex-row space-x-1 p-2 bg-[#e52320] hover:bg-red-500 text-white hover:border border-gray-100 transition hover:w-52 hover:justify-center rounded-lg">
                  <Add className="text-md border border-[#e52320] rounded-full bg-[#e52320] text-white" />
                  <span className="capitalize text-md mt-[2px]">Post your ad</span>
                </button>
              </Link>
            </li>
            <li>
              <Cancel className="hover:text-[#e52320]" onClick={() => setNavbar(false)} />
            </li>
          </ul>
        </div>
      }
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center mb-5">
          <Link href="/">
            <Image
              src="https://eidcarosse.ch/wp-content/uploads/2023/07/test-white-logo.png"
              alt="logo"
              width={100}
              height={100} />
          </Link>
          <div className={`menu`}>
            <ul className="flex flex-row space-x-6 uppercase text-sm font-semibold text-white">
              <li className={navbarLiStyle}>
                <Link href="/">
                  home
                </Link>
              </li>
              <li className={navbarLiStyle}>
                <Link href="advance-search">
                  advance search
                </Link>
              </li>
              <li className={navbarLiStyle} onClick={() => (setShowContact(!showContact))}>
                contact us
              </li>
              <li>
                <ListDownComponent />
              </li>
              <li className={navbarLiStyle}><Chat className="text-3xl -mt-1" /></li>
              <li className={navbarLiStyle}><AdminPanelSettings className="text-3xl -mt-1" /></li>
            </ul>
          </div>
          <div className="flex items-center gap-6">


            {newWidth <= 1024 ?
              <button onClick={() => setNavbar(!navbar)}>
                <MenuIcon className="text-white" />
              </button>
              :
              <div>
                <Link href="/post-ad">
                  <button className="flex flex-row justify-center space-x-4 mt-[-1px] p-2 w-52 bg-white hover:text-[#e52320] text-black  rounded-lg">
                    <Add className="text-md border border-[#e52320] rounded-full bg-[#e52320] text-white" />
                    <span className="capitalize text-md mt-[2px]">Post your ad</span>
                  </button>
                </Link>
              </div>
            }
            {userLogged ?
              <><div className="menu-container" onClick={() => isOpen(!open)}>
                <button className="menu-trigger flex flex-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="h-10 w-10 md:h-11 md:w-11 border-none rounded-full" src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQ9LJTKr932HHolR2rZsDfow3ijKn9WCRP6G3nQ_AjqBYK0jCC_Jlpjkxa-neKP5YF9AWtwvgf0EYSpdOM" alt="profile_image" />
                  <ExpandMore className={`mt-2 text-gray-50 logo ${open ? 'active' : 'inactive'}`} />
                </button>
              </div>
                <div className={`dropdown-menu border rounded-sm w-60 absolute ml-[-120px] z-10 ${newWidth == 1024 ? 'end-10' : 'end-4 lg:end-52'} top-20 ${open ? 'active' : 'inactive'}`}>
                  <div>
                    <h3>Hello,</h3><h1 className="text-lg font-bold mb-[-10px] hover:text-red-600 cursor-pointer">Mudassar Riaz</h1>
                  </div>
                  <ul className="flex flex-col space-y-5 border-t-2 pt-3">
                    <DropdownItem logo={<Person />} text="My Profile" href="/my-profile" />
                    <DropdownItem logo={<FormatListNumbered />} text="My Ads" href="/my-ads" />
                    <DropdownItem logo={<Favorite />} text="Favourites" href="/my-favourites" />
                    <DropdownItem logo={<Sms />} text="Chat" href="/" />
                  </ul>
                  <ul className="flex flex-col space-y-5 border-t-2 pt-3">
                    <DropdownItem logo={<Logout />} text="Logout" href="/" />
                  </ul>
                </div></>
              :
              <Link href="/login">
                <button className="flex flex-row space-x-1 p-2 bg-white text-black mt-[-5px] hover:bg-red-500 hover:text-white hover:border hover:border-gray-100 transition rounded-lg">
                  <Login />
                  <span>Login</span>
                </button>
              </Link>
            }
            {!showContact ? "" : <ContactUs setShowContact={setShowContact} />}
          </div>
        </div>
      </header ></>
  );
}
