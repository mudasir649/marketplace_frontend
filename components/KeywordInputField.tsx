import { ExpandLess, ExpandMore, FmdGood, LocalShipping } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { usePlacesWidget } from "react-google-autocomplete";
import CategoryList from './CategoryList';
import Aos from 'aos';

export default function KeywordInputField({ logo, text1, text2 }: any) {


  const [address, setAddress] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const componentText = text2;
  const [expand, setExpand] = useState<Boolean>(false);

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
    return logo === "component1" ? <FmdGood className={logoStyle} /> : logo === "component2" ? <LocalShipping className={logoStyle} /> : ""
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

  return (
    <div>
      <div className='border ring-gray-200 rounded-lg hover:border-red-500 focus:outline-red-600  
      cursor-pointer transition w-56 h-16 lg:w-72 lg:h-16' onClick={(e) => handleClick(e)}>
        <div className='container mx-auto flex flex-row w-full space-x-3 lg:space-x-6 p-2'>
          <div><Logo /></div>
          <div className='flex flex-col w-32 space-y-[0.5px]'>
            <div>{text1}</div>
            {logo === "component2" ?
              <div>{category === "" ? componentText : category}</div>
              : logo === "component1" ?
                <div><input type='text' ref={ref || null} className='border-none w-40 lg:w-52 bg-transparent focus:outline-none' placeholder={text2} /></div>
                :
                <div><input type='text' value={keyword}
                  className='border-none w-40 lg:w-52 mt-2 bg-transparent focus:outline-none'
                  placeholder={text2} onChange={(e: any) => setKeyword(e.target.value)} /></div>
            }
          </div>
          {logo === "component2" ? <DropDownDiv /> : ""}
        </div>
      </div>
      {logo === "component2" &&
        <div>
          {expand ? <div className='h-auto p-2 w-56 lg:w-72 z-10 absolute bg-white border rounded-md mt-1' data-aos="fade-up">
            <CategoryList setCategory={setCategory} setExpand={setExpand} />
          </div> : ''}
        </div>
      }
    </div>
  )
}
