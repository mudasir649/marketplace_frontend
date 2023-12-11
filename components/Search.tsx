"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Category,
  DirectionsCar,
  LocationOn,
  Search,
  SearchOff,
} from "@mui/icons-material";
import useWindowDimensions from "@/utils/useWindowDimensions";
import "./Search.css";
import axios from "axios";
import CategoryList from "./CategoryList";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterData,
  setProductData,
  setProductsCount,
  setReduxTitle,
  setAddress,
} from "@/store/appSlice";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
export default function SearchPage() {
  const { width, height } = useWindowDimensions();

  const pathname = usePathname();

  const newWidth = width || 0;
  const newHeight = height || 0;
  const { t } = useTranslation();
  const [showLocation, setShowLocation] = useState<Boolean>(false);
  const [showTitle, setShowTitle] = useState<Boolean>(false);
  const [titleData, setTitleData] = useState<any>();
  const dropdownRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const { title } = useSelector((state: any) => state.app);

  console.log(title);
  
  


  const handleTitle = async (e: any) => {
    setShowTitle(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/search-title?searchTerm=${e.target.value}`
    );
    setTitleData(res.data?.data);
  };

  const searchFilter = async (e: any) => {
    e.preventDefault();
    dispatch(setReduxTitle(title));
    router.push("/advance-search/search");
  };

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowLocation(false);
      setShowTitle(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="">
      <form
        method="POST"
        className={`flex flex-row w-full h-auto p-5 ml-0 md:ml-10 border-none rounded-md screen-1`}
        ref={dropdownRef}
      >
        <div className="w-[900px]">
        <div className="flex flex-row p-2 border-t-2 border-b-2 border-l-2 border-[#FF0000] rounded-lg h-[40px] bg-white w-full">
            <Search className="text-gray-800" />
            <input
              type="text"
              placeholder={t("placeholderKeyword")}
              name="name"
              className="focus:outline-none w-full pl-2 overflow-hidden"
              value={title}
              onChange={(e: any) => dispatch(setReduxTitle(e.target.value))}
              onKeyUp={(e: any) => handleTitle(e)}
              onKeyDown={() => dispatch(setReduxTitle(title))}
            />
          </div>
        </div>
        <div className="">
        <button
          className="flex flex-row justify-center 
            cursor-pointer w-full lg:w-20 p-1 border-none
              border-b-[#FF0000] rounded-tr-md rounded-br-md bg-[#FF0000] hover:bg-red-700 h-[40px] ml-[-8px]"
          onClick={(e) => searchFilter(e)}
        >
          <Search fontSize="large" className="text-white" />
        </button>
        </div>
        {/* <div className="flex flex-col w-full space-y-1">
          <div className="flex flex-row p-4 border-2 border-[#FF0000] rounded-lg h-[60px] bg-white">
            <LocationOn className="text-gray-800" />
            <input
              type="text"
              placeholder={t("placeholderAddress")}
              name="address"
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
              className="focus:outline-none pl-2 w-96 overflow-hidden bg-transparent"
              onKeyUp={(e: any) => checkPlace(e)}
            />
          </div>
          {showLocation && address && (
            <div className={`flex flex-row p-2 border-2 border-[#FF0000] h-52 rounded-lg lg:p-2 bg-white overflow-y-scroll ${newWidth <= 1024 ? '' : 'absolute top-[202px] z-20 w-[320px]'}`}>
              {showLocation ? (
                <ul className="w-full">
                  {googleLocation?.map((location: any, i: number) => (
                    <li
                      className="border-b"
                      key={i}
                      onClick={() => saveLocation(location?.description)}
                    >
                      {location.description}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          )}
        </div> */}
        {/* <div className="flex flex-col w-full space-y-1 col-span-2">
          <div className="flex flex-row p-2 border-t-2 border-b-2 border-l-2 border-[#FF0000] rounded-lg h-[40px] bg-white w-[900px]">
            <Search className="text-gray-800" />
            <input
              type="text"
              placeholder={t("placeholderKeyword")}
              name="name"
              className="focus:outline-none w-full pl-2 overflow-hidden"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              onKeyUp={(e: any) => handleTitle(e)}
            />
          </div>
          {showTitle && (
            <div className="w-full flex flex-col  border-2 border-[#FF0000] rounded-md z-20 bg-white p-2 mt-3">
              {showTitle ? (
                <ul className="h-52 overflow-y-scroll">
                  {titleData?.map((title: any, i: number) => (
                    <li
                      className="border-b"
                      key={i}
                      onClick={() => saveTitle(title?.title)}
                    >
                      {title?.title}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          )}
        </div> */}
        {/* <button
          className="flex flex-row justify-center 
            cursor-pointer w-full lg:w-20 p-1 border-none
              border-b-[#FF0000] rounded-tr-md rounded-br-md bg-[#FF0000] h-[40px]"
          onClick={(e) => searchFilter(e)}
        >
          <Search fontSize="large" className="text-white" />
        </button> */}
      </form>
    </div>
  );
}
