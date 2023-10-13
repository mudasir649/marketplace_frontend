/* eslint-disable @next/next/no-img-element */
'use client'
import Home from '@/components/Home';
import {
    AirportShuttle, BuildCircle, Chat, DataSaverOn, DirectionsBike, DirectionsBoat, DirectionsBus,
    DirectionsCar, Favorite, FireTruck, Flight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, LocationOn, PhoneEnabled,
    PrecisionManufacturing, RemoveRedEye, RvHookup, Search, Share
} from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import useWindowDimensions from '@/utils/useWindowDimensions';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { conditionList, sortByList, subList } from '@/utils/dataVariables';
import { setPage, setProductId, setShowShare } from '@/store/appSlice';
import addInvertedComma from '@/utils/addInvertedComma';
import ProductList from './ProductList';
import { faClock, faMessage } from "@fortawesome/free-solid-svg-icons";
import showDate from '@/utils/showDate';


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


export default function AdvanceSearch({ category, subCategory, brands, productsCount, productData, setProductData, setProductsCount }: any) {

    // Redux hooks
    const { page, address, title } = useSelector((state: any) => state.app);
    const [fav, setFav] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const [sortByLoading, setSortByLoading] = useState<Boolean>(false);
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: any) => state.auth);
    const userId = userInfo?.data?.userDetails?._id;


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
            name: "Construction Machine",
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
        dispatch(setPage(1))
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
        setLoading(true);
        if (pathname == '/advance-search/search') {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&address=${address}&title=${title}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
                setProductData(res.data?.data?.ad);
                setProductsCount(res.data?.data?.totalAds);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        } else {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${category}&condition=${condition}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
                setProductData(res.data?.data?.ad);
                setProductsCount(res.data?.data?.totalAds);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        setLoading(false)
    }


    const handleSortBy = async (e: any) => {
        const { value } = e.target;
        setSortByLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${category}&sortBy=${value}`);
            setProductData(res.data?.data?.ad);
            setProductsCount(res.data?.data?.totalAds);
            setSortByLoading(false);
        } catch (error) {
            setSortByLoading(false);
            console.log(error);
        }
        setSortByLoading(false);
    }

    const adFavorite = async (productId: any) => {
        if (userInfo === null) {
            router.push('/login')
        } else {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/setFavorite/${productId}/${userId}`);
            if (res.status == 201) {
                setFav(true)
            } else {
                setFav(false)
            }
        }
    }

    const handleShare = (productId: any) => {
        dispatch(setShowShare(true))
        dispatch(setProductId(productId))
    }

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
                            <div className="spinner mt-8 w-10 h-10"></div>
                        </>
                        :
                        <>{productData?.length > 0 ?
                            <div className='flex flex-col w-full h-full'>
                                <div className='flex flex-row justify-between  bg-white border border-[#e52320] mb-3 p-2 pl-5' data-aos="fade-left">
                                    <div className=''>
                                        <h1 className='text-xl font-bold'>{productsCount} Results</h1>
                                    </div>
                                    {!category ? ''
                                        :
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
                                    }
                                </div>
                                {sortByLoading ?
                                    <>
                                        <div className="spinner mt-8 w-10 h-10"></div>
                                    </>
                                    :
                                    newWidth <= 550 ?
                                        <ProductList productList={productData} />
                                        :
                                        <>
                                            {productData?.map((product: any, i: number) => (
                                                <div className='grid grid-cols-3 h-52 mb-10 bg-white' key={i}>
                                                    <Link href={`/product-details/${product?._id}`}>
                                                        <div className='w-60 lg:w-auto p-2'>
                                                            <div className='flex justify-center bg-gray-50 w-full h-48 border-none rounded-lg'>
                                                                <img src={product?.images[0]} className='h-auto w-auto object-fill border-none rounded-lg' alt="" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div className='w-full col-span-2 p-2'>
                                                        <div className='flex flex-row justify-between'>
                                                            <Link href={`/product-details/${product?._id}`}>
                                                                <h2 className=' text-[22px] text-black font-bold cursor-pointer hover:text-[#FF0000]'>{product?.title}</h2>
                                                            </Link>
                                                            <h1 className='bg-[#FF0000] text-center text-white w-16 h-8 p-1 border-none rounded-xl'>{product?.category}</h1>
                                                        </div>
                                                        <div className='mt-3 space-y-1'>
                                                            {product?.price ?
                                                                <>
                                                                    <h1 className='text-[17px] text-[#FF0000] font-semibold'>CHF {addInvertedComma(product?.price)}</h1>
                                                                    <h1 className='text-[12px] text-gray-400 font-semibold'>EURO {addInvertedComma(product?.price * 2)}</h1>
                                                                </>
                                                                :
                                                                <>
                                                                    <h1 className='bg-black text-white text-center py-2 w-36 h-10 border-none rounded-lg text-[16px] font-semibold'>Contact For Price</h1>
                                                                </>
                                                            }
                                                        </div>
                                                        <div className='flex flex-row justify-between mt-5'>
                                                            <h1 className='lg:w-[410px] truncate'>{product?.address}</h1>
                                                            <h1 className='text-sm w-auto line-clamp-2 mr-[10px] lg:mr-0'>{showDate(product?.createdAt) < 2 ?
                                                                <>
                                                                    <div className='bg-green-600 text-white rounded-full px-3 text-center'>{'new'}</div></>
                                                                :
                                                                <div className='text-[sm] mt-[0.5px]'>
                                                                    <FontAwesomeIcon icon={faClock} /> {Number.isNaN(showDate(product?.createdAt)) ? '0 days ago' : `${showDate(product?.createdAt)} days ago`}
                                                                </div>
                                                            }</h1>
                                                        </div>
                                                        <div className={`flex justify-between space-x-4 mt-3 text-gray-600 h-10 border-t-2 pt-2 w-full`}>
                                                            <div className='space-x-4 mt-1'>
                                                                <Share
                                                                    onClick={() => handleShare(product?._id)}
                                                                    className='cursor-pointer text-gray-400 mt-[-5px]'
                                                                />
                                                                <FontAwesomeIcon className='cursor-pointer text-gray-400 text-[20px]' icon={faMessage} />
                                                                <Favorite className={`${fav ? 'text-[#FF0000]' : 'text-gray-300'} mt-[-5px] cursor-pointer`} onClick={() => adFavorite(product?._id)} />
                                                            </div>
                                                            <div className='flex flex-row space-x-3'>
                                                                <RemoveRedEye className="text-gray-500 " />
                                                                <h1>{product?.views}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                }
                                <div className={`flex flex-row justify-between bg-white h-12 border border-[#e52320] rounded-sm px-5 py-2`}>
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


