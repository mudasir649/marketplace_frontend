'use client';
import AdvanceSearch from '@/components/AdvanceSearch';
import Home from '@/app/Home'
import { setProductData, setProductsCount } from '@/store/appSlice';
import axios from 'axios';
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {

    const { type } = useParams();

    const { page } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();

    const subCategory = type == 'Bicycles' ? 'Bicycles' :
        type == 'E-scooter' ? 'E-scooter' :
            type == 'E-bikes' ? 'E-bikes' :
                type == 'Motorcycle' ? 'Motorcycle' : '';
    const [brands, setBrands] = useState<string>("");


    useEffect(() => {
        if (!subCategory) {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/searchRecord?page=${page}&&category=${type}`);
                dispatch(setProductData(res.data?.data?.ad));
                dispatch(setProductsCount(res.data?.data?.totalAds));
            }
            fetchData()
        } else {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/searchRecord?page=${page}&&subCategory=${subCategory}`);
                dispatch(setProductData(res.data?.data?.ad));
                dispatch(setProductsCount(res.data?.data?.totalAds));
            }
            fetchData()
        }
        const fetchBrand = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleMake/${type}`);
            setBrands(res.data?.data)
        }
        fetchBrand()
    }, [page, type, subCategory, dispatch]);


    return (
        <AdvanceSearch
            category={type}
            subCategory={subCategory}
            brands={brands}
        />
    )
}
