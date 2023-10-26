'use client';
import { Add, AddAPhoto, AdminPanelSettings, ArrowDropDown, Cancel, Chat, Checklist, ExpandMore, Favorite, FormatListNumbered, Login, Logout, Person, Person2, PlusOne, Sms } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';
import ListDownComponent from "./ListDownComponent";
import ContactUs from "./ContactUs";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useLogoutMutation } from "@/store/userApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ShareLink from "./ShareLink";
import SellNow from "./SellNow";
import RepairNow from "./RepairNow";
import { useTranslation } from 'react-i18next';
import DeleteAd from "./DeleteAd";
import axios from "axios";
import { setRoomsData, setShowContact } from "@/store/appSlice";
import { getApps, initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off, update, onDisconnect } from "firebase/database";
import { db } from "@/utils/firebase-config";

export default function Header() {

  const [navbar, setNavbar] = useState<Boolean>(false);
  const navbarLiStyle = navbar ? 'cursor-pointer hover:text-[#FF0000]' : 'cursor-pointer hover:p-2 hover:border hover:rounded-md hover:bg-white hover:text-[#FF0000] font-[600] ease-in duration-150';
  const [open, isOpen] = useState<Boolean>(false);
  const [roomData, setRoomData] = useState<any>();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();


  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo?.data?.userDetails?._id;
  const { showContact } = useSelector((state: any) => state.app);
  const { showShare, showSellNow, showRepairNow, showDeleteAd, page } = useSelector((state: any) => state.app);

  const userData = userInfo?.data?.userDetails;

  useEffect(() => {
    if (userInfo && userId) {
      const userStatusRef = ref(db, `users/${userId}/`);

      update(userStatusRef, { online: true });

      onDisconnect(userStatusRef).update({ online: false });

    }
  }, [userInfo, userId])

  useEffect(() => {
    let roomRef: any;

    const fetchRoomsData = async () => {
      try {
        console.log("Updating rooms list");
        roomRef = ref(db, `users/${userId}/rooms`);

        const handleRoomUpdate: any = (snapshot: any) => {
          const room = snapshot.val() || [];
          dispatch(setRoomsData(room))
        };

        onValue(roomRef, handleRoomUpdate);

        // Clean up the listener when the component is unmounted or the user logs out
        return () => {
          if (roomRef) {
            off(roomRef, handleRoomUpdate);
          }
        };
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    if (userInfo !== null) {
      fetchRoomsData();
    }
  }, [userInfo, userId, dispatch]);

  const handleContact = () => {
    dispatch(setShowContact(true));
    setNavbar(false);
  }


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
  const { t } = useTranslation(); // Initialize the translation hook

  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout(null));
      router.push('/')
    } catch (error: any) {
      toast(error?.data?.message)
    }
  }

  const { width, height } = useWindowDimensions();
  const newWidth = width || 0;

  const handleAdvanceSearch = async (value: any) => {
    setNavbar(false);
    router.push(`/advance-search`);
  }


  return (
    <>
      {navbar &&
        <div className="ease-in-out duration-300 h-full w-96 absolute z-10 bg-white">
          <ul className="flex flex-col space-y-5 uppercase m-7">
            <li className={navbarLiStyle}>
              <Link href="/" onClick={() => setNavbar(false)}>
                {t('header.home')}
              </Link>
            </li> 
            <li className={navbarLiStyle} onClick={() => handleAdvanceSearch('all')}>
              {t('header.advanceSearch')}
            </li>
            <li className={navbarLiStyle} onClick={handleContact}>{t('header.contactUs')}</li>
            <li>
              <ListDownComponent />
            </li>
            {userInfo !== null &&
              <li className={navbarLiStyle} onClick={() => router.push('/chat')}><Chat className="text-3xl -mt-1" /></li>
            }
            {userInfo !== null &&
              <li className={navbarLiStyle}><AdminPanelSettings className="text-3xl -mt-1" /></li>
            }
            <li className="cursor-pointer">
              <Link href="/post-ad">
                <button className="flex flex-row space-x-1 p-2 bg-[#e52320] hover:bg-red-500 text-white hover:border border-gray-100 transition hover:w-52 hover:justify-center rounded-lg">
                  <Add className="text-md border border-[#e52320] rounded-full bg-[#e52320] text-white" />
                  <span className="capitalize text-md mt-[2px]">Post your ad</span>
                </button>
              </Link>
            </li>
            <li>
              <Cancel className="hover:text-[#FF0000] cursor-pointer" onClick={() => setNavbar(false)} />
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
              width={150}
              height={150} />
          </Link>
          <div className={`menu`}>
            <ul className="flex flex-row space-x-6 uppercase text-sm font-semibold text-white">
              <li className={`${navbarLiStyle} line-clamp-1`}>
                <Link href="/">
                  {t('header.home')}
                </Link>
              </li>
              <li className={`${navbarLiStyle} line-clamp-1`} onClick={() => handleAdvanceSearch('all')}>
                {t('header.advanceSearch')}
              </li>
              <li className={`${navbarLiStyle} line-clamp-1`} onClick={() => (dispatch(setShowContact(!showContact)))}>
                {t('header.contactUs')}
              </li>
              <li>
                <ListDownComponent />
              </li>
              {userInfo !== null &&
                <li className={navbarLiStyle} onClick={() => router.push('/chat')}><Chat className="text-3xl -mt-1" /></li>
              }
              {userInfo !== null &&
                <li className={navbarLiStyle}><AdminPanelSettings className="text-3xl -mt-1" /></li>
              }
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
                  <button className="flex flex-row justify-center mt-[-1px] p-2 w-52 gap-2 bg-white hover:text-[#FF0000] text-black rounded-lg">
                    <section className="">
                      <Add className="text-md border border-[#FF0000] rounded-full bg-[#FF0000] text-white" />
                    </section>
                    <section className="capitalize text-md line-clamp-1 font-semibold">{t('header.postYourAd')}</section>
                  </button>
                </Link>
              </div>
            }
            {userInfo !== null ?
              <><div className="menu-container" onClick={() => isOpen(!open)} ref={dropdownRef}>
                <button className="menu-trigger flex flex-row">
                  {!userData?.image ? <Person2 className="text-3xl text-white" /> :
                    <Image className="h-10 w-10 md:h-11 md:w-11 border-none rounded-full" width={100} height={100} src={userData?.image} alt="profile_image" />
                  }
                  <ExpandMore className={`${!userData?.image ? 'mt-1' : 'mt-2'}  text-gray-50 logo ${open ? 'active' : 'inactive'}`} />
                </button>
              </div>
                <div className={`dropdown-menu border rounded-sm w-60 absolute ml-[-120px] z-10 ${newWidth == 1024 ? 'end-10' : 'end-4 lg:end-52'} top-28 ${open ? 'active' : 'inactive'}`}>
                  <div>
                    <h3>{t('header.hello')}</h3><h1 className="text-lg font-bold mb-[-10px] hover:text-[#FF0000] cursor-pointer">{userData?.firstName}  {userData?.lastName}</h1>
                  </div>
                  <ul className="flex flex-col space-y-5 border-t-2 pt-3">
                    <DropdownItem logo={<Person />} text={t('header.myProfile')} href="/my-profile" />
                    <DropdownItem logo={<FormatListNumbered />} text={t('header.myAds')} href="/my-ads" />
                    <DropdownItem logo={<Favorite />} text={t('header.favourites')} href="/my-favourites" />
                  </ul>
                  <ul className="flex flex-col space-y-5 border-t-2 pt-3" onClick={() => logoutHandler()}>
                    <DropdownItem logo={<Logout />} text={t('header.logout')} href="/" />
                  </ul>
                </div></>
              :
              <Link href="/login">
                <button className="flex flex-row space-x-1 p-2 bg-white text-black mt-[-5px] hover:bg-red-500 hover:text-white hover:border hover:border-gray-100 transition rounded-lg">
                  <Login />
                  <span className="capitalize text-md mt-[2px] line-clamp-1 font-semibold">{t('header.login')}</span>
                </button>
              </Link>
            }
            {!showContact ? "" : <ContactUs />}
            {showShare && <ShareLink />}
            {showSellNow && <SellNow />}
            {showRepairNow && <RepairNow />}
            {showDeleteAd && <DeleteAd />}
          </div>
        </div>
      </header ></>
  );
}
