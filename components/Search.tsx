import React from "react";
import KeywordInputField from "./KeywordInputField";
import { Search } from "@mui/icons-material"
import useWindowDimensions from "@/utils/useWindowDimensions";

export default function SearchPage() {

  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;

  return (
    <div className={`px-[30px] py-6  
      max-w-[1170px] mx-10 lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:flex 
      lg:flex-row lg:justify-between gap-4 
      lg:gap-x-3 lg:mt-10
      lg:shadow-1 bg-white 
      mb-10
      lg:bg-white 
      rounded-lg
  `}>
      <KeywordInputField logo='component1' text1='Location (any)' text2="Enter your location" />
      <KeywordInputField logo='component2' text1='' text2="Select category" />
      <KeywordInputField logo='component3' text2="Enter keyboard here" />
      <button className="bg-[#e52320] hover:bg-red-700 
        transition w-auto h-10 lg:w-60 lg:h-16 lg:px-2 lg:py-5  lg:max-w-[162px] rounded-lg">
        <Search className="text-white text-3xl" />
      </button>
    </div>
  );
}
