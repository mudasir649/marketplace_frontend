import React from "react";
import CountryDropdown from "./CountryDropdown";
import PropertyDropdown from "./PropertyDropdown";
import PriceRangeDropdown from "./PriceRangeDropdown";

export default function Search() {
  return (
    <div className="px-[30px] py-6  
      max-w-[1170px] mx-auto grid grid-cols-2 lg:flex 
      lg:flex-row justify-between gap-4 
      lg:gap-x-3 relative lg:-top-10 
      lg:shadow-1 bg-white 
      lg:bg-white lg:backdrop-blur 
      rounded-lg">
      <CountryDropdown />
      <PropertyDropdown />
      <PriceRangeDropdown />
      <button className="bg-[#e52320] hover:bg-red-800 
        transition w-full lg:max-w-[162px] h-16 rounded-lg">
          
        </button>
    </div>
  );
}
