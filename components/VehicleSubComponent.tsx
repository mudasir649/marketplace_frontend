"use client";
import Home from "@/components/Home";
import {
  ArrowForwardIos,
  Cancel,
  Description,
  ExpandMore,
  Image,
  InsertLink,
  OpenInNewTwoTone,
  Person,
  PlaylistAdd,
} from "@mui/icons-material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  axelType,
  fuelType,
  howContactList,
  kilometers,

} from "@/utils/dataVariables";
import "../app/post-ad/post-ad.css";
import { useSelector } from "react-redux";
import locateAddress from "@/utils/GoogleLocation";
import { useTranslation } from "react-i18next";

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
  subCategory: any;
  userId: any;
  title: any;
  price: any;
  brand: any;
  model: any;
  description: any;
  videoUrl: any;
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
  km: any;
  latitude: any;
  longitude: any;
}

export default function VehicleSubComponent({ type }: any) {
  const { t } = useTranslation(); // Initialize the translation hook

  const { userInfo } = useSelector((state: any) => state.auth);
  const userData =
    userInfo === null ? userInfo : userInfo?.data?.userDetails?._id;
  const email = userInfo?.data?.userDetails?.email;
  const phone = userInfo?.data?.userDetails?.phoneNumber;
  const [open, isOpen] = useState<Boolean>(false);
  const [openSub, isOpenSub] = useState<Boolean>(false);
  const [openSubModel, isOpenSubModel] = useState<Boolean>(false);
  const [openSubBrand, isOpenSubBrand] = useState<Boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [priceListValue, setPriceListValue] = useState<string>("price");
  const [brands, setBrands] = useState<any>([]);
  const [subCategory, setSubCategory] = useState<any>([]);
  const [googleLocation, setGoogleLocation] = useState<any>(null);
  const [showLocation, setShowLocation] = useState<Boolean>(false);
  let router = useRouter();
  const id = userData;

  const [data, setData] = useState<IData>({
    category:
      type == "Busses"
        ? "Busses"
        : type == "Vans"
        ? "Vans"
        : type == "Trailers"
        ? "Trailers"
        : type == "Construction Machines"
        ? "Construction Machines"
        : type == "Trucks"
        ? "Trucks"
        : "",
    subCategory: null || "",
    userId: id,
    title: null || "",
    price: null || "",
    brand: null || "",
    model: null || "",
    description: null || "",
    videoUrl: null || "",
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
    km: null || "",
    latitude: null || "",
    longitude: null || "",
  });
  const [howContact, setHowContact] = useState<string>("Whatsapp");

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleSubCategory/${type}`
      );
      setSubCategory(res.data?.data);
    };
    fetchCategory();
  }, [type, data.category]);

  const handleInput = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name == "subCategory") {
      fetchBrand();
    }
  };

  const fetchBrand = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleMake/${type}`
    );
    setBrands(res.data?.data);
  };

  const handleBrand = (value: any) => {
    isOpenSubBrand(false);
    setData({ ...data, ["brand"]: value });
  };

  const handleModel = (value: any) => {
    isOpenSubModel(false);
    setData({ ...data, ["model"]: value });
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
    } catch (error) {
      console.log(error);
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
      name: t('product.Price'),
      value: "price",
    },
    {
      id: "3",
      name: t('product.disabled'),
      value: "disabled",
    },
  ];

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="border-none rounded-sm bg-white mb-10 h-full p-3">
          <div className="container mx-auto">
            <h1 className="space-x-3 border-b-2 pb-3">
              <PlaylistAdd className="text-[#FF0000] mt-[-4px]" />
              <span className="text-lg font-bold">
                {t("autosComponent.heading1")}
              </span>
            </h1>
          </div>
          <div className=" container mx-auto flex flex-col mb-7">
            <div className="flex flex-row space-x-2 mt-5">
              <h1>
                {type === "Busses"
                  ? t("allCategories.Busses")
                  : type === "Construction Machines"
                  ? t("allCategories.Construction Machines")
                  : type === "Vans"
                  ? t("allCategories.Vans")
                  : type === "Trucks"
                  ? t("allCategories.Trucks")
                  : type === "Trailers"
                  ? t("allCategories.Trailers")
                  : ""}
              </h1>
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
                    {t("autosComponent.price")}
                    {`[CHF]`} <span className="text-[#FF0000]">*</span>
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
                  {t("autosComponent.subCategory")}{" "}
                  <span className="text-[#FF0000]">*</span>
                </h1>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                  name="subCategory"
                  onChange={(e: any) => handleInput(e)}
                >
                  <option value="option1">
                    {t("autosComponent.selectSubCategory")}
                  </option>
                  {subCategory?.map(
                    (list: any, i: number) =>
                      list?.category?.map((cat: any, i: number) => (
                        <option
                          className={`hover:bg-red-500 hover:text-white 
                                        ml-1 mb-1 ${
                                          list.length - 1 == i
                                            ? ""
                                            : " border-b-2"
                                        }`}
                          key={i}
                          value={cat}
                        >
                          {cat}
                        </option>
                      ))
                  )}
                </select>
              </div>
              {data?.subCategory && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.brand")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="brand"
                    onChange={(e) => handleInput(e)}
                  >
                    <option value="option1">
                      {" "}
                      {t("autosComponent.brand")}
                    </option>
                    {/* {brands[0].make?.map((list: any, i: number) => (
                                            <option className={`hover:bg-red-500 hover:text-white 
                                        ml-1 mb-1 ${list.length - 1 == i ? '' : ' border-b-2'}`}
                                                key={i}
                                                onClick={() => handleBrand(list)}
                                            >{list}</option>
                                        ))} */}
                    {brands?.make?.map((list: any, i: any) => (
                      <option
                        className={`hover:bg-red-500 hover:text-white 
                                            ml-1 mb-1 ${
                                              list.length - 1 == i
                                                ? ""
                                                : " border-b-2"
                                            }`}
                        key={i}
                        onClick={() => handleBrand(list)}
                      >
                        {list}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {data?.subCategory && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.year")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      className={style.inputStyle}
                      name="year"
                      value={data.year}
                      onChange={(e: any) => handleInput(e)}
                      required
                    />
                  </div>
                </div>
              )}
              {type == "Busses" && data?.subCategory && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.fuelType")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="fuelType"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t("autosComponent.selectFuelType")}
                    </option>
                    {fuelType?.map((fuel: any, i: number) => (
                      <option value={fuel.value} key={i}>
                        {fuel.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {type == "Construction Machine" && data?.subCategory && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.model")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      className={style.inputStyle}
                      name="model"
                      value={data.model}
                      onChange={(e: any) => handleInput(e)}
                      required
                    />
                  </div>
                </div>
              )}
              {data?.subCategory && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.kilometers")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="km"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option>Select Kilometers</option>
                    {kilometers.map((kms: any, i: number) => (
                      <option value={kms.name} key={i}>
                        {kms.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {type == "Busses" && data?.subCategory && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.axleCount")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="axeltype"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t("autosComponent.selectAxleCount")}
                    </option>
                    {axelType?.map((axel: any, i: number) => (
                      <option value={axel.name} key={i}>
                        {axel.name}
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
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
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
                      <li>{t("autosComponent.imageSizeInfo1")}</li>
                      <li>{t("autosComponent.imageSizeInfo2")}</li>
                      <li>{t("autosComponent.imageSizeInfo3")}</li>
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
                    {" "}
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
                    E.g. https://www.youtube.com/watch?v=RiXdDGk_XCU,
                    https://vimeo.com/620922414
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
                  {t("autosComponent.howToContact")}
                </h1>
                <div
                  className="flex flex-col hover:border-red-500 w-full rounded-sm h-10"
                  onClick={() => isOpenSub(!openSub)}
                >
                  <div className="flex flex-row border border-gray-300">
                    <h1 className="w-full p-2">{howContact} </h1>
                    <div className={`p-1 pl-2 text-gray-600 w-10`}>
                      <ExpandMore
                        className={`logo ${open ? "hidden" : "visible"} ${
                          openSub ? "active" : "inactive"
                        }`}
                      />
                    </div>
                  </div>
                  <div
                    className={`menu-item flex flex-row border bg-white border-gray-300 
    w-full rounded-sm p-1 ${openSub ? "active" : "inactive"}`}
                  >
                    <ul className="w-full max-h-96 overflow-y-auto">
                      {howContactList?.map((list: any, i: number) => (
                        <li
                          className={`hover:bg-red-500 hover:text-white 
                ml-1 mb-1 ${list.length - 1 == i ? "" : " border-b-2"}`}
                          key={i}
                          onClick={() => handleHowContact(list?.name)}
                        >
                          {list?.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {howContact == "Whatsapp" ? (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.whatsapp")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      className={style.inputStyle}
                      required
                      name="whatsapp"
                      value={data.whatsapp}
                      onChange={(e: any) => handleInput(e)}
                    />
                    <p className="text-gray-400 text-sm mt-1">
                      {t("autosComponent.whatsapp")} +41xxxxxxxxxx
                    </p>
                  </div>
                </div>
              ) : howContact == "Viber" ? (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.viber")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      className={style.inputStyle}
                      required
                      name="viber"
                      value={data.viber}
                      onChange={(e: any) => handleInput(e)}
                    />
                    <p className="text-gray-400 text-sm mt-1">
                      {t("autosComponent.viber")} +41xxxxxxxxxx
                    </p>
                  </div>
                </div>
              ) : howContact == "email" ? (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.email")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div className="flex flex-col w-full">
                    <p className="text-black text-sm mt-1 font-bold">{email}</p>
                  </div>
                </div>
              ) : howContact === "phone" ? (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.phone")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div className="flex flex-col w-full">
                    <p className="text-black text-sm mt-1 font-bold">{phone}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
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
