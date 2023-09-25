/* eslint-disable @next/next/no-img-element */
'use client'
import Home from '@/components/Home';
import { AirportShuttle, BuildCircle, Chat, DataSaverOn, DirectionsBike, DirectionsBoat, DirectionsBus, DirectionsCar, ExpandLess, ExpandMore, FireTruck, Flight, KeyboardArrowLeft, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, PhoneEnabled, PrecisionManufacturing, RemoveRedEye, RvHookup, Search, Share } from '@mui/icons-material';
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
// import "./advanceSearch.css";
import ReactStars from "react-stars";
import { ratingList } from "../../utils/localVariables";
// import productData from '@/utils/data';
import useWindowDimensions from '@/utils/useWindowDimensions';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

interface IList {
    logo: any,
    name: string,
    quantity: number
}

interface IRating {
    name: string,
    value: number
}


export default function Page() {

    const { width, height } = useWindowDimensions();

    const newWidth = width || 0;
    const newHeight = height || 0;

    const [productData, setProductData] = useState<any>(null);
    const [productsCount, setProductsCount] = useState<any>(0)

    const [page, setPage] = useState<number>(1);

    const { filterData } = useSelector((state: any) => state.app);

    console.log(filterData);


    if (filterData?.length === 0) {
        console.log('no data exists.');
    } else {
        console.log('data exists.');
    }

    useEffect(() => {
        if (filterData?.length === 0) {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}`);
                setProductData(res.data?.data?.ad);
                setProductsCount(res.data?.data?.totalAds)
            }
            fetchData();
        } else {
            setProductData(filterData)
        }
    }, [page, filterData]);


    const pagination = () => {
        let paginationList = [];
        let totalPages = Math.ceil(productsCount / 10);
        for (let i = 1; i <= totalPages; i++) {
            paginationList.push(i);
        }
        return paginationList;
    }

    const previousHandle = () => {
        if (page !== 1) {
            setPage(page - 1);
        } else {
            return;
        }
    }


    const nextHandle = () => {
        if (page !== pagination().length) {
            setPage(page + 1);
        } else {
            return;
        }
    };


    const categoryList = [
        {
            logo: <DirectionsCar />,
            name: "Autos",
            quantity: 23
        },
        {
            logo: <DirectionsBike />,
            name: "Bikes",
            quantity: 12
        },
        {
            logo: <DirectionsBoat />,
            name: "Boats",
            quantity: 2
        },
        {
            logo: <DirectionsBus />,
            name: "Busses",
            quantity: 0
        },
        {
            logo: <PrecisionManufacturing />,
            name: "Construction machines",
            quantity: 74
        },
        {
            logo: <Flight />,
            name: "Drones",
            quantity: 32
        },
        {
            logo: <DataSaverOn />,
            name: "Others",
            quantity: 23
        },
        {
            logo: <BuildCircle />,
            name: "Parts",
            quantity: 0
        },
        {
            logo: <RvHookup />,
            name: "Trailers",
            quantity: 90
        },
        {
            logo: <FireTruck />,
            name: "Trucks",
            quantity: 11
        },
        {
            logo: <AirportShuttle />,
            name: "Vans",
            quantity: 9
        },
    ];



    useEffect(() => {
        Aos.init();
    }, []);


    const ReactStar = ({ value }: any) => {
        return (
            <ReactStars
                count={5}
                size={24}
                value={value}
                edit={false}
            />
        )
    }

    const logoStyle1 = newWidth < 370 ? 'text-[8px]' : 'text-[10px] md:text-base lg:text-xl';

    const logo = [
        {
            name: <PhoneEnabled className={logoStyle1} />
        },
        {
            name: <Chat className={logoStyle1} />
        },
        {
            name: <Share className={logoStyle1} />
        },
        {
            name: <RemoveRedEye className={logoStyle1} />
        },
        {
            name: <span className='text-[8px] md:text-sm'>123</span>
        }
    ];


    const inputStyle = 'border border-gray-300 hover:border-red-600 focus:outline-red-600 rounded-md w-auto lg:w-32 h-10 p-2 cursor-pointer';
    const logoStyle = newWidth < 370 ? 'text-[#FF0000] text-[10px] cursor-pointer' : 'text-[#FF0000] text-[15px] md:text-xl cursor-pointer';
    const btnStyle = `font-semibold hover:text-[#FF0000] text-gray-500`;
    const spanStyle = newWidth < 370 ? 'text-[10px] cursor-pointer font-bold' : 'text-[12px] cursor-pointer font-bold';


    if (!productData) {
        return <div className="flex justify-center mt-5">
            <Image
                src='/assets/eidcarosse.gif'
                alt="eidcarosse_logo"
                width={500}
                height={500}
            />
        </div>
    }
    return (
        <div>
            <Home>
                <div className='container mx-auto flex flex-col lg:flex-row lg:mt-0 space-y-3 lg:space-y-0 lg:space-x-3 w-full mb-[500px]'>
                    <div className='bg-white shadow-lg border rounded-md w-full lg:w-[400px] h-full p-2' data-aos="fade-right">
                        <div className='border-b flex flex-row justify-between p-2'>
                            <h1 className='text-lg font-bold'>Category</h1>
                        </div>
                        <div className='transition ease-in-out duration-100 mb-10'>
                            <h1 className='pl-1 pt-2  text-lg font-semibold'>All Categories</h1>
                            <ul className='space-y-3 mt-2 mx-1'>
                                {categoryList?.map((list: IList, i: number) => (
                                    <li className='hover:text-[#FF0000] cursor-pointer' key={i}>{list.logo} {list.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='border-b flex flex-row justify-between p-2'>
                            <h1 className='text-lg font-bold'>Price Range</h1>
                        </div>
                        <div className='flex flex-col md:flex-row md:space-x-0 mx-1 lg:flex-col'>
                            <div className='mx-5 flex flex-col md:flex-row space-x-0 space-y-2 md:space-y-0 md:space-x-3 pt-5'>
                                <input type='text' className={inputStyle} placeholder='Max' />
                                <input type='text' className={inputStyle} placeholder='Min' />
                            </div>
                            <div className='flex justify-center'>
                                <button className='mx-0 md:mx-2 border bg-[#FF0000] mt-[19px] w-full lg:w-64 h-10 
                                    text-white border-none rounded-lg font-bold text-md p-1 mb-5'>
                                    {width == 768 ? <Search /> : 'Apply filters'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full'>
                        <div className='flex flex-row justify-between  bg-white border border-[#e52320] mb-3 p-2 pl-5' data-aos="fade-left">
                            <h1 className='text-xl font-bold'>{filterData?.length > 0 ? filterData?.length : productsCount} Results</h1>
                        </div>
                        {productData?.map((product: any, i: number) => (
                            <div className='flex flex-row justify-between bg-white border border-gray-300 rounded-sm mb-5' key={i}>
                                <div className='bg-blue-500 md:bg-green-500 lg:bg-red-500'>
                                    <Link href={`/product-details/${product?._id}`}>
                                        <img className='w-64 h-48' src={product?.images[0]} alt="" />
                                    </Link>
                                </div>
                                <div className='space-y-1 p-0 pl-1 md:p-3 w-40 md:w-[500px]'>
                                    <Link href={`/product-details/${product?._id}`}>
                                        <h1 className={`${newWidth < 370 ? 'text-[11px]' : 'text-[12px] md:text-lg lg:text-2xl'} font-bold hover:text-[#FF0000]`}>{product?.title}</h1>
                                    </Link>
                                    <h2 className={`${newWidth < 370 ? 'text-[9px]' : 'text-[10px] md:text-base'}`}>{product?.category}</h2>
                                    <h3 className='text-[10px] md:text-base w-[100px] md:w-auto truncate'>{product?.address}</h3>
                                    <h1 className={`${newWidth < 370 ? 'text-[9px]' : 'md:text-lg text-[12px]'} text-[#FF0000] font-semibold`}>CHF {product?.price}</h1>
                                    <h2 className={`${newWidth < 370 ? 'text-[7px]' : 'text-[10px] md:text-sm'} text-gray-500  font-semibold`}>EURO {product?.price * 2.1}</h2>
                                </div >
                                <div className='pr-1'>
                                    <ul className={`${newWidth < 370 ? 'space-y-[-8.5px]' : 'space-y-[-7.5px] md:space-y-0 lg:space-y-3'}`}>
                                        {logo?.map((log: any, i: number) => (
                                            <li key={i}>{log.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        ))}
                        {filterData?.length == 0 &&
                            <div className={`flex flex-row justify-between bg-white h-12 border border-[#e52320] rounded-sm px-5 py-2`} data-aos="fade-up">
                                <button className={btnStyle} onClick={previousHandle}>
                                    <KeyboardDoubleArrowLeft className={logoStyle} />
                                    <span className={spanStyle}>Previous</span>
                                </button>
                                <div className='flex flex-row space-x-4'>
                                    {pagination().map((li: any, i: number) => (
                                        <button className={`${page === li && 'bg-[#e52320] w-6 md:w-8 text-white text-[12px] border-none rounded-sm'} pt-[2px] text-[12px] md:text-lg`} key={i} onClick={() => setPage(li)}>{li}</button>
                                    ))}
                                </div>
                                <button className={btnStyle} onClick={nextHandle}>
                                    <span className={spanStyle}>Next</span>
                                    <KeyboardDoubleArrowRight className={logoStyle} />
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </Home>
        </div>
    )
}
