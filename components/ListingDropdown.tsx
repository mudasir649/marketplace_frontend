'use client';
import React, { useState, useEffect } from 'react'
import { LocalShipping, ExpandMore, ExpandLess  } from '@mui/icons-material'

import { Menu } from "@headlessui/react"

interface IAuto{
  name: String
};
export default function ListingDropdown() {
  
  const [auto, setAuto] =  useState<string>('Auto Parts'); 

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const auto_types = [
    {
      name:"Autos"
    },
    {
      name:"Bikes"
    },
    {
      name:"Boats"
    },
    {
      name:"Buses"
    },
    {
      name:"Construction Machines"
    },
    {
      name:"Drones"
    },
    {
      name:"Others"
    },
    {
      name:"Parts"
    },
    {
      name:"Trailers"
    },
    {
      name:"Trucks"
    },
    {
      name:"Vans"
    },
  ];

  const handleClick = (value: any) => {
    setAuto(value)
  }

  return (
    <div>
      <Menu as='div' className="dropdown relative w-[250px]">
        <Menu.Button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn w-full text-left">
          <LocalShipping className='dropdown-icon-primary'/>
          <div>
            <div className='text-[15px] font-medium leading-tight'>{auto}</div>
            <div className='text-[13px]'>Select auto type</div>
          </div>
            {
              isOpen ? <ExpandMore className='dropdown-icon-secondary'/> : <ExpandLess className='dropdown-icon-secondary'/>
            }
        </Menu.Button>
        <Menu.Items className="dropdown-menu mb-10 duration-100 transition-transform">
          {auto_types?.map((auto: IAuto, index: number) => {
            return (
              <Menu.Item key={index} as="li" className="cursor-pointer hover:text-[#e52320] transition" onClick={() => handleClick(auto?.name)}>
                {auto?.name}
              </Menu.Item>
            )
            })}
        </Menu.Items>
      </Menu>
    </div>
  )
}
