import React from 'react'
import { list1, list2, list3, list4 } from "../utils/dataVariables";
import { useRouter } from 'next/navigation';
import { setProductData, setProductsCount, setShowContact } from '@/store/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

interface IList {
  name: String,
}

interface IList1 {
  name: String,
  value: String
}

export default function Footer() {

  const headingStyle = 'capitalize text-xl font-bold text-white mb-5';
  const ulStyle = 'text-gray-300 mb-5';
  const dispatch = useDispatch();
  const router = useRouter();

  const { page } = useSelector((state: any) => state.app);


  const handleFooter = (value: any) => {
    if (value == "About Eidcarosse") {
      router.push('/about-us')
    } else if (value === "Contact") {
      dispatch(setShowContact(true));
    }
  }


  const handleCat = async (value: any) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${value}`);
      if (res.status == 200) {
        dispatch(setProductData(res.data?.data?.ad));
        dispatch(setProductsCount(res.data?.data?.totalAds));
        router.push(`/advance-search/${value}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <footer>
      <div className='bg-gray-900'>
        <div className='flex flex-col lg:flex-row container mx-auto lg:space-x-20 lg:p-20 p-10'>
          <div>
            <h1 className={headingStyle}>Popular Categories</h1>
            <ul className={`${ulStyle} cursor-pointer`}>
              {list1?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i} onClick={() => handleCat(lst.name)}>{lst.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={headingStyle}>How to sell fast</h1>
            <ul className={`${ulStyle} cursor-pointer`}>
              {list2?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i} onClick={() => router.push('/how-to-sell-fast')}>{lst.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={headingStyle}>Information</h1>
            <ul className={`${ulStyle} cursor-pointer`}>
              {list3?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i} onClick={() => handleFooter(lst.name)}>{lst.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={headingStyle}>help & support</h1>
            <ul className={`${ulStyle} cursor-pointer`}>
              {list4?.map((lst: IList1, i: number) => (
                <li className='mb-3' key={i} onClick={() => router.push(`${lst.value}`)}>{lst.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='bg-black py-8 text-center text-white'>
        <div className='container mx-auto'>
          Cospyright &copy; 2023 Eidcarosse. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
