'use client'
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Category, DirectionsCar, LocationOn, Search, SearchOff } from "@mui/icons-material"
import useWindowDimensions from "@/utils/useWindowDimensions";
import "./Search.css";
import axios from "axios";
import CategoryList from "./CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { setFilterData, setProductData, setProductsCount, setReduxAddress, setReduxTitle } from "@/store/appSlice";
import { usePathname, useRouter } from "next/navigation";

export default function SearchPage() {

  const { width, height } = useWindowDimensions();

  const pathname = usePathname();

  const newWidth = width || 0;
  const newHeight = height || 0;

  const [googleLocation, setGoogleLocation] = useState<any>()
  const [showLocation, setShowLocation] = useState<Boolean>(false);
  const [showTitle, setShowTitle] = useState<Boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [titleData, setTitleData] = useState<any>();
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch();
  const router = useRouter();

  const { page, type } = useSelector((state: any) => state.app);

  const checkPlace = async (e: any) => {
    setShowLocation(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/googleRoutes?address=${e.target.value}`);
    let predictions = res.data?.data.predictions;
    setGoogleLocation(predictions);
  }

  const saveLocation = (value: any) => {
    setAddress(value);
    setShowLocation(false);
  }

  const handleTitle = async (e: any) => {
    setShowTitle(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/search-title?searchTerm=${e.target.value}`);
    setTitleData(res.data?.data);
  }

  const saveTitle = async (value: any) => {
    setTitle(value);
    setShowTitle(false)
  }

  const searchFilter = async () => {
    dispatch(setReduxTitle(title));
    dispatch(setReduxAddress(address))
    router.push('/advance-search/search');
  }

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLocation(false);
        setShowTitle(false);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }

  }, [handleOutsideClick]);

  return (
    <>
      <div className={`bg-white grid grid-cols-1 mt-[-20px] md:mt-10 md:grid-cols-3 lg:grid-cols-3 mx-5 md:mx-10 lg:mx-52 h-auto p-5 gap-2 border-none rounded-md screen-1`} ref={dropdownRef}>
        <div className='flex flex-col w-full border border-gray-300 rounded-sm'>
          <span className="flex flex-row p-2">
            <LocationOn className="text-[#FF0000]" />
            <input type="text" placeholder='enter your address here' name='address' value={address} onChange={(e: any) => setAddress(e.target.value)} className="focus:outline-none pl-2 w-auto overflow-hidden" onKeyUp={(e: any) => checkPlace(e)} />
          </span>
          <div className="">
            {showLocation && address && <div className='border border-gray-300 bg-white absolute z-20 p-2 mt-1 w-[370px]'>
              {
                showLocation ?
                  <ul className="h-52 overflow-y-scroll">
                    {googleLocation?.map((predict: any, i: any) => (
                      <li className="border-b" key={i} onClick={() => saveLocation(predict?.description)}>{predict?.description}</li>
                    ))}
                  </ul>
                  :
                  ''
              }
            </div>
            }
          </div>
        </div>
        <div className='flex flex-col w-full p-2 border border-gray-300 rounded-sm'>
          <span className="flex flex-row">
            <Search className="text-[#FF0000]" />
            <input type="text" placeholder='enter keyword here...' name='name' className="focus:outline-none pl-2 overflow-hidden" value={title} onChange={(e: any) => setTitle(e.target.value)} onKeyUp={(e: any) => handleTitle(e)} />
          </span>
          <div className="ml-[-9px]">
            {showTitle && <div className='border border-gray-300 bg-white absolute z-20 p-2 mt-3 w-[370px]'>
              {showTitle ?
                <ul className="h-72 overflow-y-scroll">
                  {titleData?.map((title: any, i: number) => (
                    <li className="border-b" key={i} onClick={() => saveTitle(title?.title)}>{title?.title}</li>
                  ))}
                </ul>
                :
                ''
              }
            </div>
            }
          </div>
        </div>
        <button className='flex flex-row justify-center 
            cursor-pointer w-full p-2 border-none 
            border-gray-300 rounded-sm bg-[#FF0000]' onClick={() => searchFilter()}>
          <Search className="text-white" />
        </button>
      </div >
    </>
  );
}
