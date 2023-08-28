'use client'
import Home from '@/components/Home';
import { AirportShuttle, BuildCircle, DataSaverOn, DirectionsBike, DirectionsBoat, DirectionsBus, DirectionsCar, ExpandLess, ExpandMore, FireTruck, Flight, KeyboardArrowLeft, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, PrecisionManufacturing, RvHookup } from '@mui/icons-material';
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import "./advanceSearch.css";
import ReactStars from "react-stars";
import { expandStyle, ratingList } from "../../utils/localVariables";
import productData from '@/utils/data';

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

    const inputStyle = 'border border-gray-300 hover:border-red-600 focus:outline-red-600 rounded-md w-32 h-10 p-2 cursor-pointer';
    const logoStyle = 'text-red-600 cursor-pointer';
    const btnStyle = 'text-md font-semibold hover:text-red-600 text-gray-500';
    const spanStyle = 'pt-[0.5px] text-sm cursor-pointer font-bold';

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
    }

    console.log(page);


    return (
        <div>
            <Home>
                <div className='container mx-auto flex flex-col lg:flex-row mt-56 lg:mt-0 space-y-3 lg:space-y-0 lg:space-x-3 w-full mb-[500px]'>
                    <div className='bg-white shadow-lg border rounded-md w-full lg:w-[400px] h-full p-2'>
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
                        <div>
                            {productData?.map((product: any, i: number) => (
                                <div className={`bg-red-600 h-52 ${i !== 0 ? 'my-5' : 'my-0'}`} key={i}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-row justify-between bg-white h-12 border border-red-600 rounded-sm px-5 py-2'>
                            <button className={btnStyle} onClick={previousHandle}>
                                <KeyboardDoubleArrowLeft className={logoStyle} />
                                <span className={spanStyle}>Previous</span>
                            </button>
                            <div className='flex flex-row space-x-4'>
                                {paginationList?.map((li: any, i: number) => (
                                    <button className={`${page === li && 'bg-red-600 w-8 text-white border-none rounded-sm'}`} key={i} onClick={() => setPage(li)}>{li}</button>
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
