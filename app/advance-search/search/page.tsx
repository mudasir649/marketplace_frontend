'use client';
import AdvanceSearch from '@/components/AdvanceSearch'
import { setProductData, setProductsCount } from '@/store/appSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Page() {

    const { address, title, page } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&address=${address}&title=${title}`);
                if (res.status == 200) {
                    dispatch(setProductData(res.data?.data?.ad));
                    dispatch(setProductsCount(res.data?.data?.totalAds));
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [address, title, page, dispatch])

    return (
        <>
            <AdvanceSearch />
        </>
    )
}
