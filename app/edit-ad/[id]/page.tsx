"use client";
import {
  BorderColor,
  Cancel,
  Description,
  Image,
  InsertLink,
  Person,
  PhoneIphone,
  PlaylistAdd,
} from "@mui/icons-material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  checkVehicleCategory,
  fuelType1,
  kilometers,
  partsSubList,
  subList,
} from "@/utils/dataVariables";
import "@/app/post-ad/post-ad.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "@/components/autos.css";
import locateAddress from "@/utils/GoogleLocation";
import dynamic from "next/dynamic";
import Switch from "react-switch";
import NxtImage from "next/image";

const style = {
  inputStyle:
    "border border-gray-200 hover:border-red-500 focus:outline-red-500 w-full rounded-sm h-10 pl-3",
  divStyle:
    "flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-1 md:space-y-0 mb-5 mt-5",
  h1Style: "text-md font-bold w-40 mt-1 flex-wrap whitespace-nowrap",
  areaStyle:
    "border border-gray-300 h-52 p-2 hover:border-red-600 focus:outline-red-600",
};

interface IData {
  category: any;
  subCategory: any;
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
  phone: boolean;
  images: any;
}

function isNullOrNullOrEmpty(value: any) {
  return value === null || value === undefined || value === "";
}

function EditComponent() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const { t } = useTranslation(); // Initialize the translation hook
  const userData =
    userInfo === null ? userInfo : userInfo?.data?.userDetails?._id;
  const id = userData;
  const [priceListValue, setPriceListValue] = useState<string>("price");
  const [editCondition, setEditCondition] = useState<string>("");

  const [data, setData] = useState<IData>({
    category: null || "",
    subCategory: null || "",
    userId: id,
    title: null || "",
    images: [],
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
    phone: false,
  });

  const phone = userInfo?.data?.userDetails?.phoneNumber;
  const [productData, setProductData] = useState<any>();
  const [productSubCat, setProductSubCat] = useState<string>("");
  let [productImages, setProductImages] = useState<any>();
  const [whatsappChecked, setWhatsappChecked] = useState<boolean>(false);
  const [viberChecked, setViberChecked] = useState<boolean>(false);
  const [phoneChecked, setPhoneChecked] = useState<boolean>(false);
  const [priceDisabled, setPriceDisabled] = useState<boolean>(false);
  let router = useRouter();

  const adId = useParams();

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/getSpecific/${adId?.id}`
      );
      setProductData(res.data?.data);
      setProductImages(res?.data.data?.images);
      data.images = res.data?.data?.images;
      data.price = res?.data?.data?.price;
      data.whatsapp = res?.data?.data?.whatsapp;
      data.viber = res?.data?.data?.viber;
      setProductSubCat(res.data?.data?.category);
      setEditCondition(res.data?.data?.condition);
      if (!isNullOrNullOrEmpty(res?.data?.data?.whatsapp)) {
        setWhatsappChecked(true);
      }
      if (!isNullOrNullOrEmpty(res.data?.data?.viber)) {
        setViberChecked(true);
      }
      if (res?.data?.data?.phone === true) {
        setPhoneChecked(true);
        setData({ ...data, ["phone"]: res?.data?.data?.phone });
      }
      if (res.data?.data?.price === null) {
        setPriceListValue("");
        setPriceDisabled(true);
      } else {
        setPriceDisabled(false);
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        router.push("/");
      }
    }
  }, [adId?.id, router]);

  console.log(productImages);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [models, setModels] = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);
  const [googleLocation, setGoogleLocation] = useState<any>(null);
  const [showLocation, setShowLocation] = useState<Boolean>(false);
  const [disableBrand, setDisableBrand] = useState<Boolean>(false);
  const [disableModel, setDisableModel] = useState<Boolean>(false);
  const [subCategory, setSubCategory] = useState<any>([]);

  const productSubCategory = [
    "Construction Machines",
    "Busses",
    "Trailers",
    "Vans",
    "Trucks",
  ];

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
      name: t("color.name12"),
      value: t("color.value12"),
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

  const categorySubList =
    productData?.category === "Bikes" ? subList : partsSubList;

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleSubCategory/${productSubCat}`
      );
      setSubCategory(res.data?.data);
    };
    if (
      productData?.category === "Busses" ||
      productData?.category === "Vans" ||
      productData?.category === "Trailers" ||
      productData?.category === "Trucks" ||
      productData?.category === "Construction Machines"
    )
      fetchCategory();
  }, [productSubCat, productData?.category]);

  let vehicleCategory = checkVehicleCategory.includes(productData?.category)
    ? productData?.subCategory
    : productData?.category;

  useEffect(() => {
    const fetchBrand = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/findVehicleMake/${vehicleCategory}`
      );
      setBrands(res.data?.data);
    };
    if (vehicleCategory !== undefined) {
      if (productSubCat !== ("Parts" || "Others")) fetchBrand();
    }
  }, [vehicleCategory, productSubCat]);

  const handleInput = (e: any) => {
    if (e.target.name == "brand") {
      setData({ ...data, brand: e.target.value });
      fetchBrand(e.target.value);
    } else if (e.target.name === "model") {
      setData({ ...data, model: e.target.value });
    } else if (e.target.name === "Other brand") {
      setData({ ...data, brand: e.target.value });
      setModels(null);
      setDisableBrand(!disableBrand);
    } else if (e.target.name === "Other model") {
      setData({ ...data, model: e.target.value });
      setDisableModel(!disableModel);
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
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

  const removeImage = async (index: string) => {
    const newArr = productImages.filter((img: string) => img !== index);
    setProductImages(newArr);
    setData({ ...data, ["images"]: newArr });
  };

  const checkObjectEmpty = (obj: any) => {
    for (const key in obj) {
      if (obj[key].trim() === "") {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (images <= 0 && productImages <= 0) {
      toast("Please! select image to update.");
    } else if (images.length + productImages.length > 7) {
      toast(t(`taost.imageUpload`));
      return;
    }
    setLoading(true);
    let newData;
    if (checkObjectEmpty(data) === false) {
      return;
    } else if (images.length !== 0) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("file", images[i]);
      }
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key as keyof IData]);
        }
      }
      newData = formData;
    } else {
      newData = data;
    }
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/edit-ad/${adId?.id}`,
        newData
      );
      if (res.status == 200) {
        toast(res.data?.message);
        setLoading(false);
        router.push("/my-ads");
      }
    } catch (error: any) {
      if (error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(
          (err: any) => err.path
        );

        errorMessages.forEach((errorMessage: any) => {
          toast(`${errorMessage} ${t(`taost.validValue`)}`, {
            type: "error",
          });
        });
      } else {
        toast(t(`taost.err`), { type: "error" });
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
      if (newChecked === true)
        setData({ ...data, ["whatsapp"]: productData?.whatsapp });
      else setData({ ...data, ["whatsapp"]: "" });
    } else if (type === "viber") {
      setViberChecked(newChecked);
      if (newChecked === true)
        setData({ ...data, ["viber"]: productData?.viber });
      else setData({ ...data, ["viber"]: "" });
    } else if (type === "phone") {
      setPhoneChecked(newChecked);
      setData({ ...data, ["phone"]: !phoneChecked });
    } else {
      return;
    }
  };

  const axelType = [
    {
      name: "1",
    },
    {
      name: "2",
    },
    {
      name: "3",
    },
    {
      name: ">3",
    },
  ];

  const handlePrice = (value: string) => {
    setPriceListValue(value);
    setPriceDisabled(!priceDisabled);
    setData({ ...data, ["price"]: "" });
  };

  const checkBrandDisable = () => {
    if (disableBrand === true) {
      return true;
    } else {
      return false;
    }
  };

  const checkModelDisable = () => {
    if (disableModel === true) {
      return true;
    } else {
      return false;
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
              <h1 className="text-lg font-semibold">
                {productData?.category === undefined
                  ? ""
                  : t(`category.${productData?.category}`)}
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
              {checkVehicleCategory.includes(productData?.category) && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.subCategory")}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div className="flex flex-col w-full -ml-5">
                    <select
                      className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                      name="subCategory"
                      onChange={(e: any) => handleInput(e)}
                    >
                      <option value="option1">
                        {t(`allCategories.${productData?.subCategory}`)}
                      </option>
                      {categorySubList.map((list: any, i: number) => (
                        <option value={list.name} key={i}>
                          {t(`allCategories.${list.name}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
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
                    placeholder={productData?.title}
                    onChange={(e: any) => handleInput(e)}
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
                    <li>
                      <input
                        checked={priceDisabled === false ? true : false}
                        type="radio"
                        name="price"
                        onClick={() => handlePrice("price")}
                      />{" "}
                      {t("product.Price")}
                    </li>
                    <li>
                      <input
                        checked={priceDisabled === true ? true : false}
                        type="radio"
                        name="price"
                        onChange={() => handlePrice("")}
                      />{" "}
                      {t("product.disabled")}
                    </li>
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
                      placeholder={productData?.price}
                      onChange={(e: any) => handleInput(e)}
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
                    <li>
                      <input
                        checked={editCondition === "new" ? true : false}
                        type="radio"
                        name="condition"
                        value="new"
                        onChange={(e: any) => handleInput(e)}
                      />{" "}
                      {conditionList[0].name}
                    </li>
                    <li>
                      <input
                        checked={editCondition === "used" ? true : false}
                        type="radio"
                        name="condition"
                        value="used"
                        onChange={(e: any) => handleInput(e)}
                      />{" "}
                      {conditionList[1].name}
                    </li>
                    <li>
                      <input
                        checked={editCondition === "recondition" ? true : false}
                        type="radio"
                        name="condition"
                        value="recondition"
                        onChange={(e: any) => handleInput(e)}
                      />{" "}
                      {conditionList[2].name}
                    </li>
                  </ul>
                </div>
              </div>
              {productSubCategory.includes(productSubCat) && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.subCategory")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="type"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option value="option1">
                      {t(`subCategoryOptions.${productData?.type}`)}
                    </option>
                    {subCategory?.map(
                      (list: any, i: number) =>
                        list?.category?.map((cat: any, j: number) => (
                          <option
                            className={`hover:bg-red-500 hover:text-white 
                  ml-1 mb-1 ${list.length - 1 === j ? "" : " border-b-2"}`}
                            key={j}
                            value={cat}
                          >
                            {t(`subCategoryOptions.${cat}`)}
                          </option>
                        ))
                    )}
                  </select>
                </div>
              )}
              {productData?.category !== ("Parts" || "Others") && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.brand")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div className="w-full">
                    {!disableBrand && (
                      <div className="relative w-full">
                        <select
                          className={`custom-select w-full block appearance-none bg-white border border-gray-300 focus:outline-none px-4 py-2 pr-8 leading-tight ${
                            !disableBrand && "hover:border-red-600"
                          }`}
                          name="brand"
                          onChange={(e: any) => handleInput(e)}
                          disabled={checkBrandDisable()}
                        >
                          <option value="option1">{productData?.brand !== "Others" ? productData?.brand : t(`subCategoryOptions.${productData?.brand}`)}</option>
                          {brands?.make?.map((brand: any, i: number) => (
                            <option
                              value={brand}
                              key={i}
                              className="capitalize"
                            >
                              {brand}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        name="Other brand"
                        value="Other"
                        onClick={(e) => handleInput(e)}
                      />{" "}
                      {t(`subCategoryOptions.Others`)}
                    </div>
                  </div>
                </div>
              )}
              {data?.brand !== "" && !disableBrand && productData?.category === "Autos" && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>{t("autosComponent.model")}</h1>
                  <div className="w-full">
                    {!disableModel &&
                    <select
                      className={`block appearance-none w-full bg-white border border-gray-300 focus:outline-none px-4 py-2 pr-8 leading-tight ${
                        !disableModel && "hover:border-red-600"
                      }`}
                      name="model"
                      onChange={(e: any) => handleInput(e)}
                      disabled={checkModelDisable()}
                    >
                      <option value="">
                        {productData?.model !== "Others"
                          ? productData?.model
                          : t(`subCategoryOptions.${productData?.model}`)}
                      </option>
                      {models !== null &&
                        models[0]?.model?.map((model: any, i: number) => (
                          <option value={model} key={i}>
                            {model}
                          </option>
                        ))}
                    </select>
                    }
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        name="Other model"
                        value="Other"
                        onClick={(e) => handleInput(e)}
                      />{" "}
                      {t(`subCategoryOptions.Others`)}
                    </div>
                  </div>
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
                    placeholder={productData?.year}
                    onChange={(e: any) => handleInput(e)}
                  />
                </div>
              </div>
              {productData?.bodyShape && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.bodyShape")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="bodyShape"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option>{productData?.bodyShape}</option>
                    {bodyShape?.map((body: any, i: number) => (
                      <option value={body.value} key={i}>
                        {body.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {productData?.gearBox && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.gearBox")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="gearBox"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option>{productData?.gearBox}</option>
                    {gearBox.map((gear: any, i: number) => (
                      <option value={gear?.value} key={i}>
                        {gear?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {productData?.fuelType && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.fuelType")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="fuelType"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option>{productData?.fuelType}</option>
                    {fuelType1.map((fuel: any, i: number) => (
                      <option value={fuel?.value} key={i}>
                        {fuel?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {productData?.km && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.kilometers")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="km"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option>{productData?.km}</option>
                    {kilometers.map((kms: any, i: number) => (
                      <option value={kms.name} key={i}>
                        {kms.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {productData?.exteriorColor && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.exteriorColor")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="exteriorColor"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option>{productData?.exteriorColor}</option>
                    {exteriorColor.map((color: any, i: number) => (
                      <option value={color?.value} key={i}>
                        {color?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {productData?.interiorColor && (
                <div className={style.divStyle}>
                  <h1 className={style.h1Style}>
                    {t("autosComponent.interiorColor")}
                  </h1>
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                    name="interiorColor"
                    onChange={(e: any) => handleInput(e)}
                  >
                    <option>{productData?.interiorColor}</option>
                    {interiorColor.map((color: any, i: number) => (
                      <option value={color?.value} key={i}>
                        {color?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {productData?.axeltype && (
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
                    <option value="option1">{productData?.axeltype}</option>
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
                    placeholder={productData?.description}
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
              {
                <div className="flex flex-row flex-wrap gap-4">
                  {productImages?.map((image: any, i: any) => (
                    <div key={i} className="flex-wrap w-auto">
                      <Cancel
                        className={`text-[#FF0000] z-20 absolute cursor-pointer ml-[215px]`}
                        onClick={() => removeImage(image)}
                      />
                      {/* <h1 className="mt-5">{i}</h1> */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="h-36 w-60"
                        src={image}
                        alt={`Image ${i}`}
                      />
                    </div>
                  ))}
                </div>
              }
              <div className={style.divStyle}>
                <div className="flex flex-col w-full">
                  <input
                    type="file"
                    className={`${style.inputStyle} p-1`}
                    name="image"
                    id="fileInput"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={(e: any) => handleImage(e)}
                  />
                  {!images ? (
                    ""
                  ) : (
                    <div className="flex flex-row flex-wrap gap-4 mt-4">
                      {images?.map((image: any, i: any) => (
                        <div key={i} className="flex-wrap w-auto">
                          <div className="flex flex-row-reverse">
                            <Cancel
                              className="absolute text-[#FF0000]"
                              onClick={() => handleImageRemove(i)}
                            />
                          </div>
                          <NxtImage
                            className="h-36 w-60"
                            src={URL.createObjectURL(image)}
                            alt={`Image ${i}`}
                            width={100}
                            height={100}
                          />
                        </div>
                      ))}
                    </div>
                  )}

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
                    className={style.inputStyle}
                    type="text"
                    placeholder={productData?.address}
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
                <h1 className={`${style.h1Style} invisible`}>Whatspp</h1>
                <div className="flex flex-row w-full h-8 justify-between">
                  <h1 className="font-semibold mt-1">
                    {t("postAd.showNumber")}
                  </h1>
                </div>
              </div>
              <div className={style.divStyle}>
                <h1 className={`${style.h1Style} invisible`}>Whatspp</h1>
                <div className="flex flex-row w-full h-8 space-x-5">
                  <Switch
                    onChange={() => handleChange(!whatsappChecked, "whatsapp")}
                    checked={whatsappChecked}
                    offColor="#888"
                    onColor="#191919"
                    height={20}
                    className="h-10"
                  />
                  <h1 className="-mt-1 font-bold text-lg">Whatsapp</h1>
                </div>
              </div>
              {whatsappChecked && (
                <>
                  <div
                    className={`${style.divStyle} transform ease-linear duration-500`}
                  >
                    <h1 className={`${style.h1Style} invisible`}>whatsapp</h1>
                    <div className="h-auto flex w-full border-b-2 p-2">
                      <PhoneIphone className="text-gray-400" />
                      <input
                        type="text"
                        className="w-full focus:outline-none"
                        placeholder={productData?.whatsapp}
                        name="whatsapp"
                        value={data?.whatsapp}
                        onChange={(e) => handleInput(e)}
                      />
                      <BorderColor className="text-gray-400" />
                    </div>
                  </div>
                </>
              )}
              <div className={style.divStyle}>
                <h1 className={`${style.h1Style} invisible`}>Viber</h1>
                <div className="flex flex-row w-full h-8 space-x-5">
                  <Switch
                    onChange={() => handleChange(!viberChecked, "viber")}
                    checked={viberChecked}
                    offColor="#888"
                    onColor="#191919"
                    height={20}
                    className="h-10"
                  />
                  <h1 className="-mt-1 font-bold text-lg">Viber</h1>
                </div>
              </div>
              {viberChecked && (
                <>
                  <div
                    className={`${style.divStyle} transform ease-linear duration-200`}
                  >
                    <h1 className={`${style.h1Style} invisible`}>viber</h1>
                    <div className="h-auto flex w-full border-b-2 p-2">
                      <PhoneIphone className="text-gray-400" />
                      <input
                        type="text"
                        className="w-full focus:outline-none"
                        placeholder={productData?.viber}
                        name="viber"
                        value={data?.viber}
                        onChange={(e) => handleInput(e)}
                      />
                      <BorderColor className="text-gray-400" />
                    </div>
                  </div>
                </>
              )}
              <div className={style.divStyle}>
                <h1 className={`${style.h1Style} invisible`}>Phone</h1>
                <div className="flex flex-row w-full h-8 space-x-5">
                  <Switch
                    onChange={() => handleChange(!phoneChecked, "phone")}
                    checked={phoneChecked}
                    offColor="#888"
                    onColor="#191919"
                    height={20}
                    className="h-10"
                  />
                  <h1 className="-mt-1 font-bold text-lg">Phone</h1>
                </div>
              </div>
              {phoneChecked && (
                <div
                  className={`${style.divStyle} transform ease-linear duration-500`}
                >
                  <h1 className={`${style.h1Style} invisible`}>phone</h1>
                  <div className="h-auto flex w-full border-b-2 p-2">
                    <PhoneIphone className="text-gray-400" />
                    <h1 className="text-base text-gray-500">{phone}</h1>
                  </div>
                </div>
              )}
              {/* <TextField className="w-full" id="standard-basic" label="Standard" variant="standard" />               */}
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

export default dynamic(() => Promise.resolve(EditComponent), { ssr: false });
