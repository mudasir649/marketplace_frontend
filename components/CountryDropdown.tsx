'use client';
import React, { useState, useEffect } from 'react'
import { FmdGood, ExpandMore, ExpandLess  } from '@mui/icons-material'

import { Menu } from "@headlessui/react"

interface ICountry {
  name: String
};
export default function CountryDropdown() {
  
  const [country, setCountries] = useState<string>('Location (any)'); 

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const countries = [
    {
      name:"Sweden"
    },
    {
      name:"Switzerland"
    },
    {
      name:"Germany"
    },
    {
      name:"Norway"
    },
  ];

  const handleClick = (value: any) => {
    setCountries(value)
  }

  return (
    <div>
      <Menu as='div' className="dropdown relative w-[250px]">
        <Menu.Button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn w-full text-left">
          <FmdGood className='dropdown-icon-primary'/>
          <div>
            <div className='text-[15px] font-medium leading-tight'>{country}</div>
            <div className='text-[13px]'>Select your place</div>
          </div>
            {
              isOpen ? <ExpandMore className='dropdown-icon-secondary'/> : <ExpandLess className='dropdown-icon-secondary'/>
            }
        </Menu.Button>
        <Menu.Items className="dropdown-menu">
          {countries?.map((country: ICountry, index: number) => {
            return (
              <Menu.Item key={index} as="li" className="cursor-pointer hover:text-[#e52320] transition" onClick={() => handleClick(country?.name)}>
                {country?.name}
              </Menu.Item>
            )
            })}
        </Menu.Items>
      </Menu>
    </div>
  )
}
