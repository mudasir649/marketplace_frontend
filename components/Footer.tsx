import React from 'react'
import { useRouter } from 'next/navigation';
import { setProductData, setProductsCount, setShowContact } from '@/store/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; 
import BackToTop from './BackToTop';

interface IList {
  name: String,

}

interface IList1 {
  name: String,
  value: String,
}

export default function Footer() {
  const { t } = useTranslation(); // Initialize the translation hook

  const headingStyle = 'capitalize text-xl font-bold mb-5';
  const ulStyle = 'text-gray-500 mb-5';
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

   const list1 = [
    {
        name:   t('categories.0'),    
    },
    {
        name: t('categories.1')
    },
    {
        name: t('categories.2')
    }
];

const list2 = [
  {
    name: t('list2.0'),
  },
  {
    name: t('list2.1'),
  },
  {
    name: t('list2.2'),
  },
];

const list3 = [
  {
    name: t('list3.0'),
  },
  {
    name: t('list3.1'),
  },
  
];

const list4 = [
  {
    name: t('list3.2'),
    value: t('list3.2')
  },
  {
    name: t('list4.0'),
    value: "faq",
  },
  {
    name: t('list4.2'),
    value: "privacy-policy",
  },
  {
    name: t('list4.4'),
    value: "terms-and-condition",

  },
];

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
      <div className='bg-white border-t-2'>
        <div className='flex flex-col container mx-auto'>
          <div className='flex flex-col md:flex-row space-x-0 md:space-x-8 mt-2'>
              {list2?.map((lst: IList, i: number) => (
                <h1 className='mb-3 text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]' key={i} onClick={() => router.push('/how-to-sell-fast')}>{lst.name}</h1>
              ))}
              {list3?.map((lst: IList, i: number) => (
                <h1 className='mb-3 text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]' key={i} onClick={() => handleFooter(lst.name)}>{lst.name}</h1>
              ))}
          </div>
            <div className='flex flex-col md:flex-row space-x-0 md:space-x-8'>
              {list4?.map((lst: IList1, i: number) => (
                <h1 className='mb-3 text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]' key={i} onClick={() => router.push(`${lst.value}`)}>{lst.name}</h1>
              ))}
            </div>
          {/* <div>
            <h1 className={headingStyle}>{t('footer.popularCategories')}</h1>
            <ul className={`${ulStyle} cursor-pointer`}>
              {list1?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i} onClick={() => handleCat(lst.name)}>{lst.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={headingStyle}>{t('footer.howToSellFast')}</h1>
            <ul className={`${ulStyle} cursor-pointer`}>
              {list2?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i} onClick={() => router.push('/how-to-sell-fast')}>{lst.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={headingStyle}>{t('footer.information')}</h1>
            <ul className={`${ulStyle} cursor-pointer`}>
              {list3?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i} onClick={() => handleFooter(lst.name)}>{lst.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={headingStyle}>{t('footer.helpSupport')}</h1>
            <ul className={`${ulStyle} cursor-pointer`}>
              {list4?.map((lst: IList1, i: number) => (
                <li className='mb-3' key={i} onClick={() => router.push(`${lst.value}`)}>{lst.name}</li>
              ))}
            </ul>
          </div> */}
          <div>
            <BackToTop />
          </div>
        </div>
      </div>
      <div className='text-right bg-white'>
        <div className='container mx-auto'>
        {t('copyright')}
         </div>
      </div>
    </footer>
  )
}
