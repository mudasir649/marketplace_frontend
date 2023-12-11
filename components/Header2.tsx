"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ListDownComponent from "./ListDownComponent";
import {
  Add,
  ExpandMore,
  FormatListNumbered,
  Login,
  Logout,
  Person,
  Favorite,
  Cancel,
  ManageAccounts,
  QuestionAnswer,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import "./Header.css";
import Link from "next/link";
import { useLogoutMutation } from "@/store/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SellNow from "./SellNow";
import DeleteAd from "./DeleteAd";
import RepairNow from "./RepairNow";
import { setReduxTitle, setRoomsData, setShowContact } from "@/store/appSlice";
import { off, onDisconnect, onValue, ref, update } from "firebase/database";
import { db } from "@/utils/firebase-config";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { routeName, typeMap } from "@/utils/dataVariables";
import dynamic from "next/dynamic";

function Header2() {
  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Initialize the translation hook
  const [navbar, setNavbar] = useState<Boolean>(false);
  const [open, isOpen] = useState<Boolean>(false);
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo?.data?.userDetails?._id;

  const { showDeleteAd } = useSelector(
    (state: any) => state.app
  );
  const userData = userInfo?.data?.userDetails;
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const checkType = routeName.includes(pathname);
  const { width, height } = useWindowDimensions();
  const newWidth = width || 0;

  useEffect(() => {
    dispatch(setReduxTitle(""))
  }, [dispatch])

  useEffect(() => {
    if (userInfo && userId) {
      const userStatusRef = ref(db, `users/${userId}/`);

      update(userStatusRef, { online: true });

      onDisconnect(userStatusRef).update({ online: false });
    }
  }, [userInfo, userId]);

  useEffect(() => {
    let roomRef: any;

    const fetchRoomsData = async () => {
      try {
        console.log("Updating rooms list");
        roomRef = ref(db, `users/${userId}/rooms`);

        const handleRoomUpdate: any = (snapshot: any) => {
          const room = snapshot.val() || [];
          dispatch(setRoomsData(room));
        };

        onValue(roomRef, handleRoomUpdate);

        // Clean up the listener when the component is unmounted or the user logs out
        return () => {
          if (roomRef) {
            off(roomRef, handleRoomUpdate);
          }
        };
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    if (userInfo !== null) {
      fetchRoomsData();
    }
  }, [userInfo, userId, dispatch]);

  const handleContact = () => {
    router.push("/contact-us");
    setNavbar(false);
  };

  const handleAdvanceSearch = () => {
    router.push("/advance-search");
    setNavbar(false);
  };

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      isOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const navbarLiStyle =
    "cursor-pointer hover:text-[#FF0000] whitespace-nowrap text-[15px]";

  const DropdownItem = ({ logo, text, href }: any) => {
    return (
      <li className="dropdownItem space-x-2 hover:text-[#FF0000] ">
        <span>{logo}</span>
        <Link
          className="text-md font-semibold"
          href={href}
          onClick={() => isOpen(false)}
        >
          {text}
        </Link>
      </li>
    );
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout(null));
      router.push("/");
      setNavbar(false);
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  return (
    <>
      {navbar && (
        <div
          className="h-[900px] w-full absolute z-20 bg-white mt-[-40px]"
          data-aos="fade-right"
          ref={dropdownRef}
        >
          <ul className="flex flex-col space-y-5 uppercase m-7">
            <li className={navbarLiStyle}>
              <Link href="/" onClick={() => setNavbar(false)}>
                {t("header.home")}
              </Link>
            </li>
            <li className={navbarLiStyle} onClick={() => handleAdvanceSearch()}>
              {t("header.advanceSearch")} 
            </li>
            <li className={navbarLiStyle} onClick={handleContact}>
              {t("header.contactUs")}
            </li>
            <li className="text-black">
              <ListDownComponent setNavbar={setNavbar} />
            </li>{" "}
            {userInfo !== null && (
              <li
                className={navbarLiStyle}
                onClick={() => router.push("/chat")}
              >
                <QuestionAnswer className="text-3xl -mt-1" />
              </li>
            )}
            <li className="cursor-pointer">
              <Link href="/post-ad">
                <button
                  className="flex flex-row space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white"
                  onClick={() => setNavbar(false)}
                >
                  <Add className="text-md border border-[#e52320] rounded-full bg-[#FF0000] text-white" />
                  <span className="capitalize text-md font-semibold">
                    {t("header.postYourAd")}
                  </span>
                </button>
              </Link>
            </li>
            {userInfo === null ? (
              <li>
                <Link href="/login">
                  <button
                    className="border border-[#FF0000] bg-[#FF0000] hover:bg-white hover:border-white text-white hover:text-[#FF0000] drop-shadow-lg rounded-lg p-2 flex flex-row space-x-1"
                    onClick={() => setNavbar(false)}
                  >
                    <section className="">
                      <Login className="text-md rounded-full" />
                    </section>
                    <section className="capitalize text-lg whitespace-nowrap truncate w-auto mt-[0.5px] font-semibold">
                      {t("header.login")}
                    </section>
                  </button>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/my-profile">
                    <button
                      className="flex flex-row space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white"
                      onClick={() => setNavbar(false)}
                    >
                      <section className="">
                        <Person />
                      </section>
                      <section className="capitalize text-lg whitespace-nowrap truncate w-auto mt-[0.5px] font-semibold">
                        {t("header.myProfile")}
                      </section>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/my-ads">
                    <button
                      className="flex flex-row space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white"
                      onClick={() => setNavbar(false)}
                    >
                      <section className="">
                        <FormatListNumbered />
                      </section>
                      <section className="capitalize text-lg whitespace-nowrap truncate w-auto mt-[0.5px] font-semibold">
                        {t("header.myAds")}
                      </section>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/my-favourites">
                    <button
                      className="flex flex-row space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white"
                      onClick={() => setNavbar(false)}
                    >
                      <section className="">
                        <Favorite />
                      </section>
                      <section className="capitalize text-lg whitespace-nowrap truncate w-auto mt-[0.5px] font-semibold">
                        {t("header.favourites")}
                      </section>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/change-password">
                    <button
                      className="flex flex-row space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white"
                      onClick={() => setNavbar(false)}
                    >
                      <section className="">
                        <ManageAccounts />
                      </section>
                      <section className="capitalize text-lg whitespace-nowrap truncate w-auto mt-[0.5px] font-semibold">
                        {t("header.changePassword")}
                      </section>
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    className="flex flex-row space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white"
                    onClick={() => logoutHandler()}
                  >
                    <section className="">
                      <Logout />
                    </section>
                    <section className="capitalize text-lg whitespace-nowrap truncate w-auto mt-[0.5px] font-semibold">
                      {t("header.logout")}
                    </section>
                  </button>
                </li>
              </>
            )}
            <li>
              <Cancel
                className="hover:text-[#FF0000] cursor-pointer"
                onClick={() => setNavbar(false)}
              />
            </li>
          </ul>
        </div>
      )}
      <header
        className={`${
          checkType ? "shadow-md h-28 border-b-[3px] border-[#FF0000]" : ""
        }`}
      >
        <div className="container mx-auto flex space-x-10 mt-8">
          <div className="w-[900px] md:w-96">
            <Link href="/">
              <Image
                src="/assets/eidcarosse_website_logo.png"
                alt="eidcarosse_logo"
                width={150}
                height={150}
                className={`w-auto h-14 cursor-pointer mt-1`}
                onClick={() => router.push("/")}
              />
            </Link>
          </div>
          <div className="w-full flex justify-between">
            <ul className="flex flex-row text-md space-x-7 menu p-6">
              <Link href="/">
                <li className={navbarLiStyle} onClick={() => dispatch(setReduxTitle(""))}>
                  {t("header.home")}
                </li>
              </Link>
              <Link href="/advance-search">
                <li
                  className={navbarLiStyle}
                  onClick={() => dispatch(setReduxTitle(""))}
                >
                  {t("header.advanceSearch")}
                </li>
              </Link>
              <Link href="/contact-us">
                <li className={navbarLiStyle} onClick={() => dispatch(setReduxTitle(""))}>{t("header.contactUs")}</li>
              </Link>
              <li className="text-black text-[13px]">
                <ListDownComponent setNavbar={setNavbar} />
              </li>
              <li
                className="cursor-pointer hover:text-[#FF0000]"
                onClick={() => router.push("/chat")}
              >
                <QuestionAnswer style={{ fontSize: "20px" }} />
              </li>
            </ul>
            <ul
              className={`${
                newWidth <= 1024 && "absolute end-10 mt-2"
              } flex justify-end p-2 space-x-7`}
            >
              <li>
                {newWidth <= 1024 ? (
                  <button onClick={() => setNavbar(!navbar)}>
                    <MenuIcon className="text-[#FF0000] mt-1" />
                  </button>
                ) : (
                  <>
                    <Link href="/post-ad">
                      <button className="w-auto border border-white hover:border-[#FF0000] bg-white hover:bg-[#FF0000] hover:text-white drop-shadow-lg rounded-lg p-2 flex flex-row justify-center space-x-3 transition duration-300">
                        <section className="">
                          <Add className="text-md border bg-[#FF0000] border-[#FF0000] rounded-full text-white" />
                        </section>
                        <section className="capitalize text-[15px] font-semibold whitespace-nowrap mt-[2px]">
                          {t("header.postYourAd")}
                        </section>
                      </button>
                    </Link>
                  </>
                )}
              </li>
              {newWidth <= 1024 ? (
                ""
              ) : (
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
                          className={`logo mt-3 text-[#FF0000] ${
                            open ? "active" : "inactive"
                          }`}
                        />
                      </button>
                      <div
                        className={`dropdown-menu absolute bg-white shadow-lg ml-[-150px] w-64 ${
                          open ? "active" : "inactive"
                        }`}
                      >
                        <div className="border-b-2 pb-2 w-full">
                          <h1 className="text-md text-gray-700">
                            {t("header.hello")},
                          </h1>
                          <h4 className="text-lg font-semibold hover:text-[#FF0000] text-gray-700 cursor-pointer">
                            {userData?.firstName} {userData?.lastName}
                          </h4>
                        </div>
                        <ul className="flex flex-col space-y-3 w-full text-gray-700">
                          <li className="whitespace-nowrap">
                            <DropdownItem
                              logo={<Person />}
                              text={t("header.myProfile")}
                              href="/my-profile"
                            />
                          </li>
                          <li className="whitespace-nowrap">
                            <DropdownItem
                              logo={<FormatListNumbered />}
                              text={t("header.myAds")}
                              href="/my-ads"
                            />
                          </li>
                          <li className="whitespace-nowrap">
                            <DropdownItem
                              logo={<Favorite />}
                              text={t("header.favourites")}
                              href="/my-favourites"
                            />
                          </li>
                          <li className="whitespace-nowrap">
                            <DropdownItem
                              logo={<ManageAccounts />}
                              text={t("header.changePassword")}
                              href="/change-password"
                            />
                          </li>
                        </ul>
                        <ul
                          className="flex flex-col space-y-5 border-t-2 pt-3 w-full text-gray-700"
                          onClick={() => logoutHandler()}
                        >
                          <DropdownItem
                            logo={<Logout />}
                            text={t("header.logout")}
                            href="/"
                          />
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link href="/login">
                      <button className="border border-[#FF0000] bg-[#FF0000] hover:bg-white hover:border-white text-white hover:text-[#FF0000] drop-shadow-lg rounded-lg p-2 flex flex-row space-x-1 transition duration-150">
                        <section className="">
                          <Login className="text-md rounded-full" />
                        </section>
                        <section className="capitalize text-lg whitespace-nowrap truncate w-auto mt-[0.5px] font-semibold">
                          {t("header.login")}
                        </section>
                      </button>
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </div>
          {showDeleteAd && <DeleteAd />}
        </div>
      </header>
    </>
  );
}

export default dynamic(() => Promise.resolve(Header2), { ssr: false });
