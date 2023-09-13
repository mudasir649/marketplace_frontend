'use client';
import Home from '@/components/Home';
import { ArrowForwardIos, Description, ExpandMore, FormatListBulleted, Image, InsertLink, LinkOff, LinkOffOutlined, Person, PlaylistAdd } from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import locateAddress from '@/utils/GoogleLocation';
import { conditionList, howContactList, priceList } from '@/utils/dataVariables';
import { carsList } from '@/utils/carsList';
import "../post-ad.css"
import { bikesList } from '@/utils/bikesList';
import { CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
import { Theme } from '@mui/material';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);

const style = {
    inputStyle: 'border border-gray-200 hover:border-red-500 focus:outline-red-500 w-full rounded-sm h-10 pl-3',
    divStyle: 'flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-1 md:space-y-0 mb-5 mt-5',
    h1Style: 'text-md font-bold w-40 mt-1',
    areaStyle: 'border border-gray-300 h-52 p-2 hover:border-red-600 focus:outline-red-600'
}

interface IData {
    category: any,
    subCategory: any,
    title: any,
    price: any,
    minPrice: any,
    maxPrice: any,
    brand: any,
    description: any,
    videoUrl: any,
    phoneNumber: any,
    webSite: any,
    address: any,
    feature_list: any,
    howToContact: any,
    condition: any,
    whatsApp: any,
    viber: any,
    email: any,
}

interface ILocation {
    lat: Number,
    long: Number,
}


// userId: any,


