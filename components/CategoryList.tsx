import { setProductData, setProductsCount } from '@/store/appSlice';
import { partsSubList, subList } from '@/utils/dataVariables';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function CategoryList({ setCategory, setExpand }: any) {

    const { page } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();

    const liStyle = 'hover:text-[#FF0000] border-b border-gray-200';
    const router = useRouter();
    const handleClick = async (value: any) => {
        // setCategory(value);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${value}`);
            dispatch(setProductData(res.data?.data.ad));
            dispatch(setProductsCount(res.data?.data.totalAds));
            router.push(`/advance-search/${value}`)
        } catch (error) {

        }
        router.push(`/advance-search/${value}`)
        setExpand(false);
    }
    return (
        <div>
            <ul className='text-gray-500 space-y-1 cursor-pointer dropdow-menu z-10'>
                <li onClick={() => handleClick("Autos")} className={liStyle}>Autos</li>
                <li className={`dropdow`}>
                    <h1 onClick={() => handleClick("Bikes")} className={liStyle}>Bikes</h1>
                    <div className='absolute hidden ml-[190px] mt-[-30px] bg-white w-auto h-auto p-2 border-none rounded-sm dropdow-menu'>
                        <ul className='block'>
                            {subList?.map((list: any, i: number) => (
                                <li className={liStyle} onClick={() => handleClick(list.name)} key={i}>{list.name}</li>
                            ))}
                        </ul>
                    </div>
                </li>
                <li onClick={() => handleClick("Boats")} className={liStyle}>
                    Boats
                </li >
                <li onClick={() => handleClick("Busses")} className={liStyle}>
                    Busses
                </li>
                <li onClick={() => handleClick("Construction Machines")} className={liStyle}>
                    Construction Machines
                </li>
                <li onClick={() => handleClick("Drones")} className={liStyle}>
                    Drones
                </li>
                <li className='dropdow'>
                    <h1 className={liStyle}>Parts</h1>
                    <div className='absolute hidden ml-[190px] mt-[-30px] bg-white w-full h-auto p-2 border-none rounded-sm dropdow-menu'>
                        <ul className='block mx-2'>
                            {partsSubList?.map((list: any, i: number) => (
                                <li className={liStyle} onClick={() => handleClick(list.name)} key={i}>{list.name}</li>
                            ))}
                        </ul>
                    </div>
                </li>
                <li onClick={() => handleClick("Trailers")} className={liStyle}>
                    Trailers
                </li>
                <li onClick={() => handleClick("Trucks")} className={liStyle}>
                    Trucks
                </li>
                <li onClick={() => handleClick("Vans")} className={liStyle}>
                    Vans
                </li>
                <li onClick={() => handleClick("Trailers")} className={liStyle}>
                    Others
                </li>
            </ul>
        </div>
    )
}
