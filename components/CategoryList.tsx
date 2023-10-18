import { setProductData, setProductsCount } from '@/store/appSlice';
import { partsSubList, subList } from '@/utils/dataVariables';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'; 


export default function CategoryList({ setCategory, setExpand }: any) {
    const { t } = useTranslation(); // Initialize the translation hook

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
                <li onClick={() => handleClick("Autos")} className={liStyle}>  {t('categories.0')}
</li>
                <li className={`dropdow`}>
                    <h1 onClick={() => handleClick("Bikes")} className={liStyle}>{t('categories.1')}</h1>
                    <div className='absolute hidden ml-[190px] mt-[-30px] bg-white w-auto h-auto p-2 border-none rounded-sm dropdow-menu'>
                        <ul className='block'>
                            {subList?.map((list: any, i: number) => (
                                <li className={liStyle} onClick={() => handleClick(list.name)} key={i}>{list.name}</li>
                            ))}
                        </ul>
                    </div>
                </li>
                <li onClick={() => handleClick("Boats")} className={liStyle}>
                {t('categories.2')}
                </li >
                <li onClick={() => handleClick("Busses")} className={liStyle}>
                {t('categories.3')}
                </li>
                <li onClick={() => handleClick("Construction Machines")} className={liStyle}>
                {t('categories.4')}
                </li>
                <li onClick={() => handleClick("Drones")} className={liStyle}>
                {t('categories.5')}
                </li>
                <li className='dropdow'>
                    <h1 className={liStyle}>{t('categories.6')}</h1>
                    <div className='absolute hidden ml-[190px] mt-[-30px] bg-white w-full h-auto p-2 border-none rounded-sm dropdow-menu'>
                        <ul className='block mx-2'>
                            {partsSubList?.map((list: any, i: number) => (
                                <li className={liStyle} onClick={() => handleClick(list.name)} key={i}>{list.name}</li>
                            ))}
                        </ul>
                    </div>
                </li>
                <li onClick={() => handleClick("Trailers")} className={liStyle}>
                {t('categories.7')}
                </li>
                <li onClick={() => handleClick("Trucks")} className={liStyle}>
                {t('categories.8')}
                </li>
                <li onClick={() => handleClick("Vans")} className={liStyle}>
                {t('categories.9')}
                </li>
                <li onClick={() => handleClick("Trailers")} className={liStyle}>
                {t('categories.10')}
                </li>
            </ul>
        </div>
    )
}