export default function Addtype() {

    const { type } = useParams();
    const classes = useStyles()
    const [open, isOpen] = useState<Boolean>(false);
    const [openSub, isOpenSub] = useState<Boolean>(false);
    const [openBrand, isOpenBrand] = useState<Boolean>(false);
    const [openSubBrand, isOpenSubBrand] = useState<Boolean>(false);
    const [images, setImages] = useState<any>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [priceListValue, setPriceListValue] = useState<string>('price')
    const [location, setLocation] = useState<ILocation>({
        lat: 0,
        long: 0
    });
    const [googleLocation, setGoogleLocation] = useState<any>(null);
    let router = useRouter();


    const [data, setData] = useState<IData>({
        category: type == 'E-scooter' ? 'Bikes' : type == 'Contruction%20Machines' ? 'Construction Machines' : type,
        subCategory: type === 'Bicycles' ? type : type === 'E-scooter' ? type : type === 'E-bikes' ? type : type === 'Motorcycle' ? type : '',
        title: null || '',
        price: null || '',
        minPrice: null || '',
        maxPrice: null || '',
        brand: null || '',
        description: null || '',
        videoUrl: null || '',
        phoneNumber: null || '',
        webSite: null || '',
        address: null || '',
        feature_list: null || '',
        howToContact: 'Whatsapp',
        condition: null || '',
        whatsApp: null || '',
        viber: null || '',
        email: null || '',
    });

    // userId: null || '',

    const handleLocation = (address: any) => {
        locateAddress(process.env.NEXT_PUBLIC_GOOGLE_MAP_API, address).then((locate: any) => {
            if (locate?.long && locate?.lat) {
                setLocation({ lat: locate?.lat, long: locate?.long })
            }
            if (locate?.message) {
                console.log(locate?.message);
            }
        })
    }

    const handleInput = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleBrand = (value: any) => {
        isOpenSubBrand(false)
        setData({ ...data, ['brand']: value })
    }

    const handleHowContact = (value: any) => {
        setData({ ...data, ['howToContact']: value });
    }

    const handleImage = (e: any) => {
        if (e.target.files) {
            setImages([...images, ...e.target.files]);
        } else {
            setImages(e.target.files[0])
        }
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (images.length <= 1) {
            toast('Please! Select more than 1 images.');
            return;
        } else {
            setLoading(true)
            const formData = new FormData()

            for (let i = 0; i < images.length; i++) {
                formData.append('file', images[i])
            }

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    formData.append(key, data[key as keyof IData]);
                }
            }
            try {
                const newData = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/adPost`, formData);
                if (newData.status == 201) {
                    toast(newData?.data)
                    setLoading(false);
                    router.push('/advance-search');
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        }
    }

    const brandList = type === 'Autos' ? carsList : bikesList;


    const checkPlace = async (e: any) => {
        const res = await axios.get(`http://localhost:4000/googleRoutes?address=${e.target.value}`);
        let predictions = res.data?.data.predictions;
        setGoogleLocation(predictions);
    }

    const { userInfo } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (userInfo === null) {
            router.push('/')
        }
    }, [router, userInfo])

    if (userInfo !== null) {
        return (
            <Home>
                <div className='container mx-auto'>
                    <div className='border-none rounded-sm bg-white mb-10 h-full p-3'>
                        <div className='container mx-auto'>
                            <h1 className='space-x-3 border-b-2 pb-3'><PlaylistAdd className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Select Category</span></h1>
                        </div>
                        <div className=' container mx-auto flex flex-col mb-7'>
                            <div className='flex flex-row space-x-2 mt-5'>
                                <h1>{type == 'Contruction%20Machines' ? 'Construction Machines' : type}</h1>
                                <ArrowForwardIos className='text-[12px] mt-[6.5px]' />
                                <h1 className='text-red-600 underline'>
                                    <Link href="/post-ad">
                                        {'Change categroy'}
                                    </Link>
                                </h1>
                            </div>
                            <div className='mt-5 w-full mb-5'>
                                <h1 className='space-x-3 border-b-2 pb-3'><Description className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Product Information</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Title <span className='text-red-600'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='title'
                                        value={data.title}
                                        onChange={(e: any) => handleInput(e)} />
                                    <p className='text-gray-300 italic'>Character limit 25</p>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Pricing <span className='text-red-600'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <ul className='flex flex-row space-x-2'>
                                        {priceList?.map((list: any, i: any) => (
                                            <li key={i}><input checked={priceListValue === list?.value ? true : false} type="radio" id={list.id} name={list.name} value={list?.value} onChange={() => setPriceListValue(list?.value)} /> {list?.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {priceListValue === 'price' ?
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Price{`[CHF]`} <span className='text-red-600'>*</span></h1>
                                    <div className='flex flex-col w-full'>
                                        <input type="text" className={style.inputStyle}
                                            name='price'
                                            value={data.price}
                                            onChange={(e: any) => handleInput(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                :
                                priceListValue === 'priceRange' ?
                                    <div className='flex flex-col md:flex-row my-5 space-y-2 md:space-y-0 md:space-x-2'>
                                        <div className='w-full flex flex-row'>
                                            <h1 className='text-md font-bold  w-80 lg:w-64 mt-1'>Min Pirce {`[CHF]`}<span className='text-red-600'>*</span></h1>
                                            <input type="text" className={style.inputStyle}
                                                name='minPrice'
                                                value={data?.minPrice}
                                                onChange={(e: any) => handleInput(e)}
                                            />
                                        </div>
                                        <div className='w-full flex flex-row'>
                                            <h1 className='text-md font-bold w-72 lg:w-64 mt-1'>Max Pirce {`[CHF]`}<span className='text-red-600'>*</span></h1>
                                            <input type="text"
                                                className={style.inputStyle}
                                                name='maxPrice'
                                                value={data?.maxPrice}
                                                onChange={(e: any) => handleInput(e)}
                                            />
                                        </div>
                                    </div>
                                    :
                                    ''
                            }
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Condition <span className='text-red-600'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <ul className='space-y-1'>
                                        {conditionList?.map((list: any, i: number) => (
                                            <li key={i}><input type="radio"
                                                name='condition'
                                                value={list?.value}
                                                onChange={(e: any) => handleInput(e)}
                                            />  {list?.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Brand <span className='text-red-600'>*</span></h1>
                                <div className='flex flex-col hover:border-red-500 w-full rounded-sm h-10'
                                    onClick={() => isOpenSubBrand(!openSubBrand)}
                                >
                                    <div className='flex flex-row border border-gray-300' >
                                        <h1 className='w-full p-2'>{data?.brand !== '' ? data?.brand : 'Select Category'}</h1>
                                        <div className={`p-1 pl-2 text-gray-600 w-10`}>
                                            <ExpandMore className={`logo ${openBrand ? 'hidden' : 'visible'} ${openSubBrand ? 'active' : 'inactive'}`} />
                                        </div>
                                    </div>
                                    <div className={`menu-item flex flex-row border bg-white border-gray-300 
                                    w-full rounded-sm p-1 ${openSubBrand ? 'active' : 'inactive'}`}
                                    >
                                        <ul className='w-full max-h-80 overflow-y-auto'>
                                            {brandList?.map((list: any, i: number) => (
                                                <li className={`hover:bg-red-500 hover:text-white 
                                            ml-1 mb-1 ${list.length - 1 == i ? '' : ' border-b-2'}`}
                                                    key={i}
                                                    onClick={() => handleBrand(list?.name)}
                                                >{list?.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Description <span className='text-red-600'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <textarea
                                        className={style.areaStyle}
                                        name='description'
                                        value={data.description}
                                        onChange={(e: any) => handleInput(e)} />
                                </div>
                            </div>
                            <div className='mt-5 w-full mb-5'>
                                <h1 className='space-x-3 border-b-2 pb-3'><FormatListBulleted className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Features</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Features List</h1>
                                <div className='flex flex-col w-full'>
                                    <textarea className={style.areaStyle}
                                        name='feature_list'
                                        value={data.feature_list}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                    <div className='text-gray-300 italic'>
                                        <ul className='text-gray-400 italic text-sm'>
                                            <li>Write a feature in each line eg.</li>
                                            <li>Feature 1</li>
                                            <li>Feature 2</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 w-full mb-5'>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <h1 className='space-x-3 border-b-2 pb-3'><Image className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Images</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <div className='flex flex-col w-full'>
                                    <input type="file" className={`${style.inputStyle} p-1`}
                                        name='image'
                                        accept='images/*'
                                        multiple
                                        onChange={(e: any) => handleImage(e)} />
                                    <div className='bg-red-300 mt-4 p-2 border-none rounded-sm italic'>
                                        <ul className='italic text-sm space-y-2'>
                                            <li>Recommended image size to (870x493)px.</li>
                                            <li>Image maximum size 2 MB.</li>
                                            <li>Allowed image type (png, jpg, jpeg, webp).</li>
                                            <li>You can upload up to 5 images.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 w-full mb-5'>
                                <h1 className='space-x-3 border-b-2 pb-3'>
                                    <InsertLink className='text-red-600 mt-[-4px]' /><span className='text-lg font-bold'>Video URL</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        placeholder='Only Youtube or Video Url'
                                        name='videoUrl'
                                        value={data.videoUrl}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                    <p className='text-gray-300 text-sm mt-1'>
                                        E.g. https://www.youtube.com/watch?v=RiXdDGk_XCU, https://vimeo.com/620922414
                                    </p>
                                </div>
                            </div>
                            <div className='mt-5 w-full mb-5'>
                                <h1 className='space-x-3 border-b-2 pb-3'>
                                    <Person className='text-red-600 mt-[-4px]' />
                                    <span className='text-lg font-bold'>Contact details</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Location</h1>
                                <div className='flex flex-col w-full'>
                                    <input className={style.inputStyle} type="text" placeholder='enter your address here' name='name' value={data?.address} onChange={(e) => setData({ ...data, ['address']: e.target.value })} onKeyUp={(e: any) => checkPlace(e)} />
                                    {googleLocation && <ul className='border border-gray-100 mt-1 space-y-2'>
                                        {googleLocation?.map((predict: any, i: any) => (
                                            <li key={i} onClick={() => setData({ ...data, ['address']: predict?.description })}>{predict?.description}</li>
                                        ))}
                                    </ul>
                                    }
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Phone</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='phoneNumber'
                                        value={data.phoneNumber}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>WhatsApp No</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='whatsApp'
                                        value={data.whatsApp}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                    <p className='text-gray-400 text-sm mt-1'>
                                        Whatsapp number with your country code. e.g.+41xxxxxxxxxx
                                    </p>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Viber Number</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='viber'
                                        value={data.viber}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                    <p className='text-gray-400 text-sm mt-1'>Viber number with your country code. e.g.+41xxxxxxxxxx</p>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Email</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='email'
                                        value={data.email}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Website</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='webSite'
                                        value={data.webSite}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                    <p className='text-gray-400 text-sm'>e.g. https://example.com</p>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Brand <span className='text-red-600'>*</span></h1>
                                <div className='flex flex-col hover:border-red-500 w-full rounded-sm h-10'
                                    onClick={() => isOpenSub(!openSub)}
                                >
                                    <div className='flex flex-row border border-gray-300' >
                                        <h1 className='w-full p-2'>{data?.howToContact !== '' ? data?.howToContact : `Whatsapp`} </h1>
                                        <div className={`p-1 pl-2 text-gray-600 w-10`}>
                                            <ExpandMore className={`logo ${open ? 'hidden' : 'visible'} ${openSub ? 'active' : 'inactive'}`} />
                                        </div>
                                    </div>
                                    <div className={`menu-item flex flex-row border bg-white border-gray-300 
                                    w-full rounded-sm p-1 ${openSub ? 'active' : 'inactive'}`}
                                    >
                                        <ul className='w-full max-h-96 overflow-y-auto'>
                                            {howContactList?.map((list: any, i: number) => (
                                                <li className={`hover:bg-red-500 hover:text-white 
                                            ml-1 mb-1 ${list.length - 1 == i ? '' : ' border-b-2'}`}
                                                    key={i}
                                                    onClick={() => handleHowContact(list?.name)}
                                                >{list?.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={`${style.h1Style} invisible`}>ffj</h1>
                                {!loading ?
                                    <div className='flex flex-col w-full'>
                                        <button className='bg-red-600 hover:bg-red-800 w-32 h-10 text-white font-bold' onClick={(e: any) => handleSubmit(e)}>Submit</button>
                                    </div>
                                    :
                                    <div className={classes.root}>
                                        <CircularProgress color="secondary" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Home>
        )
    }
    return null;
}
