import React, { useState } from 'react';
import { Cancel } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { refreshPage, setShowEditAd } from '@/store/appSlice';
import { useTranslation } from 'react-i18next';

export default function EditAd() {
  const { t } = useTranslation();

  const { productId, refresh } = useSelector((state: any) => state.app);

  const dispatch = useDispatch();

  // Initialize state for edited ad details
  const [editedAdDetails, setEditedAdDetails] = useState({
    title: '',
    description: '',
  });

  const handleCancel = () => {
    dispatch(setShowEditAd(false));
  };

  const handleEditAd = async () => {
    try {
      // Send a PUT or PATCH request to update the ad details
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/editAd/${productId}`, editedAdDetails);
      if (res.status === 200) {
        dispatch(refreshPage(refresh + 1));
        dispatch(setShowEditAd(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input changes for the edited ad details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAdDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-opacity-100 backdrop-blur-sm z-10 overflow-y-scroll`}>
      <div className='container mx-10 w-[800px] h-auto mt-12 bg-white shadow-3xl border rounded-lg'>
        <div className='flex justify-end'>
          <button className='text-white text-xl lg:mr-[-30px]' onClick={() => handleCancel()}>
            <Cancel className='text-[#FF0000]' />
          </button>
        </div>
        <div className="bg-white p-4 text-center">
          <p className="text-lg font-semibold">{t('editAd.title')}</p>
          {/* Render input fields for editing ad details */}
          <div className="mt-4">
            <input
              type="text"
              name="title"
              placeholder={t('editAd.titlePlaceholder')}
              value={editedAdDetails.title}
              onChange={handleInputChange}
              className="mb-2 px-4 py-2 border rounded-md w-full"
            />
            <textarea
              name="description"
              placeholder={t('editAd.descriptionPlaceholder')}
              value={editedAdDetails.description}
              onChange={handleInputChange}
              className="mb-2 px-4 py-2 border rounded-md w-full"
            />
            {/* Add more input fields as needed */}
          </div>
          <div className="mt-4">
            <button className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 focus:outline-none focus:bg-gray-500" onClick={() => handleCancel()}>
              {t('editAd.cancel')}
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => handleEditAd()}>
              {t('editAd.saveChanges')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
