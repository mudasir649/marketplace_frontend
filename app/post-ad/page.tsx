'use client';
import Home from '@/components/Home';
import { ExpandMore, PlaylistAdd } from '@mui/icons-material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './post-ad.css';
import { partsSubList } from '@/utils/dataVariables';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
export default function PostAd() {

    const { t } = useTranslation();

    const list = [
        {
            name: t('categories.0'),
            name1: "Autos",
        },
        {
            name: t('categories.1'),
            name1: "Bikes",
        },
        {
            name: t('categories.2'),
            name1: "Boats",
        },
        {
            name: t('categories.3'),
            name1: "Busses",
        },
        {
            name: t('categories.4'),
            name1: "Construction Machines",
        },
        {
            name: t('categories.5'),
            name1: "Drones",
        },
        {
            name: t('categories.6'),
            name1: "Others",
        },
        {
            name: t('categories.7'),
            name1: "Parts",
        },
        {
            name: t('categories.8'),
            name1: "Trailers",
        },
        {
            name: t('categories.9'),
            name1: "Trucks",
        },
        {
            name: t('categories.10'),
            name1: "Vans",
        },
    ];
    const subList = [
        {
            name: t('subList.0'),
            name1:'Bicycles'
        },
        {
            name: t('subList.1'),
            name1:'E-scooter'
        },
        {
            name: t('subList.2'),
            name1:'E-bikes'
        },
        {
            name: t('subList.3'),
            name1:'Motorcycle'
        },
    ];

    const partsSubList = [
        {
          name: t("categoriesParts.0"),
          name1: "Auto Parts",
        },
        {
          name: t("categoriesParts.1"),
          name1: "Bike Parts",
        },
        {
          name: t("categoriesParts.2"),
          name1: "Boat Parts",
        },
        {
          name: t("categoriesParts.3"),
          name1: "Bus Parts",
        },
        {
          name: t("categoriesParts.4"),
          name1: "Construction Machine Parts",
        },
        {
          name: t("categoriesParts.5"),
          name1: "Drone Parts",
        },
        {
          name: t("categoriesParts.6"),
          name1: "Other Parts",
        },
        {
          name: t("categoriesParts.7"),
          name1: "Trailer Parts",
        },
        {
          name: t("categoriesParts.8"),
          name1: "Truck Parts",
        },
        {
          name: t("categoriesParts.9"),
          name1: "Van Parts",
        },
      ];
    

    const router = useRouter();

    const { userInfo } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (userInfo === null) {
            router.push('/login')
        }
    }, [userInfo, router]);

    const [open, isOpen] = useState<Boolean>(false);
    const [openSub, isOpenSub] = useState<Boolean>(false);
    const [showSub, setShowSub] = useState<Boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [subCategory, setSubCategory] = useState<string>('');

    const handleCategory = (value: any) => {
        setCategory(value);
        if (value == 'Bikes' || value == "Parts") {
            setShowSub(true);
        }
        else {
            router.push(`/post-ad/${value}`);
        }
    }

    const handleSubCategory = (value: any) => {
        setSubCategory(value);
        router.push(`/post-ad/${value}`)
    }

    if (userInfo !== null) {
        return (
            <Home>
                <div className='container mx-auto mb-20 mt-10'>
                    <div className='border-none box-container bg-white rounded-sm h-full p-3'>
                        <div className='container mx-auto'>
                            <h1 className='space-x-3 border-b-2 pb-3'><PlaylistAdd className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>{t('postAd.selectCategory')}</span></h1>
                        </div>
                        <div className='container mx-0 mt-6 lg:mx-20 w-auto'>
                            <div className='flex flex-col md:flex-row justify-end space-x-0 md:space-x-20 space-y-2 md:space-y-0 mb-5 mt-5'>
                                <h1 className={`flex flex-row space-x-1 text-md font-bold ${showSub && 'w-40'}`}>{t('postAd.category')} <span className='text-[#FF0000]'>*</span></h1>
                                <div className='w-full flex'>
                                    <select
                                    className="custom-select w-full block appearance-none bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                    name="brand"
                                    onChange={(e: any) => handleCategory(e.target.value)}
                                    >
                                        <option className='w-full p-2'>{t('postAd.selectCategory')}</option>
                                        {list?.map((lst:any, i: number) => (
                                            <option value={lst.name1} key={i}>{lst.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {showSub &&
                                <div className='flex flex-col md:flex-row justify-end space-x-0 md:space-x-20 space-y-2 md:space-y-0 mb-5 mt-5'>
                                    <h1 className='flex flex-row space-x-1 text-md font-bold w-40 whitespace-nowrap truncate'>{t('postAd.subCategory')} <span className='text-[#FF0000]'>*</span></h1>
                                    <div className='flex flex-col hover:border-red-500 w-full rounded-sm h-10'
                                        onClick={() => isOpenSub(!openSub)}
                                    >
                                        <div className='flex flex-row' >
                                            <select
                                    className="custom-select w-full block appearance-none bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                    name="brand"
                                    onChange={(e: any) => handleSubCategory(e.target.value)}
                                    >
                                        <option className='w-full p-2'>{t('postAd.selectCategory')}</option>
                                        { category == 'Bikes' ? subList?.map((lst:any, i: number) => (
                                            <option value={lst.name1} key={i}>{lst.name}</option>
                                        )) : partsSubList?.map((lst:any, i: number) => (
                                            <option value={lst.name1} key={i}>{lst.name}</option>
                                        )) }
                                    </select>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Home>
        )
    }
}
