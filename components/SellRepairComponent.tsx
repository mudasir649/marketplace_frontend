import { setShowRepairNow, setShowSellNow } from '@/store/appSlice';
import { DirectionsCar, Handyman } from '@mui/icons-material';
import Image from 'next/image';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function SellRepairComponent() {
    const { t } = useTranslation(); 
    const bothDivsStyle = 'bg-white rounded-md lg:w-[450px] hover:shadow-md hover:shadow-[#e52320] w-auto h-64 text-center p-5 space-y-3';
    const h1Style = 'cursor-pointer text-2xl font-semibold hover:text-[#FF0000]';
    const btnStyle = 'h-10 w-40 bg-[#FF0000] text-white p-2';

    const dispatch = useDispatch();



    return (
        <div className='container mx-auto mt-5 md:mt-10'>
            <div className='flex flex-col space-y-5 md:space-y-0 md:flex-row lg:justify-center lg:space-x-10'>
                <div className={bothDivsStyle}>
                    <div className='flex justify-center'>
                        <Image
                            src='/assets/carIcon.png'
                            alt='car logo'
                            height={80}
                            width={80}
                            className='cursor-pointer'
                        />
                    </div>
                    <h1 className={h1Style}>{t('sellRepairComponent.sellTitle')}</h1>
          <h1 className='text-md'>{t('sellRepairComponent.sellSubtitle')}</h1>
          <button className={btnStyle} onClick={() => dispatch(setShowSellNow(true))}>
            {t('sellRepairComponent.sellButton')}
          </button>
          </div>
                <div className={bothDivsStyle}>
                    <div className='flex justify-center'>
                        <Image
                            src='/assets/repairIcon.png'
                            alt='car logo'
                            height={80}
                            width={80}
                            className='cursor-pointer'
                        />
                    </div>
                    <h1 className={h1Style}>{t('sellRepairComponent.repairTitle')}</h1>
          <h1 className='text-md'>{t('sellRepairComponent.repairSubtitle')}</h1>
          <button className={btnStyle} onClick={() => dispatch(setShowRepairNow(true))}>
            {t('sellRepairComponent.repairButton')}
          </button>
          </div>
            </div>
        </div>
    )
}
