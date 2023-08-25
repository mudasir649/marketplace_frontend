import React from "react";
import CountryDropdown from "./CountryDropdown";
import ListingDropdown from "./ListingDropdown";
import KeywordInputField from "./KeywordInputField";
import { Search } from "@mui/icons-material"

export default function SearchPage() {
  return (
    <div className="px-[30px] py-6  
      max-w-[1170px] mx-auto lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:flex 
      lg:flex-row justify-between gap-4 
      lg:gap-x-3 lg:mt-[-70px] 
      lg:shadow-1 bg-white 
      mb-10
      lg:bg-white 
      rounded-lg
      ">
      <CountryDropdown />
      <ListingDropdown />
      <KeywordInputField />
      <button className="bg-[#e52320] hover:bg-red-700 
        transition w-60 px-2 py-5  lg:max-w-[162px] h-16 rounded-lg">
        <Search className="text-white text-3xl" />
      </button>

    </div>
  );
}
