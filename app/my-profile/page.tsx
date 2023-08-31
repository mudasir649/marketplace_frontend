'use client';
import Home from '@/components/Home'
import { Person } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import useWindowDimensions from '@/utils/useWindowDimensions';


export default function MyProfile() {

    const [location, setLocation] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [whatsApp, setWhatsApp] = useState<string>("");
    const [viber, setViber] = useState<string>("");
    const [website, setWebsite] = useState<string>("");
    const [facebook, setFacebook] = useState<string>("");
    const [twitter, setTwitter] = useState<string>("");
    const [youtube, setYoutube] = useState<string>("");
    const [instagram, setInstagram] = useState<string>("");
    const [linked, setLinked] = useState<string>("");
    const [pinterest, setPinterest] = useState<string>("");
    const [reddit, setReddit] = useState<string>("");
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);

    const { width, height } = useWindowDimensions();

    const newWidth = width || null;
    const newHeight = height || null;


    const getLocation = async () => {
        Geolocation.getCurrentPosition(info => {
            setLat(info?.coords?.latitude);
            setLng(info?.coords?.longitude);
        });
        console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API);

        const res = await fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=AIzaSyD8FVQzuW5D_QgBWrzTL_xtfIsfl5SAdb4;`);
        const data = await res.json();
        console.log(data);

    }

    const handleInput = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'firstName':
                setFirstName(value);
            case 'lastName':
                setLastName(value);
            case 'email':
                setEmail(value);
            case 'password':
                setPassword(value);
            case 'confirmPassword':
                setConfirmPassword(value);
            case 'phone':
                setPhone(value);
            case 'whatsApp':
                setWhatsApp(value);
            case 'viber':
                setViber(value);
            case 'website':
                setWebsite(value);
            case 'facebook':
                setWebsite(value);
            case 'twitter':
                setWebsite(value);
            case 'youtube':
                setWebsite(value);
            case 'instagram':
                setWebsite(value);
            case 'linked':
                setWebsite(value);
            case 'pinterest':
                setWebsite(value);
            case 'reddit':
                setWebsite(value);

        }
    }

    const inputStyle = 'border border-gray-200 hover:border-red-500 focus:outline-red-500 w-full rounded-sm h-10 pl-3 mb-10';
    const divStyle = 'flex flex-col md:flex-row space-x-0 md:space-x-20 space-y-1 md:space-y-0 mb-5 mt-5';
    const h1Style = 'text-md font-bold w-48';


    return (
        <Home>
            <div className='container mx-auto mb-20'>
                <div className='border-none rounded-sm shadow-xl h-full p-3'>
                    <div className='flex justify-center border-b-2 pb-5'>
                        <h1 className='space-x-3'><Person className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Basic Information</span></h1>
                    </div>
                    <div className='container mx-0 mt-6 lg:mx-20 w-auto'>
                        <div className='flex flex-col md:flex-row space-x-0 md:space-x-32 space-y-1 md:space-y-0 mb-6'>
                            <h1 className='text-md font-bold'>Username</h1>
                            <div>
                                <h1 className='text-md mt-[0.5px] pl-0 md:pl-[15px]'>mudasir649</h1>
                            </div>
                        </div>
                        <div className={divStyle}>
                            <h1 className={h1Style}>First Name</h1>
                            <input type="text" className={inputStyle}
                                name='firstName'
                                value={firstName}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={h1Style}>Last Name</h1>
                            <input type="text" className={inputStyle}
                                name='LastName'
                                value={lastName}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={h1Style}>Email</h1>
                            <input type="text" className={inputStyle}
                                name='email'
                                value={email}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={h1Style}>Password</h1>
                            <input type="text" className={inputStyle}
                                name='password'
                                value={password}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={h1Style}>Confirm Password</h1>
                            <input type="text" className={inputStyle}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={h1Style}>Whats App</h1>
                            <input type="text" className={inputStyle}
                                name='whatsApp'
                                value={whatsApp}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={h1Style}>Viber</h1>
                            <input type="text" className={inputStyle}
                                name='viber'
                                value={viber}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={h1Style}>Website</h1>
                            <input type="text" className={inputStyle}
                                name='website'
                                value={website}
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={`${divStyle} mt-5`}>
                            <h1 className={h1Style}>Location</h1>
                            <div className={`${inputStyle} flex flex-row justify-between`}>
                                <input type="text" className={`${newWidth == 1024 && newHeight == 800 ? 'w-[320px]' :
                                    newWidth == 688 && newHeight == 1031 ? 'w-[450px]' : 'w-[160px] md:w-auto lg:w-[500px]'}
                                            my-2 border-none focus:outline-none`}
                                    name='location'
                                    value={location}
                                />
                                <button className={`${newWidth == 1024 && newHeight == 800 ? 'w-32' : 'w-20 lg:w-40'} bg-red-500 text-white font-semibold`}>location</button>
                            </div>
                        </div>
                        <div className={divStyle}>
                            <h1 className={h1Style}>Social Profile</h1>
                            <input type="text" className={inputStyle}
                                name='facebook'
                                value={facebook}
                                placeholder='Facebook'
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={`${h1Style} invisible`}>Social Profile</h1>
                            <input type="text" className={inputStyle}
                                name='twitter'
                                value={twitter}
                                placeholder='Twitter'
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={`${h1Style} invisible`}>Social Profile</h1>
                            <input type="text" className={inputStyle}
                                name='youtube'
                                value={youtube}
                                placeholder='Youtube'
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={`${h1Style} invisible`}>Social Profile</h1>
                            <input type="text" className={inputStyle}
                                name='instagram'
                                value={instagram}
                                placeholder='Instagram'
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={`${h1Style} invisible`}>Social Profile</h1>
                            <input type="text" className={inputStyle}
                                name='linked'
                                value={linked}
                                placeholder='Linked'
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={`${h1Style} invisible`}>Social Profile</h1>
                            <input type="text" className={inputStyle}
                                name='Pinterest'
                                value={pinterest}
                                placeholder='Pinterest'
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                        <div className={divStyle}>
                            <h1 className={`${h1Style} invisible`}>Social Profile</h1>
                            <input type="text" className={inputStyle}
                                name='Reddit'
                                value={reddit}
                                placeholder='Reddit'
                                onChange={(e: any) => handleInput(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </Home>
    )
}
