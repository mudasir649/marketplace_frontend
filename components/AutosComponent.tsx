"use client";
import {
  ArrowForwardIos,
  Cancel,
  Description,
  ExpandMore,
  Image,
  InsertLink,
  Person,
  PlaylistAdd,
} from "@mui/icons-material";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { kilometers } from "@/utils/dataVariables";
import "../app/post-ad/post-ad.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./autos.css";
import Switch from "react-switch";

import locateAddress from "@/utils/GoogleLocation";

const style = {
  inputStyle:
    "border border-gray-200 hover:border-red-500 focus:outline-red-500 w-full rounded-sm h-10 pl-3",
  divStyle:
    "flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-1 md:space-y-0 mb-5 mt-5",
  h1Style: "text-md font-bold w-40 mt-1",
  areaStyle:
    "border border-gray-300 h-52 p-2 hover:border-red-600 focus:outline-red-600",
};

interface IData {
  category: any;
  userId: any;
  title: any;
  price: any;
  minPrice: any;
  maxPrice: any;
  brand: any;
  model: any;
  description: any;
  videoUrl: any;
  website: any;
  address: any;
  feature_list: any;
  howToContact: any;
  condition: any;
  whatsapp: any;
  viber: any;
  email: any;
  year: any;
  bodyShape: any;
  gearBox: any;
  fuelType: any;
  exteriorColor: any;
  interiorColor: any;
  engineCapacity: any;
  cylinder: any;
  km: any;
  latitude: any;
  longitude: any;
}

