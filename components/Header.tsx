'use client';
import { Add, AdminPanelSettings, ArrowDropDown, Cancel, Chat, Login, PlusOne } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';
import ListDownComponent from "./ListDownComponent";
import ContactUs from "./ContactUs";

export default function Header() {

  const [navbar, setNavbar] = useState<Boolean>(false);
  const [showContact, setShowContact] = useState(false);
  const navbarLiStyle = navbar ? 'cursor-pointer hover:text-[#e52320]' : 'cursor-pointer hover:text-red-300';


  useEffect(() => {
    Aos.init();
  }, []);

  const handleContact = () => {
    setShowContact(true);
    setNavbar(false);
  }


  return (
    <>
      {navbar &&
        <div className="h-[800px] w-96 absolute z-10 bg-white" data-aos="fade-right">
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
                {/* <Link href="contact-us">
                  contact us
                </Link> */}
              </li>
              <li>
                <ListDownComponent />
              </li>
              <li className={navbarLiStyle}><Chat className="text-3xl -mt-1" /></li>
              <li className={navbarLiStyle}><AdminPanelSettings className="text-3xl -mt-1" /></li>
              <li className="cursor-pointer">
                <Link href="/login">
                  <button className="flex flex-row space-x-1 p-2 bg-white text-black mt-[-5px] hover:bg-red-500 hover:text-white hover:border hover:border-gray-100 transition rounded-lg">
                    <Add className="text-md border border-[#e52320] rounded-full bg-[#e52320] text-white" />
                    <span className="capitalize text-md mt-[2px]">Post your ad</span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            {/*             
              <Link href="/login">
                <button className="text-white hover:text-red-200 transition duration-75 ease-in hover">Login</button>
              </Link> 
            */}

            {/* button to show navbar on small screen start */}
            <button className={`md:invisible visible`} onClick={() => setNavbar(!navbar)}>
              <MenuIcon className="text-white" />
            </button>
            {/* button to show navbar on small screen end */}

            <Link href="/login">
              <button className="flex flex-row space-x-1 p-2 bg-white text-black mt-[-5px] hover:bg-red-500 hover:text-white hover:border hover:border-gray-100 transition rounded-lg">
                <Login />
                <span>Login</span>
              </button>
            </Link>
            {!showContact ? "" : <ContactUs setShowContact={setShowContact} />}
          </div>
        </div>
      </header ></>
  );
}
