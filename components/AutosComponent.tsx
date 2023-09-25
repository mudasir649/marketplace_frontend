'use client';
import Home from '@/components/Home';
import { ArrowForwardIos, Cancel, Description, ExpandMore, Image, InsertLink, Person, PlaylistAdd } from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { bodyShape, conditionList, exteriorColor, fuelType, gearBox, howContactList, interiorColor, priceList } from '@/utils/dataVariables';
import { carsList } from '@/utils/carsList';
import "../app/post-ad/post-ad.css"
import { bikesList } from '@/utils/bikesList';
import { CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
import { Theme } from '@mui/material';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);

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
    webSite: any,
    address: any,
    feature_list: any,
    howToContact: any,
    condition: any,
    whatsapp: any,
    viber: any,
    email: any,
    year: any,
    bodyShape: any,
    gearBox: any,
    fuelType: any,
    exteriorColor: any,
    interiorColor: any,
    engineCapacity: any,
    cylinder: any,
    km: any
}

interface ILocation {
    lat: Number,
    long: Number,
}

export default function AutosComponent() {
    const { userInfo } = useSelector((state: any) => state.auth);
    const userData = userInfo === null ? userInfo : userInfo?.data?.userDetails?._id;
    const { type } = useParams();
    const classes = useStyles()
    const [open, isOpen] = useState<Boolean>(false);
    const [openSub, isOpenSub] = useState<Boolean>(false);
    const [openBrand, isOpenBrand] = useState<Boolean>(false);
    const [openSubModel, isOpenSubModel] = useState<Boolean>(false);
    const [openModel, isOpenModel] = useState<Boolean>(false);
    const [openSubBrand, isOpenSubBrand] = useState<Boolean>(false);
    const [images, setImages] = useState<any>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [priceListValue, setPriceListValue] = useState<string>('price');
    const [models, setModels] = useState<any>([]);
    const [brands, setBrands] = useState<any>([]);
    const [googleLocation, setGoogleLocation] = useState<any>(null);
    const [showLocation, setShowLocation] = useState<Boolean>(false);
    let router = useRouter();
    const id = userData;

    const [data, setData] = useState<IData>({
        category: 'autos',
        userId: id,
        title: null || '',
        price: null || '',
        minPrice: null || '',
        maxPrice: null || '',
        brand: null || '',
        model: null || '',
        description: null || '',
        videoUrl: null || '',
        webSite: null || '',
        address: null || '',
        feature_list: null || '',
        howToContact: 'Whatsapp',
        condition: null || '',
        whatsapp: null || '',
        viber: null || '',
        email: null || '',
        year: null || '',
        bodyShape: null || '',
        gearBox: null || '',
        fuelType: null || '',
        exteriorColor: null || '',
        interiorColor: null || '',
        engineCapacity: null || '',
        cylinder: null || '',
        km: null || ''
    });
    const [howContact, setHowContact] = useState<string>('Whatsapp');

    useEffect(() => {
        const fetchBrand = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicle/Autos`);
            setBrands(res.data?.data)
        }
        fetchBrand()
    }, []);

    const handleInput = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
        if (e.target.name == 'brand') fetchBrand(e.target.value)
    }

    const fetchBrand = async (model: any) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findModels/${model}`);
            setModels(res.data?.data);
        } catch (error) {
            console.log(error);
        }
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
        setData({ ...data, ['address']: value });
        setShowLocation(false);
    }

    useEffect(() => {
        if (userData === null) {
            router.push('/')
        }
    }, [router, userData]);

    return (
        <Home>
            <div className='container mx-auto'>
                <div className='border-none rounded-sm bg-white mb-10 h-full p-3'>
                    <div className='container mx-auto'>
                        <h1 className='space-x-3 border-b-2 pb-3'><PlaylistAdd className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>Select Category</span></h1>
                    </div>
                    <div className=' container mx-auto flex flex-col mb-7'>
                        <div className='flex flex-row space-x-2 mt-5'>
                            <h1>{type == 'Contruction%20Machines' ? 'Construction Machines' : type}</h1>
                            <ArrowForwardIos className='text-[12px] mt-[6.5px]' />
                            <h1 className='text-[#FF0000] underline'>
                                <Link href="/post-ad">
                                    {'Change categroy'}
                                </Link>
                            </h1>
                        </div>
                        <div className='mt-5 w-full mb-5'>
                            <h1 className='space-x-3 border-b-2 pb-3'><Description className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>Product Information</span></h1>
                        </div>

                        <form onSubmit={(e: any) => handleSubmit(e)}>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Title <span className='text-[#FF0000]'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='title'
                                        value={data.title}
                                        onChange={(e: any) => handleInput(e)}
                                        required
                                    />
                                    <p className='text-gray-300 italic'>Character limit 25</p>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Pricing <span className='text-[#FF0000]'>*</span></h1>
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
                                    <h1 className={style.h1Style}>Price{`[CHF]`} <span className='text-[#FF0000]'>*</span></h1>
                                    <div className='flex flex-col w-full'>
                                        <input type="text" className={style.inputStyle}
                                            name='price'
                                            value={data.price}
                                            onChange={(e: any) => handleInput(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                :
                                priceListValue === 'priceRange' ?
                                    <div className='flex flex-col md:flex-row my-5 space-y-2 md:space-y-0 md:space-x-2'>
                                        <div className='w-full flex flex-row'>
                                            <h1 className='text-md font-bold  w-80 lg:w-64 mt-1'>Min Pirce {`[CHF]`}<span className='text-[#FF0000]'>*</span></h1>
                                            <input type="text" className={style.inputStyle}
                                                name='minPrice'
                                                value={data?.minPrice}
                                                onChange={(e: any) => handleInput(e)}
                                                required
                                            />
                                        </div>
                                        <div className='w-full flex flex-row'>
                                            <h1 className='text-md font-bold w-72 lg:w-64 mt-1'>Max Pirce {`[CHF]`}<span className='text-[#FF0000]'>*</span></h1>
                                            <input type="text"
                                                className={style.inputStyle}
                                                name='maxPrice'
                                                value={data?.maxPrice}
                                                onChange={(e: any) => handleInput(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    :
                                    ''
                            }
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Condition <span className='text-[#FF0000]'>*</span></h1>
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
                                <h1 className={style.h1Style}>Brand <span className='text-[#FF0000]'>*</span></h1>
                                <select
                                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                    name='brand'
                                    onChange={(e: any) => handleInput(e)}
                                >
                                    <option value="option1">Select Model</option>
                                    {brands?.map((brand: any, i: number) => (
                                        <option value={brand?.make} key={i}>{brand?.make}</option>
                                    ))}
                                </select>
                            </div>
                            {data?.brand &&
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Model <span className='text-[#FF0000]'>*</span></h1>
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                        name='model'
                                        onChange={(e: any) => handleInput(e)}
                                    >
                                        <option value="option1">Select Model</option>
                                        {models[0]?.model?.map((model: any, i: number) => (
                                            <option value={model} key={i}>{model}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Year <span className='text-[#FF0000]'>*</span></h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='year'
                                        value={data.year}
                                        onChange={(e: any) => handleInput(e)}
                                        required
                                    />
                                </div>
                            </div>
                            {data?.brand &&
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Body Shape <span className='text-[#FF0000]'>*</span></h1>
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                        name='bodyShape'
                                        onChange={(e: any) => handleInput(e)}
                                    >
                                        <option value="option1">Select Model</option>
                                        {bodyShape?.map((body: any, i: number) => (
                                            <option value={body.name} key={i}>{body.name}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                            {data?.brand &&
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Gear Box <span className='text-[#FF0000]'>*</span></h1>
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                        name='gearBox'
                                        onChange={(e: any) => handleInput(e)}
                                    >
                                        <option value="option1">Select Gear Box</option>
                                        {gearBox.map((gear: any, i: number) => (
                                            <option value={gear?.name} key={i}>{gear?.name}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                            {data?.brand &&
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Fuel Type <span className='text-[#FF0000]'>*</span></h1>
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                        name='fuelType'
                                        onChange={(e: any) => handleInput(e)}
                                    >
                                        <option value="option1">Select Fuel type</option>
                                        {fuelType.map((fuel: any, i: number) => (
                                            <option value={fuel?.name} key={i}>{fuel?.name}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                            {data?.brand &&
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Kilometers <span className='text-[#FF0000]'>*</span></h1>
                                    <div className='flex flex-col w-full'>
                                        <input type="text" className={style.inputStyle}
                                            name='km'
                                            value={data.km}
                                            onChange={(e: any) => handleInput(e)}
                                            required
                                        />
                                    </div>
                                </div>
                            }
                            {data?.brand &&
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Engine Capacity <span className='text-[#FF0000]'>*</span></h1>
                                    <div className='flex flex-col w-full'>
                                        <input type="text" className={style.inputStyle}
                                            name='engineCapacity'
                                            value={data.engineCapacity}
                                            onChange={(e: any) => handleInput(e)}
                                            required
                                        />
                                    </div>
                                </div>
                            }
                            {data?.brand &&
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Cylinders <span className='text-[#FF0000]'>*</span></h1>
                                    <div className='flex flex-col w-full'>
                                        <input type="text" className={style.inputStyle}
                                            name='cylinder'
                                            value={data.cylinder}
                                            onChange={(e: any) => handleInput(e)}
                                            required
                                        />
                                    </div>
                                </div>
                            }
                            {data?.brand &&
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Exterior Color <span className='text-[#FF0000]'>*</span></h1>
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                        name='exteriorColor'
                                        onChange={(e: any) => handleInput(e)}
                                    >
                                        <option value="option1">Select Model</option>
                                        {exteriorColor.map((color: any, i: number) => (
                                            <option value={color?.name} key={i}>{color?.name}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                            {data?.brand &&
                                <div className={style.divStyle}>
                                    <h1 className={style.h1Style}>Interior Color <span className='text-[#FF0000]'>*</span></h1>
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                                        name='interiorColor'
                                        onChange={(e: any) => handleInput(e)}
                                    >
                                        <option value="option1">Select Model</option>
                                        {interiorColor.map((color: any, i: number) => (
                                            <option value={color?.name} key={i}>{color?.name}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Description <span className='text-[#FF0000]'>*</span></h1>
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
                                <h1 className='space-x-3 border-b-2 pb-3'><Image className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>Images</span></h1>
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
                                            <li>Recommended image size to (870x493)px.</li>
                                            <li>Image maximum size 2 MB.</li>
                                            <li>Allowed image type (png, jpg, jpeg, webp).</li>
                                            <li>You can upload up to 5 images.</li>
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
                                    <InsertLink className='text-[#FF0000] mt-[-4px]' /><span className='text-lg font-bold'>Video URL</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        placeholder='Only Youtube or Video Url'
                                        name='videoUrl'
                                        value={data.videoUrl}
                                        onChange={(e: any) => handleInput(e)}
                                        required
                                    />
                                    <p className='text-gray-300 text-sm mt-1'>
                                        E.g. https://www.youtube.com/watch?v=RiXdDGk_XCU, https://vimeo.com/620922414
                                    </p>
                                </div>
                            </div>
                            <div className='mt-5 w-full mb-5'>
                                <h1 className='space-x-3 border-b-2 pb-3'>
                                    <Person className='text-[#FF0000] mt-[-4px]' />
                                    <span className='text-lg font-bold'>Contact details</span></h1>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={style.h1Style}>Location</h1>
                                <div className='flex flex-col w-full'>
                                    <input required className={style.inputStyle} type="text" placeholder='enter your address here' name='name' value={data?.address} onChange={(e) => setData({ ...data, ['address']: e.target.value })} onKeyUp={(e: any) => checkPlace(e)} />
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
                                <h1 className={style.h1Style}>How to contact <span className='text-[#FF0000]'>*</span></h1>
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
                                    <h1 className={style.h1Style}>WhatsApp No  <span className='text-[#FF0000]'>*</span></h1>
                                    <div className='flex flex-col w-full'>
                                        <input type="text" className={style.inputStyle}
                                            required
                                            name='whatsapp'
                                            value={data.whatsapp}
                                            onChange={(e: any) => handleInput(e)}
                                        />
                                        <p className='text-gray-400 text-sm mt-1'>
                                            Whatsapp number with your country code. e.g.+41xxxxxxxxxx
                                        </p>
                                    </div>
                                </div> : howContact == 'Viber' ?
                                    <div className={style.divStyle}>
                                        <h1 className={style.h1Style}>Viber Number  <span className='text-[#FF0000]'>*</span></h1>
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
                                            <h1 className={style.h1Style}>Email  <span className='text-[#FF0000]'>*</span></h1>
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
                                <h1 className={style.h1Style}>Website</h1>
                                <div className='flex flex-col w-full'>
                                    <input type="text" className={style.inputStyle}
                                        name='webSite'
                                        value={data.webSite}
                                        onChange={(e: any) => handleInput(e)}
                                    />
                                    <p className='text-gray-400 text-sm'>e.g. https://example.com</p>
                                </div>
                            </div>
                            <div className={style.divStyle}>
                                <h1 className={`${style.h1Style} invisible`}>ffj</h1>
                                {!loading ?
                                    <div className='flex flex-col w-full'>
                                        <button className='bg-[#FF0000] hover:bg-red-800 w-32 h-10 text-white font-bold' >Submit</button>
                                    </div>
                                    :
                                    <div className={classes.root}>
                                        <CircularProgress color="secondary" />
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Home >
    )
}
