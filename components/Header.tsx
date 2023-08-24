'use client';
import { AdminPanelSettings, Chat } from "@mui/icons-material";
import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [ language, setLanguage ] = useState<string>('En');

  const handleClick = (e: any) => {
    setLanguage(e.target.value)
  }

  return (
    <header className="py-4 bg-[#e52320]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="https://eidcarosse.ch/wp-content/uploads/2023/07/test-white-logo.png"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        {/* <div className="invisible">
          <ul className="flex flex-row space-x-6 uppercase text-sm font-semibold text-white">
            <li className="cursor-pointer">home</li>
            <li className="cursor-pointer">advance search</li>
            <li className="cursor-pointer">contact us</li>
            <li>
            <FormControl sx={{ minWidth: 50 }}>
              <Select
                value={language}
                onChange={handleClick}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                className='h-7 text-white -mt-1 text-sm font-semibold border-none border-red-400 hover:outline-[#e52320]'

              >
                <MenuItem value={"EN"}>EN</MenuItem>
                <MenuItem value={"DE"}>DE</MenuItem>
                <MenuItem value={"ER"}>FR</MenuItem>
              </Select>
            </FormControl>
            </li>
            <li className="cursor-pointer"><Chat className="text-3xl -mt-1"/></li>
            <li className="cursor-pointer"><AdminPanelSettings className="text-3xl -mt-1"/></li>
          </ul>
        </div> */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-white hover:text-red-200 transition duration-75 ease-in hover">Login</Link>
          <Link href="/signup" className="bg-white hover:bg-red-500 hover:text-white hover:border hover:border-gray-100  px-4 py-2 transition rounded-lg">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
