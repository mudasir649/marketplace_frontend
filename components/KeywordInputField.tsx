'use client';
import { Category, ExpandLess, ExpandMore, FmdGood } from '@mui/icons-material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import CategoryList from './CategoryList';
import Aos from 'aos';

export default function KeywordInputField({ logo, text1, text2 }: any) {


  const [address, setAddress] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const componentText = text2;
  const [expand, setExpand] = useState<Boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    onPlaceSelected: (place) => {
      let { formatted_address } = place;
      setAddress(formatted_address || "");
    }
  });

  const logoStyle = 'text-red-600 ml-2';

  useEffect(() => {
    Aos.init();
  }, [])

  const Logo = () => {
    return logo === "component1" ? <FmdGood className={logoStyle} /> : logo === "component2" ? <Category className={logoStyle} /> : ""
  };

  const DropDownDiv = () => {
    return (
      <div className='pl-0 lg:pl-10'>{expand ? <ExpandLess onClick={() => setExpand(false)} /> : <ExpandMore onClick={() => setExpand(true)} />}</div>
    )
  }

  const handleClick = (e: any) => {
    if (logo === "component2") {
      setExpand(!expand);
    } else {
      setExpand(false)
    }
  }

  const closeDropdown = () => {
    setExpand(false);
  }

  const handleMouseClick = useCallback((
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    }
  ), []);

  useEffect(() => {
    document.addEventListener('click', handleMouseClick);
    return () => {
      document.removeEventListener('click', handleMouseClick);
    }
  }, [handleMouseClick])

  return (
    <div>
      <div className='border ring-gray-200 rounded-lg hover:border-red-500 focus:outline-red-600  
      cursor-pointer transition w-auto h-16 lg:w-72 lg:h-16' onClick={(e) => handleClick(e)} ref={dropdownRef}>
        <div className='container mx-auto flex flex-row w-full space-x-3 lg:space-x-6 p-2'>
          <div><Logo /></div>
          <div className='flex flex-col w-auto space-y-[0.5px]'>
            <div>{text1}</div>
            {logo === "component2" ?
              <div>{category === "" ? componentText : category}</div>
              : logo === "component1" ?
                <div>
                  <Autocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
                    onPlaceSelected={(place) => {
                      let { formatted_address } = place;
                      setAddress(formatted_address || "");
                    }}
                    className='border-none w-auto lg:w-52 bg-transparent focus:outline-none'
                    placeholder={text2}
                  />
                </div>
                :
                <div><input type='text' value={keyword}
                  className='border-none w-auto lg:w-52 mt-2 bg-transparent focus:outline-none'
                  placeholder={text2} onChange={(e: any) => setKeyword(e.target.value)} /></div>
            }
          </div>
          {logo === "component2" ? <DropDownDiv /> : ""}
        </div>
      </div>
      {logo === "component2" &&
        <div>
          {expand ? <div className='h-auto p-2 w-auto lg:w-72 z-10 absolute bg-white border rounded-md mt-1' data-aos="fade-up">
            <CategoryList setCategory={setCategory} setExpand={setExpand} />
          </div> : ''}
        </div>
      }
    </div>
  )
}
