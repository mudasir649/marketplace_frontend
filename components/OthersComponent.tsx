'use client';
import Home from '@/components/Home';
import { ArrowForwardIos, Cancel, Description, ExpandMore, Image, InsertLink, Person, PlaylistAdd } from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { bodyShape, conditionList, fuelType, gearBox, howContactList, interiorColor, priceList } from '@/utils/dataVariables';
import { carsList } from '@/utils/carsList';
import "../app/post-ad/post-ad.css"
import { bikesList } from '@/utils/bikesList';
import { useSelector } from 'react-redux';
import locateAddress from '@/utils/GoogleLocation';
import { useTranslation } from 'react-i18next';


const style = {
    inputStyle: 'border border-gray-200 hover:border-red-500 focus:outline-red-500 w-full rounded-sm h-10 pl-3',
    divStyle: 'flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-1 md:space-y-0 mb-5 mt-5',
    h1Style: 'text-md font-bold w-40 mt-1',
    areaStyle: 'border border-gray-300 h-52 p-2 hover:border-red-600 focus:outline-red-600'
}

interface IData {
    category: any,
    userId: any
    title: any,
    price: any,
    minPrice: any,
    maxPrice: any,
    brand: any,
    model: any,
    description: any,
    videoUrl: any,
    website: any,
    address: any,
    feature_list: any,
    howToContact: any,
    condition: any,
    whatsapp: any,
    viber: any,
    email: any,
    year: any,
    latitude: any,
    longitude: any
}

