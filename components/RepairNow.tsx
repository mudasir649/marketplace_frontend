'use client';
import { Cancel } from '@mui/icons-material';
import axios from 'axios';
import React, { useState } from 'react';
import signLogo from "../public/assets/signLogo.png";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; 
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './Advance-search.css';

interface IData {
    subject: any
    fullName: any,
    phoneNo: any,
    email: any,
    make: any,
    model: any,
    year: any,
    description: any
}

export default function BuyNow() {
    const { t } = useTranslation(); // Initialize the translation hook

    const router = useRouter();


    const [images, setImages] = useState<any>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [data, setData] = useState<IData>({
        subject: 'This is email for Repair Now. ',
        fullName: '',
        phoneNo: '',
        email: '',
        make: '',
        model: '',
        year: '',
        description: ''
    });

    const handleInput = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleImage = (e: any) => {
        const files = e.target.files;
        const newImages = Array.from(files);
        setImages([...images, ...newImages]);
    }

    const handleImageRemove = (index: any) => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleRepairNow = () => {
        router.push('/')
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData();

        for (let i = 0; i < images.length; i++) {
            form.append('file', images[i]);
        }
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                form.append(key, data[key as keyof IData]);
            }
        }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/send-email`, form);
            if (res.status == 200) {
                setLoading(false);
                toast(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`messageArea fixed inset-0 flex justify-center items-center bg-opacity-100 backdrop-blur-sm z-10 overflow-y-scroll`}>
            <div className='container mx-10 w-[800px] h-auto mt-12 bg-white shadow-3xl border rounded-md mb-10'>
                <div className='flex justify-end'>
                    <button className='text-white text-xl lg:mr-[-30px]' onClick={() => handleRepairNow()}>
                        <Cancel className='text-[#FF0000]' />
                    </button>
                </div>
                <div className='flex justify-center mb-10'>
                    <Image
                        src={signLogo}
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </div>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">{t('repairNow.full_name')}</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={data.fullName}
                            className="w-full border py-2 px-3 focus:outline-none focus:border-red-600"
                            placeholder={t('repairNow.full_name')}
                            required
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-600">{t('repairNow.phone_number')}</label>
                            <input
                                type="number"
                                id="phoneNo"
                                name="phoneNo"
                                className="w-full border py-2 px-3 focus:outline-none focus:border-red-600"
                                placeholder={t('repairNow.phone_number')}
                                required
                                value={data.phoneNo}
                                onChange={(e) => handleInput(e)}
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-600">{t('repairNow.email_address')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full border py-2 px-3 focus:outline-none focus:border-red-600"
                                placeholder={t('repairNow.email_address')}
                                value={data.email}
                                required
                                onChange={(e) => handleInput(e)}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-600">{t('repairNow.make')}</label>
                            <input
                                type="text"
                                id="make"
                                name="make"
                                className="w-full border py-2 px-3 focus:outline-none focus:border-red-600"
                                placeholder={t('repairNow.make')}
                                value={data.make}
                                onChange={(e) => handleInput(e)}
                                required
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-600">{t('repairNow.model')}</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                className="w-full border py-2 px-3 focus:outline-none focus:border-red-600"
                                placeholder={t('repairNow.model')}
                                value={data.model}
                                onChange={(e) => handleInput(e)}
                                required
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-600">{t('repairNow.year')}</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                className="w-full border py-2 px-3 focus:outline-none focus:border-red-600"
                                placeholder={t('repairNow.year')}
                                value={data.year}
                                onChange={(e) => handleInput(e)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">{t('repairNow.upload_image')}</label>
                        <input
                            type="file"
                            id="fileInput"
                            name="image"
                            className="w-full border py-2 px-3 focus:outline-none focus:border-red-600"
                            accept="image/png, image/jpeg"
                            multiple
                            required
                            onChange={(e) => handleImage(e)}
                        />
                    </div>

                    {!images ? '' :
                        <div className='flex flex-row flex-wrap gap-4'>
                            {images?.map((image: any, i: any) => (
                                <div key={i} className="image-item">
                                    <div className='bg-green-500 flex flex-row-reverse'>
                                        <Cancel className='absolute text-[#FF0000]' onClick={() => handleImageRemove(i)} />
                                    </div>
                                    <Image className='h-32 w-72' src={URL.createObjectURL(image)} alt={`Image ${i}`} width={100} height={100} />
                                </div>
                            ))}
                        </div>
                    }
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">{t('repairNow.description')}</label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full border py-2 px-3 focus:outline-none focus:border-red-600"
                            placeholder={t('repairNow.description')}
                            value={data.description}
                            onChange={(e) => handleInput(e)}
                            required
                        ></textarea>
                    </div>
                    <div className="mt-4 mb-10">
                        <button type="submit" className="bg-[#FF0000] text-white font-semibold px-4 py-2 hover:bg-red-800 focus:outline-none focus:bg-red-700" onClick={(e: any) => handleSubmit(e)}>{t('repairNow.submit')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}