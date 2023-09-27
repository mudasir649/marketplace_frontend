'use client'
import React, { useState } from "react";
import { Category, DirectionsCar, LocationOn, Search, SearchOff } from "@mui/icons-material"
import useWindowDimensions from "@/utils/useWindowDimensions";
import "./Search.css";
import axios from "axios";
import CategoryList from "./CategoryList";
import { useDispatch } from "react-redux";
import { setFilterData } from "@/store/appSlice";
import { useRouter } from "next/navigation";

export default function SearchPage() {

  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;

  const [googleLocation, setGoogleLocation] = useState<any>()
  const [showLocation, setShowLocation] = useState<Boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [isExpand, setIsExpand] = useState<Boolean>(false);
  const [allCategory, setAllCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("Select category");
  const dispatch = useDispatch();
  const router = useRouter();

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

  // console.log(address + " " + category);


  const searchFilter = async () => {
    const data = {
      address: address,
      category: category
    }
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/searchRecord`, data);
      console.log(res);

      if (res.status === 200) {
        dispatch(setFilterData(res.data?.data));
        router.push('/advance-search')
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={`bg-white grid grid-cols-1 mt-[-20px] md:mt-10 md:grid-cols-3 lg:grid-cols-3 mx-5 md:mx-10 lg:mx-52 h-auto p-5 gap-2 border-none rounded-md screen-1`}>
        <div className='flex flex-col w-full border border-gray-300 rounded-sm'>
          <span className="flex flex-row p-2">
            <LocationOn className="text-[#FF0000]" />
            <input type="text" placeholder='enter your address here' name='address' value={address} onChange={(e: any) => setAddress(e.target.value)} className="focus:outline-none pl-2 w-auto overflow-hidden" onKeyUp={(e: any) => checkPlace(e)} />
          </span>
          <div className="">
            {address && <div className='border border-gray-300 bg-white absolute z-20 p-2 mt-1 w-[275px]'>
              {
                showLocation ?
                  <ul>
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
        {/* <div className='flex flex-col w-full border border-gray-300 rounded-sm' onClick={() => setIsExpand(!isExpand)}>
          <span className="flex flex-row p-2">
            <Category className="text-[#FF0000]" />
            <h1 className="ml-2">{category}</h1>
          </span>
          {isExpand && <div className="border border-gray-300 bg-white absolute z-10 p-2 mt-11 w-[275px]">
            <CategoryList setCategory={setCategory} setExpand={setIsExpand} />
          </div>
          }
        </div> */}
        <div className='flex flex-row w-full p-2 border border-gray-300 rounded-sm'>
          <DirectionsCar className="text-[#FF0000]" />
          <input type="text" placeholder='enter keyword here...' name='name' className="focus:outline-none pl-2 overflow-hidden" />
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
