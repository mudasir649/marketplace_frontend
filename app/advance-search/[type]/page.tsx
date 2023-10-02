/* eslint-disable @next/next/no-img-element */
'use client'
import AdvanceSearch from "@/components/AdvanceSearch"
import { setProductData, setProductsCount } from "@/store/appSlice";
import productData from "@/utils/data";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {

    const { productData, productsCount } = useSelector((state: any) => state.app);
    const { type } = useParams();

    const { page } = useSelector((state: any) => state.app);
    const dispatch = useDispatch();

    const subCategory = type == 'Bicycles' ? 'Bicycles' :
        type == 'E-scooter' ? 'E-scooter' :
            type == 'E-bikes' ? 'E-bikes' :
                type == 'Motorcycle' ? 'Motorcycle' : '';
    const [brands, setBrands] = useState<string>("");

    return (
        <AdvanceSearch category={type} subCategory={subCategory} />
    )
}
