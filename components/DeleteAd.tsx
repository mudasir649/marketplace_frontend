import { refreshPage, setShowDeleteAd } from '@/store/appSlice';
import { Cancel } from '@mui/icons-material'
import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'; 

export default function DeleteAd() {

    const { t } = useTranslation(); // Initialize the translation hook

    const { productId, refresh } = useSelector((state: any) => state.app);

    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(setShowDeleteAd(false));
    }

    const handleDeleteAd = async () => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/deleteAd/${productId}`);
            if (res.status === 204) {
                dispatch(refreshPage(refresh + 1));
                dispatch(setShowDeleteAd(false));
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-opacity-100 backdrop-blur-sm z-10 overflow-y-scroll`}>
          <div className='container mx-10 w-[800px] h-auto mt-12 bg-white shadow-3xl border rounded-lg'>
            <div className='flex justify-end'>
              <button className='text-white text-xl lg:mr-[-30px]' onClick={() => handleCancel()}>
                <Cancel className='text-[#FF0000]' />
              </button>
            </div>
            <div className="bg-white p-4 text-center">
              <p className="text-lg font-semibold">{t('deleteAd.title')}</p>
              <div className="mt-4">
                <button className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 focus:outline-none focus:bg-gray-500" onClick={() => handleCancel()}>{t('deleteAd.cancel')}</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-[#FF0000] focus:outline-none focus:bg-[#FF0000]" onClick={() => handleDeleteAd()}>{t('deleteAd.delete')}</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  