export default function AutosComponent() {
  const { t } = useTranslation(); // Initialize the translation hook

  const { userInfo } = useSelector((state: any) => state.auth);
  const userData =
    userInfo === null ? userInfo : userInfo?.data?.userDetails?._id;
  const email = userInfo?.data?.userDetails?.email;
  const phone = userInfo?.data?.userDetails?.phoneNumber;
  const { type } = useParams();
  const [whatsappChecked, setWhatsappChecked] = useState<boolean>(false);
  const [viberChecked, setViberChecked] = useState<boolean>(false);
  const [phoneChecked, setPhoneChecked] = useState<boolean>(false);
  const [emailChecked, setEmailChecked] = useState<boolean>(false);

  const conditionList = [
    {
      id: 1,
      name: t("condition.new"),
      value: "new",
    },
    {
      id: 2,
      name: t("condition.used"),
      value: "used",
    },
    {
      id: 3,
      name: t("condition.recondition"),
      value: "recondition",
    },
  ];
  const priceList = [
    {
      id: "1",
      name: t("product.Price"),
      value: "price",
    },
    {
      id: "3",
      name: t("product.disabled"),
      value: "disabled",
    },
  ];
  const fuelType = [
    {
      name: t("fuelType.Gasoline"),
      value: "Gasoline",
    },
    {
      name: t("fuelType.Diesel"),
      value: "Diesel",
    },
    {
      name: t("fuelType.Ethanol"),
      value: "Ethanol",
    },
    {
      name: t("fuelType.Electric"),
      value: "Electric",
    },
    {
      name: t("fuelType.Hydrogen"),
      value: "Hydrogen",
    },
    {
      name: t("fuelType.LPG"),
      value: "LPG",
    },
    {
      name: t("fuelType.CNG"),
      value: "CNG",
    },
    {
      name: t("fuelType.Hybrid (Electric/Gasoline)"),
      value: "Hybrid (Electric/Gasoline)",
    },
    {
      name: t("fuelType.Hybrid (Electric/Diesel)"),
      value: "Hybrid (Electric/Diesel)",
    },
    {
      name: t("fuelType.Others"),
      value: "Others",
    },
  ];
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [priceListValue, setPriceListValue] = useState<string>("price");
  const [models, setModels] = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);
  const [googleLocation, setGoogleLocation] = useState<any>(null);
  const [showLocation, setShowLocation] = useState<Boolean>(false);
  let router = useRouter();
  const id = userData;
  const exteriorColor = [
    {
      name: t("color.name1"),
      value: t("color.value1"),
    },
    {
      name: t("color.name2"),
      value: t("color.value2"),
    },
    {
      name: t("color.name3"),
      value: t("color.value3"),
    },
    {
      name: t("color.name4"),
      value: t("color.value4"),
    },
    {
      name: t("color.name5"),
      value: t("color.value5"),
    },
    {
      name: t("color.name6"),
      value: t("color.value6"),
    },
    {
      name: t("color.name7"),
      value: t("color.value7"),
    },
    {
      name: t("color.name8"),
      value: t("color.value8"),
    },
    {
      name: t("color.name9"),
      value: t("color.value9"),
    },
    {
      name: t("color.name10"),
      value: t("color.value10"),
    },
    {
      name: t("color.name11"),
      value: t("color.value11"),
    },

    {
      name: t("color.name13"),
      value: t("color.value13"),
    },
    {
      name: t("color.name14"),
      value: t("color.value14"),
    },
  ];

  const interiorColor = [
    {
      name: t("interiorColor.name1"),
      value: t("interiorColor.value1"),
    },
    {
      name: t("interiorColor.name2"),
      value: t("interiorColor.value2"),
    },
    {
      name: t("interiorColor.name3"),
      value: t("interiorColor.value3"),
    },
    {
      name: t("interiorColor.name4"),
      value: t("interiorColor.value4"),
    },
    {
      name: t("interiorColor.name5"),
      value: t("interiorColor.value5"),
    },
    {
      name: t("interiorColor.name6"),
      value: t("interiorColor.value6"),
    },
    {
      name: t("interiorColor.name7"),
      value: t("interiorColor.value7"),
    },
    {
      name: t("interiorColor.name8"),
      value: t("interiorColor.value8"),
    },
    {
      name: t("interiorColor.name9"),
      value: t("interiorColor.value9"),
    },
  ];

  const bodyShape = [
    {
      name: t("bodyShape.Convertible"),
      value: "Convertible",
    },
    {
      name: t("bodyShape.Compact"),
      value: "Compact",
    },
    {
      name: t("bodyShape.Coupe"),
      value: "Coupe",
    },
    {
      name: t("bodyShape.suv"),
      value: "SUV/Off-Road/Pick-up",
    },
    {
      name: t("bodyShape.Station"),
      value: "Station Wagon",
    },
    {
      name: t("bodyShape.Sedan"),
      value: "Sedan",
    },
    {
      name: t("bodyShape.Van"),
      value: "Van",
    },
    {
      name: t("bodyShape.Transporter"),
      value: "Transporter",
    },
    {
      name: t("bodyShape.Other"),
      value: "Other",
    },
  ];

  const gearBox = [
    {
      name: t("gearBox.name1"),
      value: t("gearBox.value1"),
    },
    {
      name: t("gearBox.name2"),
      value: t("gearBox.value2"),
    },
    {
      name: t("gearBox.name3"),
      value: t("gearBox.value3"),
    },
  ];

  const [data, setData] = useState<IData>({
    category: "Autos",
    userId: id,
    title: null || "",
    price: null || "",
    minPrice: null || "",
    maxPrice: null || "",
    brand: null || "",
    model: null || "",
    description: null || "",
    videoUrl: null || "",
    website: null || "",
    address: null || "",
    feature_list: null || "",
    howToContact: "Whatsapp",
    condition: null || "",
    whatsapp: null || "",
    viber: null || "",
    email: null || "",
    year: null || "",
    bodyShape: null || "",
    gearBox: null || "",
    fuelType: null || "",
    exteriorColor: null || "",
    interiorColor: null || "",
    engineCapacity: null || "",
    cylinder: null || "",
    km: null || "",
    latitude: null || "",
    longitude: null || "",
  });
  const [howContact, setHowContact] = useState<string>("Whatsapp");

  useEffect(() => {
    const fetchBrand = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleMake/Autos`
      );
      setBrands(res.data?.data);
    };
    fetchBrand();
  }, []);

  const handleInput = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name == "brand") fetchBrand(e.target.value);
  };

  const fetchBrand = async (model: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findModels/Autos/${model}`
      );
      setModels(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleHowContact = (value: any) => {
    setHowContact(value);
  };

  const handleImage = (e: any) => {
    const files = e.target.files;
    const newImages = Array.from(files);
    setImages([...images, ...newImages]);
  };

  const handleImageRemove = (index: any) => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("file", images[i]);
    }

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key as keyof IData]);
      }
    }
    try {
      const newData = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/adPost`,
        formData
      );
      if (newData.status == 201) {
        toast("Add posted successfully.");
        toast(newData?.data);
        setLoading(false);
        router.push("/my-ads");
      }
    } catch (error: any) {
      if (error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (err: any) => err.path
        );

        errorMessages.forEach((errorMessage: any) => {
          toast(`${errorMessage} is invalid. Please enter valid value.`, {
            type: "error",
          });
        });
      } else {
        toast(`An error occured. Please! try again.`, { type: "error" });
      }
    }
    setLoading(false);
  };

  const checkPlace = async (e: any) => {
    setShowLocation(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/googleRoutes?address=${e.target.value}`
    );
    let predictions = res.data?.data.predictions;
    setGoogleLocation(predictions);
  };

  const saveLocation = (value: any) => {
    locateAddress(process.env.NEXT_PUBLIC_GOOGLE_MAP_API, value).then(
      (location: any) => {
        setData({
          ...data,
          ["address"]: value,
          ["latitude"]: location.lat,
          ["longitude"]: location.long,
        });
      }
    );
    setShowLocation(false);
  };

  const handleLocation = (e: any) => {
    setData({ ...data, ["address"]: e.target.value });
  };

  useEffect(() => {
    if (userData === null) {
      router.push("/");
    }
  }, [router, userData]);

  const handleChange = (newChecked: boolean, type: any) => {
    if (type === "whatsapp") {
      setWhatsappChecked(newChecked);
    } else if (type === "viber") {
      setViberChecked(newChecked);
    } else if (type === "phone") {
      setPhoneChecked(newChecked);
    } else if (type === "email") {
      setEmailChecked(newChecked);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="border-none rounded-sm bg-white mb-10 h-full p-3">
          <div className="container mx-auto">
            <h1 className="space-x-3 border-b-2 pb-3">
              <PlaylistAdd className="text-[#FF0000] mt-[-4px]" />
              <span className="text-lg font-bold">
                {" "}
                {t("autosComponent.heading1")}
              </span>
            </h1>
          </div>
          <div className=" container mx-auto flex flex-col mb-7">
            <div className="flex flex-row space-x-2 mt-5">
              <h1>{t("allCategories.Autos")}</h1>
              <ArrowForwardIos
                className="mt-[5px]"
                style={{ fontSize: "14px" }}
              />
              <h1 className="text-[#FF0000] underline">
                <Link href="/post-ad">
                  {t("autosComponent.changeCategory")}
                </Link>
              </h1>
            </div>
            <div className="mt-5 w-full mb-5">
              <h1 className="space-x-3 border-b-2 pb-3">
                <Description className="text-[#FF0000] mt-[-4px]" />
                <span className="text-lg font-bold">
                  {t("autosComponent.productInfo")}
                </span>
              </h1>
            </div>

            <form onSubmit={(e: any) => handleSubmit(e)}>
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  {t("autosComponent.title")}{" "}
                  <span className="text-[#FF0000]">*</span>
                </h1>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className={style.inputStyle}
                    name="title"
                    value={data.title}
                    onChange={(e: any) => handleInput(e)}
                    required
                  />
                  <p className="text-gray-300 italic">
                    {t("autosComponent.titleCharacterLimit")}
                  </p>
                </div>
              </div>
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  {t("autosComponent.price")}{" "}
                  <span className="text-[#FF0000]">*</span>
                </h1>
                <div className="flex flex-col w-full">
                  <ul className="flex flex-row space-x-2">
                    {priceList?.map((list: any, i: any) => (
                      <li key={i}>
                        <input
                          checked={
                            priceListValue === list?.value ? true : false
                          }
                          type="radio"
                          id={list.id}
                          name={list.name}
                          value={list?.value}
                          onChange={() => setPriceListValue(list?.value)}
                        />{" "}
                        {list?.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {priceListValue === "price" ? (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.priceCHF")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      className={style.inputStyle}
                      name="price"
                      value={data.price}
                      onChange={(e: any) => handleInput(e)}
                      required
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  {t("autosComponent.condition")}{" "}
                  <span className="text-[#FF0000]">*</span>
                </h1>
                <div className="flex flex-col w-full">
                  <ul className="space-y-1">
                    {conditionList?.map((list: any, i: number) => (
                      <li key={i}>
                        <input
                          type="radio"
                          name="condition"
                          value={list?.value}
                          onChange={(e: any) => handleInput(e)}
                        />{" "}
                        {list?.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  {t("autosComponent.brand")}{" "}
                  <span className="text-[#FF0000]">*</span>
                </h1>
                <div className="relative w-full">
                  <select
                    className="custom-select w-full block appearance-none bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="brand"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t("autosComponent.selectBrand")}
                    </option>
                    {brands?.make?.map((brand: any, i: number) => (
                      <option value={brand} key={i} className="capitalize">
                        {brand}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    {/* You can replace '▼' with any down arrow icon you prefer */}
                    ▼
                  </div>
                </div>
              </div>
              {data?.brand && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>{t("autosComponent.model")}</h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="model"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t("autosComponent.selectModel")}
                    </option>
                    {models[0]?.model?.map((model: any, i: number) => (
                      <option value={model} key={i}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>{t("autosComponent.year")}</h1>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className={style.inputStyle}
                    name="year"
                    value={data.year}
                    onChange={(e: any) => handleInput(e)}
                  />
                </div>
              </div>
              {data?.brand && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.bodyShape")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="bodyShape"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t("autosComponent.selectBodyShape")}
                    </option>
                    {bodyShape?.map((body: any, i: number) => (
                      <option value={body.value} key={i}>
                        {body.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {data?.brand && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.gearBox")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="gearBox"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t("autosComponent.selectGearBox")}
                    </option>
                    {gearBox.map((gear: any, i: number) => (
                      <option value={gear?.value} key={i}>
                        {gear?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {data?.brand && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.fuelType")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="fuelType"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t("autosComponent.selectFuelType")}
                    </option>
                    {fuelType.map((fuel: any, i: number) => (
                      <option value={fuel?.value} key={i}>
                        {fuel?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {data?.brand && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.kilometers")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="km"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option>{t("autosComponent.selectKilometer")}</option>
                    {kilometers.map((kms: any, i: number) => (
                      <option value={kms.name} key={i}>
                        {kms.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {data?.brand && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.exteriorColor")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="exteriorColor"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t("autosComponent.selectExteriorColor")}
                    </option>
                    {exteriorColor.map((color: any, i: number) => (
                      <option value={color?.value} key={i}>
                        {color?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {data?.brand && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.interiorColor")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="interiorColor"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t("autosComponent.selectInteriorColor")}
                    </option>
                    {interiorColor.map((color: any, i: number) => (
                      <option value={color?.value} key={i}>
                        {color?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  {t("autosComponent.description")}
                </h1>
                <div className="flex flex-col w-full">
                  <textarea
                    className={style.areaStyle}
                    name="description"
                    value={data.description}
                    onChange={(e: any) => handleInput(e)}
                  />
                </div>
              </div>
              <div className="mt-5 w-full mb-5">
                <h1 className="space-x-3 border-b-2 pb-3">
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image className="text-[#FF0000] mt-[-4px]" />
                  <span className="text-lg font-bold">
                    {t("autosComponent.images")}
                  </span>
                </h1>
              </div>
              <div className={style.divStyle}>
                <div className="flex flex-col w-full">
                  <input
                    type="file"
                    className={`${style.inputStyle} p-1`}
                    required
                    name="image"
                    id="fileInput"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={(e: any) => handleImage(e)}
                  />

                  <div className="bg-red-300 mt-4 p-2 border-none rounded-sm italic">
                    <ul className="italic text-sm space-y-2">
                      <li>{t("autosComponent.imageSizeInfo")}</li>
                      <li>{t("autosComponent.imageSizeInfo2")}</li>
                      <li>{t("autosComponent.imageSizeInfo3")}</li>
                      <li>{t("autosComponent.imageSizeInfo4")}</li>
                    </ul>
                  </div>
                </div>
              </div>
              {!images ? (
                ""
              ) : (
                <div className="flex flex-row space-x-4">
                  {images?.map((image: any, i: any) => (
                    <div key={i} className="image-item">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="h-32 w-32"
                        src={URL.createObjectURL(image)}
                        alt={`Image ${i}`}
                      />
                      <Cancel
                        className="absolute mt-[-128px] ml-24 text-[#FF0000]"
                        onClick={() => handleImageRemove(i)}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-5 w-full mb-5">
                <h1 className="space-x-3 border-b-2 pb-3">
                  <InsertLink className="text-[#FF0000] mt-[-4px]" />
                  <span className="text-lg font-bold">
                    {t("autosComponent.videoURL")}
                  </span>
                </h1>
              </div>
              <div className={style.divStyle}>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className={style.inputStyle}
                    placeholder={t("autosComponent.videoURLPlaceholder")}
                    name="videoUrl"
                    value={data.videoUrl}
                    onChange={(e: any) => handleInput(e)}
                  />
                  <p className="text-gray-300 text-sm mt-1">
                    {t("autosComponent.videoURLPlaceholder")}
                  </p>
                </div>
              </div>
              <div className="mt-5 w-full mb-5">
                <h1 className="space-x-3 border-b-2 pb-3">
                  <Person className="text-[#FF0000] mt-[-4px]" />
                  <span className="text-lg font-bold">
                    {t("autosComponent.contactDetails")}
                  </span>
                </h1>
              </div>
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  {t("autosComponent.location")}
                </h1>
                <div className="flex flex-col w-full">
                  <input
                    required
                    className={style.inputStyle}
                    type="text"
                    placeholder={t("autosComponent.enterAddress")}
                    name="name"
                    value={data?.address}
                    onChange={(e: any) => handleLocation(e)}
                    onKeyUp={(e: any) => checkPlace(e)}
                  />
                  {showLocation ? (
                    <ul className="border border-gray-100 mt-1 space-y-2">
                      {googleLocation?.map((predict: any, i: any) => (
                        <li
                          key={i}
                          onClick={() => saveLocation(predict?.description)}
                        >
                          {predict?.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  Whatspp
                </h1>
                <div
                  className="flex flex-row w-full h-8"
                >
                  <Switch
                    onChange={() => handleChange(!whatsappChecked, "whatsapp")}
                    checked={whatsappChecked}
                    offColor="#888"
                    onColor="#FF0000"
                    height={28}
                    className="h-20"
                  />
                </div>
              </div>
              {whatsappChecked && '+93485858589595'}
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  Viber
                </h1>
                <div
                  className="flex flex-row w-full h-8"
                >
                  <Switch
                    onChange={() => handleChange(!viberChecked, "viber")}
                    checked={viberChecked}
                    offColor="#888"
                    onColor="#FF0000"
                    height={28}
                    className="h-20"
                  /> 
                </div>
              </div>
              {viberChecked && '+93485858589595'}
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  Email
                </h1>
                <div
                  className="flex flex-row w-full h-8"
                >
                  <Switch
                    onChange={() => handleChange(!emailChecked, "email")}
                    checked={emailChecked}
                    offColor="#888"
                    onColor="#FF0000"
                    height={28}
                    className="h-20"
                  />
                </div>
              </div>
              {emailChecked && email}
              <div className={style.divStyle}>
                <h1 className={style.h1Style}>
                  Phone
                </h1>
                <div
                  className="flex flex-row w-full h-8"
                >
                  <Switch
                    onChange={() => handleChange(!phoneChecked, "phone")}
                    checked={phoneChecked}
                    offColor="#888"
                    onColor="#FF0000"
                    height={28}
                    className="h-20"
                  />
                </div>
              </div>
              {phoneChecked && phone}
              <div className={style.divStyle}>
                <h1 className={`${style.h1Style} invisible`}>ffj</h1>
                {!loading ? (
                  <div className="flex flex-col w-full">
                    <button className="bg-[#FF0000] hover:bg-red-800 w-32 h-10 text-white font-bold">
                      {t("autosComponent.submit")}
                    </button>
                  </div>
                ) : (
                  <div className="spinner mt-8 w-10 h-10"></div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