export default function OthersComponent({ type }: any) {

    const { t } = useTranslation();

    const { userInfo } = useSelector((state: any) => state.auth);
    const userData = userInfo === null ? userInfo : userInfo?.data?.userDetails?._id;
    const [open, isOpen] = useState<Boolean>(false);
    const [openSub, isOpenSub] = useState<Boolean>(false);
    const [images, setImages] = useState<any>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [priceListValue, setPriceListValue] = useState<string>('price');
    const [googleLocation, setGoogleLocation] = useState<any>(null);
    const [showLocation, setShowLocation] = useState<Boolean>(false);
    let router = useRouter();
    const id = userData;
    const exteriorColor = [
        {
            "name": t('color.name1')
        },
        {
            "name": t('color.name2')
        },
        {
            "name": t('color.name3')
        },
        {
            "name": t('color.name4')
        },
        {
            "name": t('color.name5')
        },
        {
            "name": t('color.name6')
        },
        {
            "name": t('color.name7')
        },
        {
            "name": t('color.name8')
        },
        {
            "name": t('color.name9')
        },
        {
            "name": t('color.name10')
        },
        {
            "name": t('color.name11')
        },
        {
            "name": t('color.name12')
        },
        {
            "name": t('color.name13')
        },
        {
            "name": t('color.name14')
        }
    ];
    
    const interiorColor = [
        {
            name: t('interiorColor.name1')
        },
        {
            name: t('interiorColor.name2')
        },
        {
            name: t('interiorColor.name3')
        },
        {
            name: t('interiorColor.name4')
        },
        {
            name: t('interiorColor.name5')
        },
        {
            name: t('interiorColor.name6')
        },
        {
            name: t('interiorColor.name7')
        },
        {
            name: t('interiorColor.name8')
        },
        {
            name: t('interiorColor.name9')
        },
    ];
    const gearBox = [
        {
            name: t('gearBox.name1')
        },
        {
            name: t('gearBox.name2')
        },
        {
            name: t('gearBox.name3')
        }
    ];
        

    const [data, setData] = useState<IData>({
        category: 'Others',
        userId: id,
        title: null || '',
        price: null || '',
        minPrice: null || '',
        maxPrice: null || '',
        brand: null || '',
        model: null || '',
        description: null || '',
        videoUrl: null || '',
        website: null || '',
        address: null || '',
        feature_list: null || '',
        howToContact: 'Whatsapp',
        condition: null || '',
        whatsapp: null || '',
        viber: null || '',
        email: null || '',
        year: null || '',
        latitude: null || '',
        longitude: null || ''
    });
    const [howContact, setHowContact] = useState<string>('Whatsapp');

    const handleInput = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleHowContact = (value: any) => {
        setHowContact(value)
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData()

        for (let i = 0; i < images.length; i++) {
            formData.append('file', images[i])
        }

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key as keyof IData]);
            }
        }
        try {
            const newData = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/adPost`, formData);
            if (newData.status == 201) {
                toast("Add posted successfully.")
                toast(newData?.data)
                setLoading(false);
                router.push('/my-ads');
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const checkPlace = async (e: any) => {
        setShowLocation(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/googleRoutes?address=${e.target.value}`);
        let predictions = res.data?.data.predictions;
        setGoogleLocation(predictions);
    }

    const saveLocation = (value: any) => {
        locateAddress(process.env.NEXT_PUBLIC_GOOGLE_MAP_API, value).then((location: any) => {
            setData({ ...data, ['address']: value, ['latitude']: location.lat, ['longitude']: location.long });
        })
        setShowLocation(false);
    }

    const handleLocation = (e: any) => {
        setData({ ...data, ['address']: e.target.value });
    }

    useEffect(() => {
        if (userData === null) {
            router.push('/')
        }
    }, [router, userData]);

    return (
        <Home>
            <div className='container mx-auto mt-10'>
                <div className='border-none rounded-sm bg-white mb-10 h-full p-3'>
                    <div className='container mx-auto'>
                        <h1 className='space-x-3 border-b-2 pb-3'><PlaylistAdd className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>{t('autosComponent.heading1')}</span></h1>
                    </div>
                    <div className=' container mx-auto flex flex-col mb-7'>
                        <div className='flex flex-row space-x-2 mt-5'>
                            <h1>{type == 'Contruction%20Machines' ? 'Construction Machines' : type}</h1>
                            <ArrowForwardIos className='mt-[5px]' style={{ fontSize: "14px" }} />
                            <h1 className='text-[#FF0000] underline'>
                                <Link href="/post-ad">
                                {t('autosComponent.changeCategory')}
                                </Link>
                            </h1>
                        </div>
                        <div className='mt-5 w-full mb-5'>
                            <h1 className='space-x-3 border-b-2 pb-3'><Description className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>{t('autosComponent.productInfo')} </span></h1>
                        </div>
                        <form onSubmit={(e: any) => handleSubmit(e)}>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.title')} <span className='text-[#FF0000]'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='title'
                                        value={data.title}
                                        onChange={(e: any) => handleInput(e)}
                                        required
                                    />
                                    <p className='text-gray-300 italic'>{t('autosComponent.titleCharacterLimit')}</p>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.price')} <span className='text-[#FF0000]'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <ul className='flex flex-row space-x-2'>
                                        {priceList?.map((list: any, i: any) => (
                                            <li key={i}><input checked={priceListValue === list?.value ? true : false} type="radio" id={list.id} name={list.name} value={list?.value} onChange={() => setPriceListValue(list?.value)} /> {list?.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {priceListValue === 'price' ?
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>{t('autosComponent.price')}{`[CHF]`} <span className='text-[#FF0000]'>*</span></h1>
                                    <div className='flex flex-col w-full'>
                                        <input type="text" className={style.inputStyle}
                                            name='price'
                                            value={data.price}
                                            onChange={(e: any) => handleInput(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                : ''
                            }
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.condition')} <span className='text-[#FF0000]'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <ul className='space-y-1'>
                                        {conditionList?.map((list: any, i: number) => (
                                            <li key={i}><input type="radio"
                                                name='condition'
                                                value={list?.value}
                                                onChange={(e: any) => handleInput(e)}
                                            />  {list?.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.brand')}</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='brand'
                                        value={data.brand}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.model')}</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='model'
                                        value={data.model}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.year')}</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='year'
                                        value={data.year}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.description')} <span className='text-[#FF0000]'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <textarea
                                        className={style.areaStyle}
                                        name='description'
                                        value={data.description}
                                        onChange={(e: any) => handleInput(e)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='mt-5 w-full mb-5'>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <h1 className='space-x-3 border-b-2 pb-3'><Image className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>{t('autosComponent.images')}</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <div className='flex flex-col w-full'>
                                    <input type="file" className={`${style.inputStyle} p-1`}
                                        required
                                        name='image'
                                        id='fileInput'
                                        accept='images/*'
                                        multiple
                                        onChange={(e: any) => handleImage(e)} />
                                    <div className='bg-red-300 mt-4 p-2 border-none rounded-sm italic'>
                                        <ul className='italic text-sm space-y-2'>
                                            <li>{t('autosComponent.imageSizeInfo')}</li>
                                            <li>{t('autosComponent.imageSizeInfo1')}</li>
                                            <li>{t('autosComponent.imageSizeInfo2')}</li>
                                            <li>{t('autosComponent.imageSizeInfo3')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {!images ? '' :
                                <div className='flex flex-row space-x-4'>
                                    {images?.map((image: any, i: any) => (
                                        <div key={i} className="image-item">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img className='h-32 w-32' src={URL.createObjectURL(image)} alt={`Image ${i}`} />
                                            <Cancel className='absolute mt-[-128px] ml-24 text-[#FF0000]' onClick={() => handleImageRemove(i)} />
                                        </div>))}
                                </div>
                            }
                            <div className='mt-5 w-full mb-5'>
                                <h1 className='space-x-3 border-b-2 pb-3'>
                                    <InsertLink className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>{t('autosComponent.videoURL')}</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        placeholder={t('autosComponent.videoURLPlaceholder')}
                                        name='videoUrl'
                                        value={data.videoUrl}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                    <p className='text-gray-300 text-sm mt-1'>
                                        E.g. https://www.youtube.com/watch?v=RiXdDGk_XCU, https://vimeo.com/620922414
                                    </p>
                                </div>
                            </div>
                            <div className='mt-5 w-full mb-5'>
                                <h1 className='space-x-3 border-b-2 pb-3'>
                                    <Person className='text-[#FF0000] mt-[-4px]' />
                                    <span className='text-lg font-bold'>{t('autosComponent.contactDetails')}</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.location')}</h1>
                                <div className='flex flex-col w-full'>
                                    <input required className={style.inputStyle} type="text"
                                        placeholder={t('autosComponent.enterAddress')}
                                        name='name' value={data?.address}
                                        onChange={(e: any) => handleLocation(e)} onKeyUp={(e: any) => checkPlace(e)} />
                                    {showLocation ?
                                        <ul className='border border-gray-100 mt-1 space-y-2'>
                                            {googleLocation?.map((predict: any, i: any) => (
                                                <li key={i} onClick={() => saveLocation(predict?.description)}>{predict?.description}</li>
                                            ))}
                                        </ul>
                                        :
                                        ''
                                    }
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.howToContact')} <span className='text-[#FF0000]'>*</span></h1>
                                <div className='flex flex-col hover:border-red-500 w-full rounded-sm h-10'
                                    onClick={() => isOpenSub(!openSub)}
                                >
                                    <div className='flex flex-row border border-gray-300' >
                                        <h1 className='w-full p-2'>{howContact} </h1>
                                        <div className={`p-1 pl-2 text-gray-600 w-10`}>
                                            <ExpandMore className={`logo ${open ? 'hidden' : 'visible'} ${openSub ? 'active' : 'inactive'}`} />
                                        </div>
                                    </div>
                                    <div className={`menu-item flex flex-row border bg-white border-gray-300 
                                w-full rounded-sm p-1 ${openSub ? 'active' : 'inactive'}`}
                                    >
                                        <ul className='w-full max-h-96 overflow-y-auto'>
                                            {howContactList?.map((list: any, i: number) => (
                                                <li className={`hover:bg-red-500 hover:text-white 
                                        ml-1 mb-1 ${list.length - 1 == i ? '' : ' border-b-2'}`}
                                                    key={i}
                                                    onClick={() => handleHowContact(list?.name)}
                                                >{list?.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {howContact == 'Whatsapp' ?
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>{t('autosComponent.whatsapp')}  <span className='text-[#FF0000]'>*</span></h1>
                                    <div className='flex flex-col w-full'>
                                        <input type="text" className={style.inputStyle}
                                            required
                                            name='whatsapp'
                                            value={data.whatsapp}
                                            onChange={(e: any) => handleInput(e)}
                                        />
                                        <p className='text-gray-400 text-sm mt-1'>
                                            Whatsapp number country code. e.g.+41xxxxxxxxxx 
                                        </p>
                                    </div>
                                </div> : howContact == 'Viber' ?
                                    <div className={style.divStyle}>
                                        <h1 className={style.h1Style}>{t('autosComponent.viber')}  <span className='text-[#FF0000]'>*</span></h1>
                                        <div className='flex flex-col w-full'>
                                            <input type="text" className={style.inputStyle}
                                                required
                                                name='viber'
                                                value={data.viber}
                                                onChange={(e: any) => handleInput(e)}
                                            />
                                            <p className='text-gray-400 text-sm mt-1'>Viber number with your country code. e.g.+41xxxxxxxxxx</p>
                                        </div>
                                    </div>
                                    : howContact == 'Email' ?
                                        <div className={style.divStyle}>
                                            <h1 className={style.h1Style}>{t('autosComponent.email')}  <span className='text-[#FF0000]'>*</span></h1>
                                            <div className='flex flex-col w-full'>
                                                <input type="text" className={style.inputStyle}
                                                    name='email'
                                                    value={data.email}
                                                    onChange={(e: any) => handleInput(e)}
                                                />
                                            </div>
                                        </div>
                                        :
                                        ''
                            }
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>{t('autosComponent.website')}</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='webSite'
                                        value={data.website}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                    <p className='text-gray-400 text-sm'>e.g. https://example.com</p>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={`${style.h1Style} invisible`}>ffj</h1>
                                {!loading ?
                                    <div className='flex flex-col w-full'>
                                        <button className='bg-[#FF0000] hover:bg-red-800 w-32 h-10 text-white font-bold' >{t('autosComponent.submit')}</button>
                                    </div>
                                    :
                                    <div className="spinner mt-8 w-10 h-10"></div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Home >
    )
}
