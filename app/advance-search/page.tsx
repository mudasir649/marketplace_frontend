'use client'
import Home from '@/components/Home';
import { AirportShuttle, BuildCircle, Chat, DataSaverOn, DirectionsBike, DirectionsBoat, DirectionsBus, DirectionsCar, ExpandLess, ExpandMore, FireTruck, Flight, KeyboardArrowLeft, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, PhoneEnabled, PrecisionManufacturing, RemoveRedEye, RvHookup, Share } from '@mui/icons-material';
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import "./advanceSearch.css";
import ReactStars from "react-stars";
import { btnStyle, expandStyle, inputStyle, logoStyle, logoStyle1, ratingList, spanStyle } from "../../utils/localVariables";
import productData from '@/utils/data';
import Image from 'next/image';
import useWindowDimensions from '@/utils/useWindowDimensions';

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

    const paginationList = [1, 2, 3, 4, 5, 6];
    const [page, setPage] = useState<number>(1);

    const previousHandle = () => {
        if (page !== 1) {
            setPage(page - 1);
        } else {
            return;
        }
    }


    const nextHandle = () => {
        if (paginationList.length !== page) {
            setPage(page + 1);
        } else {
            return;
        }
    };

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
            name: 123
        }
    ];

    const { width, height } = useWindowDimensions();

    const newWidth = width || 0;
    const newHeight = height || 0;

    return (
        <div>
            <Home>
                <div className='container mx-auto flex flex-col lg:flex-row mt-56 lg:mt-0 space-y-3 lg:space-y-0 lg:space-x-3 w-full mb-[500px]'>
                    <div className='bg-white shadow-lg border rounded-md w-full lg:w-[400px] h-full p-2' data-aos="fade-right">
                        <div className='border-b flex flex-row justify-between p-2'>
                            <h1 className='text-lg font-bold'>Category</h1>
                        </div>
                        <div className='transition ease-in-out duration-100 mb-10'>
                            <h1 className='pl-1 pt-2  text-lg font-semibold'>All Categories</h1>
                            <ul className='space-y-3 mt-2 mx-1'>
                                {categoryList?.map((list: IList, i: number) => (
                                    <li className='hover:text-red-600 cursor-pointer' key={i}>{list.logo} {list.name} {`(${list.quantity})`}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='border-b flex flex-row justify-between p-2'>
                            <h1 className='text-lg font-bold'>Ratings</h1>
                        </div>
                        <div className='mb-5'>
                            <ul className='space-y-3 mt-2 mx-1'>
                                {ratingList?.map((list: IRating, i: number) => (
                                    <li className='flex flex-row space-x-2' key={i}>
                                        <ReactStar value={list?.value} />
                                        <span className='pt-[6px]'> {list.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='border-b flex flex-row justify-between p-2'>
                            <h1 className='text-lg font-bold'>Price Range</h1>
                        </div>
                        <div className='mx-5 flex flex-row space-x-3 pt-5'>
                            <input type='text' className={inputStyle} placeholder='Max' />
                            <input type='text' className={inputStyle} placeholder='Min' />
                        </div>
                        <button className='mx-7 border bg-red-600 mt-4 w-64 h-10 
                            text-white border-none rounded-lg font-bold text-lg mb-5'>Apply filters</button>
                    </div>
                    <div className='flex flex-col w-full h-full'>
                        <div className='flex flex-row justify-between  bg-white border border-[#e52320] mb-3 p-2 pl-5' data-aos="fade-left">
                            <h1 className='text-xl font-bold'>{productData.length} Results</h1>
                            <span className='text-md font-semibold'>showing results from 1 to 10 of {productData?.length}</span>
                        </div>
                        <div className='' data-aos="fade-up">
                            {productData?.map((product: any, i: number) => (
                                <div className={`flex flex-row justify-between hover:shadow-lg bg-white border border-gray-300 rounded-md  hover:border-[#e52320] ${i !== 0 ? 'my-5' : 'my-0'}`} key={i}>
                                    <div className='flex flex-row space-x-1 md:space-x-5'>
                                        <div className='w-44 md:w-auto'>
                                            <Image
                                                className='p-1 md:p-0 mt-1 md:mt-0 border-none rounded-tl-md rounded-bl-md'
                                                src={product?.image}
                                                alt="main picture"
                                                width={250}
                                                height={300}
                                            />
                                        </div>
                                        <div className='mt-1 md:mt-0'>
                                            <h1 className={`text-[13px] ${height === 800 ? 'text-[20px]' : 'md:text-2xl'} cursor-pointer hover:text-[#e52320] font-bold`}>{product?.name}</h1>
                                            <p className={`text-[10px] ${height === 800 ? 'text-[15px]' : 'md:text-lg'}`}>{product?.type}</p>
                                            <p className={`text-[10px] ${height === 800 ? 'text-[15px]' : 'md:text-lg'} cursor-pointer hover:text-[#e52320]`}>{product?.address}</p>
                                            <p className={`mt-1 text-md ${height === 800 ? 'text-[15px]' : 'md:text-lg'} font-bold text-[#e52320]`}>CHF {product?.price}</p>
                                            <p className={`text-sm ${height === 800 ? 'text-[13px]' : 'md:text-md'} font-bold text-gray-400`}>CHF {product?.price}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <ul className='flex flex-col space-y-2 text-[10px] md:text-[13px] p-1 md:p-2'>
                                            {logo?.map((li: any, i: any) => (
                                                <li className='cursor-pointer hover:text-[#e52320]' key={i}>{li.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-row justify-between bg-white h-12 border border-[#e52320] rounded-sm px-5 py-2' data-aos="fade-up">
                            <button className={btnStyle} onClick={previousHandle}>
                                <KeyboardDoubleArrowLeft className={logoStyle} />
                                <span className={spanStyle}>Previous</span>
                            </button>
                            <div className='flex flex-row space-x-4'>
                                {paginationList?.map((li: any, i: number) => (
                                    <button className={`${page === li && 'bg-[#e52320] w-8 text-white border-none rounded-sm'}`} key={i} onClick={() => setPage(li)}>{li}</button>
                                ))}
                            </div>
                            <button className={btnStyle} onClick={nextHandle}>
                                <span className={spanStyle}>Next</span>
                                <KeyboardDoubleArrowRight className={logoStyle} />
                            </button>
                        </div>
                    </div>
                </div>
            </Home>
        </div>
    )
}
