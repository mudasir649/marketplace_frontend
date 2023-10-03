/* eslint-disable @next/next/no-img-element */
'use client'
import AdvanceSearch from "@/components/AdvanceSearch"
import { setProductData, setProductsCount } from "@/store/appSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {

    const { page } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}`);
            if (res.status == 200) {
                dispatch(setProductData(res.data?.data.ad));
                dispatch(setProductsCount(res.data?.data.totalAds));
            }
        }
        fetchData();
    }, [page, dispatch])

    return (
        <AdvanceSearch />
    )
}
