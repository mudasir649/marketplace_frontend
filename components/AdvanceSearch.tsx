/* eslint-disable @next/next/no-img-element */
'use client'
import Home from '@/components/Home';
import { AirportShuttle, ArrowForward, ArrowForwardIos, BuildCircle, Chat, Circle, DataSaverOn, DirectionsBike, DirectionsBoat, DirectionsBus, DirectionsCar, ExpandLess, ExpandMore, FireTruck, Flight, KeyboardArrowLeft, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, PhoneEnabled, PrecisionManufacturing, RemoveRedEye, RvHookup, Search, Share } from '@mui/icons-material';
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import ReactStars from "react-stars";
import useWindowDimensions from '@/utils/useWindowDimensions';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { conditionList, sortByList, subList } from '@/utils/dataVariables';
import { setPage, setProductData, setProductsCount } from '@/store/appSlice';
import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { Theme } from '@mui/material';

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


interface IList {
    logo: any,
    name: string,
    quantity: number
}

interface IFilterSearch {
    condition: string,
    brand: string,
    minPrice: any,
    maxPrice: any
}

interface IRating {
    name: string,
    value: number
}


export default function AdvanceSearch({ category, subCategory, brands }: any) {

    // Redux hooks
    const { page, productsCount, productData } = useSelector((state: any) => state.app);
    const [loading, setLoading] = useState<Boolean>(false);
    const [sortByLoading, setSortByLoading] = useState<Boolean>(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    const { width, height } = useWindowDimensions();
    const newWidth = width || 0;
    const newHeight = height || 0;

    const [filtersData, setFiltersData] = useState<IFilterSearch>({
        condition: null || '',
        brand: null || '',
        minPrice: null || '',
        maxPrice: null || ''
    })
    const { filterData } = useSelector((state: any) => state.app);
    const router = useRouter();

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
            dispatch(setPage(page - 1));
        } else {
            return;
        }
    }


    const nextHandle = () => {
        if (page !== pagination().length) {
            dispatch(setPage(page + 1));
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

    const handleSearch = async (value: any) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${value}`);
        dispatch(setProductData(res.data?.data.ad));
        dispatch(setProductsCount(res.data?.data.totalAds));
        router.push(`/advance-search/${value}`)
    }

    const handleFilterData = (e: any) => {
        setFiltersData({ ...filtersData, [e.target.name]: e.target.value });
    }

    const inputStyle = 'border border-gray-300 hover:border-red-600 focus:outline-red-600 rounded-sm w-32 lg:w-32 h-10 p-2 cursor-pointer';
    const logoStyle = newWidth < 370 ? 'text-[#FF0000] text-[10px] cursor-pointer' : 'text-[#FF0000] text-[15px] md:text-xl cursor-pointer';
    const btnStyle = `font-semibold hover:text-[#FF0000] text-gray-500`;
    const btnStyle1 = `font-semibold border border-red-400 bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000] p-2 h-10 w-full`;
    const spanStyle = newWidth < 370 ? 'text-[10px] cursor-pointer font-bold' : 'text-[12px] cursor-pointer font-bold';

    async function applyFilter() {
        const { brand, condition, minPrice, maxPrice } = filtersData;
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/advance-search-filter?page=${page}&&condition=${condition}&&brand=${brand}&&minPrice=${minPrice}&&maxPrice=${maxPrice}`);
            dispatch(setProductData(res.data?.data?.ad));
            dispatch(setProductsCount(res.data?.data?.totalAds));
            router.push(`/advance-search/mainFilter`)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
        setLoading(false)
    }

    const handleSortBy = async (e: any) => {
        const { value } = e.target;
        setSortByLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/advance-search-filter?page=${page}&&sortBy=${value}`);
            dispatch(setProductData(res.data?.data?.ad));
            dispatch(setProductsCount(res.data?.data?.totalAds));
            setSortByLoading(false);
        } catch (error) {
            setSortByLoading(false);
            console.log(error);
        }
        setSortByLoading(false);
    }

    console.log(productData);


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
                <div className='container mx-auto flex flex-col lg:flex-row mt-5 lg:mt-10 space-y-3 lg:space-y-0 lg:space-x-3 w-full mb-[500px]'>
                    <div className='bg-white shadow-lg border rounded-md w-full lg:w-[400px] h-full p-2' data-aos="fade-right">
                        <div className='border-b flex flex-row justify-between p-2'>
                            <h1 className='text-lg font-bold'>Category</h1>
                        </div>
                        <div className='transition ease-in-out duration-100 mb-10'>
                            <h1 className='pl-1 pt-2  text-lg font-semibold'>All Categories</h1>
                            <ul className='space-y-3 mt-2 mx-1'>
                                {categoryList?.map((list: IList, i: number) => (
                                    <><li onClick={() => handleSearch(list?.name)} className={`${category == list?.name ? 'text-[#FF0000]' : list?.name == 'Bikes' && subCategory ? 'text-[#FF0000]' : 'hover:text-[#FF0000] cursor-pointer'}`} key={i}>{list.logo} {list.name} {category == list?.name ? `(${productsCount})` : ''}</li>
                                        {(category == 'Bikes' || subCategory) && list?.name == "Bikes" && subList?.map((list: any, i: any) => (
                                            <li className={`ml-5 cursor-pointer ${list?.name == subCategory ? 'text-[#FF0000]' : 'hover:text-[#FF0000]'}`} onClick={() => handleSearch(list?.name)} key={i}> <span className='text-[#FF0000]'>{`> `}</span>{list?.name} {subCategory == list?.name && `(${productsCount})`}</li>
                                        ))}
                                    </>
                                ))}
                            </ul>
                        </div>
                        {category && <>
                            <div className='border-b flex flex-row justify-between p-2 mb-4'>
                                <h1 className='text-lg font-bold'>Condition</h1>
                            </div>
                            <ul className='space-y-2 mx-3 mb-3'>
                                {conditionList?.map((list: any, i: number) => (
                                    <li key={i}><input type="radio"
                                        name='condition'
                                        key={i}
                                        value={list?.value}
                                        onChange={(e: any) => handleFilterData(e)}
                                    />  {list?.name}</li>
                                ))}
                            </ul>
                        </>}
                        {brands &&
                            <>
                                <div className='border-b flex flex-row justify-between p-2 mb-4'>
                                    <h1 className='text-lg font-bold'>Brand</h1>
                                </div>
                                <div>
                                    <select
                                        className="block mb-4 appearance-none w-full bg-white border rounded-sm border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                        name='brand'
                                        onChange={(e: any) => handleFilterData(e)}
                                    >
                                        <option value="option1">Select Brand</option>
                                        {brands?.make.map((brand: any, i: number) => (
                                            <option value={brand} key={i}>{brand}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        }
                        <div className='border-b flex flex-row justify-between p-2'>
                            <h1 className='text-lg font-bold'>Price Range</h1>
                        </div>
                        <div className='grid grid-col-3 mt-4 space-y-3'>
                            <div className='h-auto w-auto space-x-4 mx-1'>
                                <input type='text' name='maxPrice'
                                    value={filtersData.maxPrice}
                                    className={inputStyle} placeholder='Max Price'
                                    onChange={(e: any) => handleFilterData(e)}
                                />
                                <input type='text'
                                    className={inputStyle}
                                    name='minPrice'
                                    value={filtersData.minPrice}
                                    placeholder='Min Price'
                                    onChange={(e: any) => handleFilterData(e)}
                                />
                            </div>
                            <div className='h-auto w-full space-x-4'>
                                <button className={btnStyle1} onClick={applyFilter}>Apply Filter</button>
                            </div>
                            {brands && <div className='h-auto w-full space-x-4'>
                                <button className={btnStyle1} onClick={() => { router.push('/advance-search') }}>Clear Filter</button>
                            </div>}
                        </div>
                    </div>
                    {loading ?
                        <>
                            <div className={`${classes.root} flex justify-center`}>
                                <CircularProgress color="secondary" />
                            </div>
                        </>
                        :
                        <>{productData?.length > 0 ?
                            <div className='flex flex-col w-full h-full'>
                                <div className='flex flex-row justify-between  bg-white border border-[#e52320] mb-3 p-2 pl-5' data-aos="fade-left">
                                    <div className=''>
                                        <h1 className='text-xl font-bold'>{productsCount} Results</h1>
                                    </div>
                                    <div className=''>
                                        <select
                                            className="block appearance-none w-72 bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                            name='sort'
                                            onChange={(e: any) => handleSortBy(e)}
                                        >
                                            {sortByList.map((list: any, i: number) => (
                                                <option className='my-1' value={list} key={i}>{list}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {sortByLoading ?
                                    <>
                                        <div className={`${classes.root} flex justify-center my-5`}>
                                            <CircularProgress color="secondary" />
                                        </div>
                                    </>
                                    :
                                    <>
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
                                                    <h3 className='text-[10px] md:text-base w-[100px] md:w-auto overflow-hidden'>{product?.address}</h3>
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
                                    </>
                                }
                                <div className={`flex flex-row justify-between bg-white h-12 border border-[#e52320] rounded-sm px-5 py-2`} data-aos="fade-up">
                                    <button className={btnStyle} onClick={previousHandle}>
                                        <KeyboardDoubleArrowLeft className={logoStyle} />
                                        <span className={spanStyle}>Previous</span>
                                    </button>
                                    <div className='flex flex-row space-x-4'>
                                        {pagination().map((li: any, i: number) => (
                                            <button className={`${page === li && 'bg-[#e52320] w-6 md:w-8 text-white text-[12px] border-none rounded-sm'} pt-[2px] text-[12px] md:text-lg`} key={i} onClick={() => dispatch(setPage(li))}>{li}</button>
                                        ))}
                                    </div>
                                    <button className={btnStyle} onClick={nextHandle}>
                                        <span className={spanStyle}>Next</span>
                                        <KeyboardDoubleArrowRight className={logoStyle} />
                                    </button>
                                </div>
                            </div>
                            :
                            <div className='flex w-full justify-center'>
                                <h1 className='text-xl font-bold'>No Record found...</h1>
                            </div>
                        }
                        </>
                    }
                </div>
            </Home>
        </div>
    )
}
