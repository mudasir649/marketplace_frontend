/* eslint-disable @next/next/no-img-element */
"use client";
import {
  AirportShuttle,
  BuildCircle,
  Chat,
  DataSaverOn,
  DirectionsBike,
  DirectionsBoat,
  DirectionsBus,
  DirectionsCar,
  ElectricBike,
  ElectricScooter,
  Favorite,
  FireTruck,
  Flight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  PrecisionManufacturing,
  RemoveRedEye,
  RvHookup,
  TwoWheeler,
  Share,
  LocationOn,
  Pin,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Aos from "aos";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "@/utils/useWindowDimensions";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import {
  setBrand,
  setModel,
  setCondition,
  setMaxPrice,
  setMinPrice,
  setPage,
  setProdId,
  setProductId,
  setProductUserId,
  setSortBy,
  setType,
  setYear,
  setGearBox,
  setBodyShape,
  setKm,
  setFuelType,
  setAxelCount,
  setAddress,
  refreshPage,
  setVehicleType,
} from "@/store/appSlice";
import addInvertedComma from "@/utils/addInvertedComma";
import ProductList from "./ProductList";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import showDate from "@/utils/showDate";
import { useTranslation } from "react-i18next";
import "./Advance-search.css";
import {
  IncludeKm,
  brandInclude,
  checkSubCategoryFilter,
  gearBox1,
  kilometers,
  subBikeCategoryList,
  subPartsCategoryList,
} from "@/utils/dataVariables";
import { toast } from "react-toastify";

interface IList {
  logo: any;
  name: string;
  name1: string;
}

interface IFilterSearch {
  condition: string;
  brand: string;
  model: string;
  year: string;
  minPrice: any;
  maxPrice: any;
}

interface IRating {
  name: string;
  value: number;
}

export default function AdvanceSearch({
  productData,
  productsCount,
  setProductData,
  setProductsCount,
  category,
  subCategory,
  brands,
  models,
  vehicleSubCategory,
}: any) {
  // Redux hooks
  const { t } = useTranslation(); // Initialize the translation hook

  console.log(category);
  

  const { page, address, title, type1 } = useSelector(
    (state: any) => state.app
  );
  const [loading, setLoading] = useState<Boolean>(false);
  const [sortByLoading, setSortByLoading] = useState<Boolean>(false);
  const [fieldsData, setFieldsData] = useState<any>();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const {
    condition,
    brand,
    year,
    model,
    minPrice,
    maxPrice,
    prodId,
    km,
    bodyShape,
    fuelType,
    gearBox,
    refresh,
    vehicleType
  } = useSelector((state: any) => state.app);
  const userId = userInfo?.data?.userDetails?._id;

  const { width, height } = useWindowDimensions();
  const newWidth = width || 0;
  const newHeight = height || 0;

  const router = useRouter();

  const pagination = () => {
    let paginationList: any = [];
    let productsPerPage = 10; // Set the number of products per page
    let totalPages = Math.ceil(productsCount / productsPerPage);

    // Only add pages to paginationList if there is more than one page
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        paginationList.push(i);
      }
    }

    return paginationList;
  };

  const conditionList = [
    {
      id: 1,
      name: t("condition.new"),
      value: fieldsData?.conditionList[0].value,
    },
    {
      id: 2,
      name: t("condition.used"),
      value: fieldsData?.conditionList[1].value,
    },
    {
      id: 3,
      name: t("condition.recondition"),
      value: fieldsData?.conditionList[2].value,
    },
  ];

  const nextHandle = () => {
    if (page !== pagination().length) {
      dispatch(setPage(page + 1));
      scrollToTop();
    } else {
      return;
    }
  };

  useEffect(() => {
    const fetchFieldsData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/get-postAd-data?type=${category}`
      );
      setFieldsData(res.data?.data);
    };
    fetchFieldsData();
  }, [category]);

  const fuelTypes = fieldsData?.BikeFuelType
    ? fieldsData?.BikeFuelType
    : fieldsData?.fuelType;
  const bodyShape1 = fieldsData?.AutosBodyShape
    ? fieldsData?.AutosBodyShape
    : fieldsData?.bikeBodyShape;

  const categoryList = [
    {
      logo: <DirectionsCar />,
      name: t("categories.0"),
      name1: "Autos",
    },
    {
      logo: <TwoWheeler />,
      name: t("categories.1"),
      name1: "Bikes",
    },
    {
      logo: <DirectionsBoat />,
      name: t("categories.2"),
      name1: "Boats",
    },
    {
      logo: <DirectionsBus />,
      name: t("categories.3"),
      name1: "Busses",
    },
    {
      logo: <PrecisionManufacturing />,
      name: t("categories.4"),
      name1: "Construction%20Machines",
    },
    {
      logo: <Flight />,
      name: t("categories.5"),
      name1: "Drones",
    },
    {
      logo: <RvHookup />,
      name: t("categories.8"),
      name1: "Trailers",
    },
    {
      logo: <FireTruck />,
      name: t("categories.9"),
      name1: "Trucks",
    },
    {
      logo: <AirportShuttle />,
      name: t("categories.10"),
      name1: "Vans",
    },
    {
      logo: <BuildCircle />,
      name: t("categories.7"),
      name1: "Parts",
    },
    {
      logo: <DataSaverOn />,
      name: t("categories.6"),
      name1: "Others",
    },
  ];

  const subList = [
    {
      logo: <TwoWheeler />,
      name: t("subList.3"),
      name1: "Motorcycles",
    },
    {
      logo: <ElectricScooter />,
      name: t("subList.1"),
      name1: "E-scooters",
    },
    {
      logo: <ElectricBike />,
      name: t("subList.2"),
      name1: "E-bikes",
    },
    {
      logo: <DirectionsBike />,
      name: t("subList.0"),
      name1: "Bicycles",
    },
  ];

  const partsSubList = [
    {
      logo: <DirectionsCar />,
      name: t("categoriesParts.0"),
      name1: "Auto",
    },
    {
      logo: <TwoWheeler />,
      name: t("categoriesParts.1"),
      name1: "Bike",
    },
    {
      logo: <DirectionsBoat />,
      name: t("categoriesParts.2"),
      name1: "Boat",
    },
    {
      logo: <DirectionsBus />,
      name: t("categoriesParts.3"),
      name1: "Buss",
    },
    {
      logo: <PrecisionManufacturing />,
      name: t("categoriesParts.4"),
      name1: "Construction Machine",
    },
    {
      logo: <Flight />,
      name: t("categoriesParts.5"),
      name1: "Drone",
    },
    {
      logo: <RvHookup />,
      name: t("categoriesParts.7"),
      name1: "Trailer",
    },
    {
      logo: <FireTruck />,
      name: t("categoriesParts.8"),
      name1: "Truck",
    },
    {
      logo: <AirportShuttle />,
      name: t("categoriesParts.9"),
      name1: "Van",
    },
    {
      logo: <DataSaverOn />,
      name: t("categoriesParts.6"),
      name1: "Other Parts",
    },
  ];

  const sortByList = [
    {
      name: t("sortByList.0"),
      value: "Latest",
    },
    {
      name: t("sortByList.1"),
      value: "Oldest",
    },
    {
      name: t("sortByList.2"),
      value: "Price (low to high)",
    },
    {
      name: t("sortByList.3"),
      value: "Price (high to low)",
    },
    {
      name: t("sortByList.4"),
      value: "A to Z (title)",
    },
    {
      name: t("sortByList.5"),
      value: "Z to A (title)",
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  const handleSearch = async (value: any) => {
    dispatch(setAddress(""));
    dispatch(setMaxPrice(""));
    dispatch(setMinPrice(""));
    dispatch(setBrand(""));
    dispatch(setModel(""));
    dispatch(setCondition(""));
    dispatch(setPage(1));
    dispatch(setSortBy(""));
    dispatch(setType(""));
    dispatch(setYear(""));
    dispatch(setGearBox(""));
    dispatch(setBodyShape(""));
    dispatch(setKm(""));
    dispatch(setFuelType(""));
    dispatch(setAxelCount(""));
    dispatch(setType(value));
    router.push(`/advance-search/${value}`);
  };

  const inputStyle =
    "border border-gray-300 hover:border-red-600 focus:outline-red-600 rounded-sm w-32 lg:w-32 h-10 p-2 cursor-pointer";
  const logoStyle =
    newWidth < 370
      ? "text-[#FF0000] text-[10px] cursor-pointer"
      : "text-[#FF0000] text-[15px] md:text-xl cursor-pointer";
  const btnStyle = `font-semibold hover:bg-gray-200 w-10 hover:text-[#FF0000] text-gray-500 ease-in duration-500`;
  const btnStyle1 = `font-semibold border border-red-400 bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000] p-2 h-10 w-full`;
  const spanStyle =
    newWidth < 370
      ? "text-[10px] cursor-pointer font-bold"
      : "text-[12px] cursor-pointer font-bold";

  const baseApi = `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&address=${address}&title=${title}&condition=${condition}&brand=${brand}&model=${model}&year=${year}&minPrice=${minPrice}&maxPrice=${maxPrice}&km=${km}&bodyShape=${bodyShape}&gearBox=${gearBox}&fuelType=${fuelType}&vehicleType=${vehicleType}`;
  let categoryApi: any = baseApi;

  if (
    subBikeCategoryList.includes(category) ||
    subPartsCategoryList.includes(category)
  )
    categoryApi += `&category=${
      subBikeCategoryList.includes(category) ? "Bikes" : "Parts"
    }&subCategory=${category}`;
  else categoryApi += `&category=${category}`;

  async function applyFilter() {
    setLoading(true);
    if (pathname == "/advance-search/search" || pathname == "/advance-search") {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&address=${address}&title=${title}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        setProductData(res.data?.data?.ad);
        setProductsCount(res.data?.data?.totalAds);
        setLoading(false);
        scrollToTop();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.get(categoryApi);
        setProductData(res.data?.data?.ad);
        setProductsCount(res.data?.data?.totalAds);
        scrollToTop();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    setLoading(false);
  }

  const handleSortBy = async (e: any) => {
    const { value } = e.target;
    let res;
    dispatch(setSortBy(value));
    setSortByLoading(true);

    let url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&sortBy=${value}`;

    if (category === "Autos") url += `&category=${category}&address=${address}&title=${title}&condition=${condition}&brand=${brand}&model=${model}&year=${year}&minPrice=${minPrice}&maxPrice=${maxPrice}&km=${km}&bodyShape=${bodyShape}&gearBox=${gearBox}&fuelType=${fuelType}`
    else if (subBikeCategoryList.includes(category)){
      if(brand !== "") url += `&category=Bikes&subCategory=${category}&address=${address}&title=${title}&condition=${condition}&brand=${brand}&model=${model}&year=${year}&minPrice=${minPrice}&maxPrice=${maxPrice}&km=${km}&bodyShape=${bodyShape}&gearBox=${gearBox}&fuelType=${fuelType}`
      else url += `&category=Bikes&subCategory=${category}`;
    }
    else if (subPartsCategoryList.includes(category))
      url += `&category=Parts&subCategory=${category}`;
    else url += `&category=${category}`;

    try {
      res = await axios.get(url);
      setProductData(res?.data?.data?.ad);
      setProductsCount(res?.data?.data?.totalAds);
    } catch (error) {
      console.log(error);
    } finally {
      setSortByLoading(false);
    }
    setSortByLoading(false);
  };

  const adFavorite = async (productId: any, i: number) => {
    if (userInfo === null) {
      router.push("/login");
    } else {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/setFavorite/${productId}/${userId}`
      );
      if (res.status == 201) {
        dispatch(setProdId([...prodId, productData[i]]));
        dispatch(refreshPage(refresh + 1));
      } else {
        if (pathname == "/my-favourites") {
          dispatch(refreshPage(refresh + 1));
          const newRecord = prodId?.filter((item: any) => {
            return item._id !== productId;
          });
          dispatch(setProdId(newRecord));
        } else {
          const newRecord = prodId?.filter((item: any) => {
            return item._id !== productId;
          });
          dispatch(setProdId(newRecord));
        }
      }
    }
  };

  const handleShare = (productId: any) => {
    let linkToCopy = `${process.env.NEXT_PUBLIC_LINK_URI}/product-details/${productId}`;
    try {
      navigator.clipboard.writeText(linkToCopy);
      toast(t(`taost.link`));
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleChat = async (product: any) => {
    if (userInfo !== null) {
      dispatch(setProductId(product?._id));
      dispatch(setProductUserId(product?.userId?._id));
      const data = {
        userId: userId,
        productUserId: product?.userId._id,
        productId: product?._id,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/chatroom`,
        data
      );
      if (res.status === 200) {
        router.push("/chat");
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const fetchAds = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/getFavAds/${userId}`
      );
      if (res.status === 200) {
        dispatch(setProdId(res?.data?.data));
      }
    };
    if (userInfo !== null) {
      fetchAds();
    }
  }, [userId, dispatch, userInfo]);

  const findProductId = (productId: any) => {
    return prodId.some((item: any) => item._id === productId);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log(subCategory);

  const checkSubCategory = () => {
    if (subBikeCategoryList.includes(subCategory)) {
      return "Bikes";
    } else if (subPartsCategoryList.includes(subCategory)) {
      return "Parts";
    }
  };

  const previousHandle = () => {
    if (page !== 1) {
      dispatch(setPage(page - 1));
      scrollToTop();
    } else {
      return;
    }
  };

  const clearFilter = async () => {
    if (category !== "") {
      dispatch(refreshPage(refresh + 1));
      dispatch(setAddress(""));
      dispatch(setMaxPrice(""));
      dispatch(setMinPrice(""));
      dispatch(setBrand(""));
      dispatch(setModel(""));
      dispatch(setCondition(""));
      dispatch(setPage(1));
      dispatch(setSortBy(""));
      dispatch(setType(""));
      dispatch(setYear(""));
      dispatch(setGearBox(""));
      dispatch(setBodyShape(""));
      dispatch(setKm(""));
      dispatch(setFuelType(""));
      dispatch(setAxelCount(""));
      router.push(`/advance-search/${category}`);
    } else {
      return router.push(`/advance-search/${category}`);
    }
  };

  console.log(subCategory);
  

  return (
    <div>
      <div className="container mx-auto flex flex-col lg:flex-row mt-5 lg:mt-10 space-y-3 lg:space-y-0 lg:space-x-3 w-full mb-[200px]">
        <div
          className="bg-white shadow-lg border rounded-sm w-full lg:w-[300px] h-full p-2"
          data-aos="fade-right"
        >
          <div className="border-b flex flex-row justify-between p-2">
            <h1 className="text-lg font-bold">
              {t("categorySelection.category")}
            </h1>
          </div>
          <div className="transition ease-in-out duration-100 mb-10">
            <h1 className="pl-1 pt-2  text-lg font-semibold">
              {t("categorySelection.allCategories")}
            </h1>
            <ul className="space-y-3 mt-2 mx-1">
              {categoryList?.map((list: IList, i: number) => (
                <>
                  <li
                    className={`${
                      category === list?.name1 ? "text-[#FF0000]" : ""
                    } cursor-pointer hover:bg-gray-200 transition ease-in duration-200`}
                    onClick={() => handleSearch(list?.name1)}
                    key={i}
                  >
                    {list.logo} {list.name}{" "}
                    {category == list?.name1 && productsCount !== 0
                      ? `(${productsCount})`
                      : ""}
                  </li>
                  {(category === "Bikes" || checkSubCategory() === "Bikes") &&
                    list?.name1 === "Bikes" &&
                    subList.map((list: any, i: number) => (
                      <li
                        className={`${
                          category === list?.name1 ? "text-[#FF0000]" : ""
                        } ml-10 cursor-pointer hover:bg-gray-200 transition ease-in duration-200`}
                        key={i}
                        onClick={() => handleSearch(list?.name1)}
                      >
                        {" "}
                        {list?.logo} {list.name}{" "}
                        {category == list?.name1 && productsCount !== 0
                          ? `(${productsCount})`
                          : ""}
                      </li>
                    ))}
                  {(category === "Parts" || checkSubCategory() === "Parts") &&
                    list.name1 === "Parts" &&
                    partsSubList?.map((list: any, i: number) => (
                      <li
                        className={`${
                          subCategory === list?.name1 ? "text-[#FF0000]" : ""
                        } ml-10 cursor-pointer whitespace-nowrap w-auto truncate hover:bg-gray-200 transition ease-in duration-200`}
                        key={i}
                        onClick={() => handleSearch(list?.name1)}
                      >
                        {list?.logo} {list.name}
                        {category == list?.name1 && productsCount !== 0
                          ? `(${productsCount})`
                          : ""}
                      </li>
                    ))}
                </>
              ))}
            </ul>
          </div>
          <div className="flex flex-col w-full space-y-1">
            <div className="flex flex-row p-3 border-2 rounded-sm h-[50px] bg-white">
              <LocationOn className="text-[#FF0000]" />
              <input
                type="text"
                placeholder={t("placeholderAddress")}
                name="address"
                value={address}
                onChange={(e: any) => dispatch(setAddress(e.target.value))}
                className="focus:outline-none pl-2 w-96 overflow-hidden bg-transparent"
              />
            </div>
          </div>
          {category && (
            <>
              <div className="border-b flex flex-row justify-between p-2 mb-4">
                <h1 className="text-lg font-bold">
                  {t("categorySelection.condition")}
                </h1>
              </div>
              <ul className="space-y-2 mx-3 mb-3">
                {conditionList?.map((list: any, i: number) => (
                  <li key={i}>
                    <input
                      type="radio"
                      name="condition"
                      key={i}
                      value={list?.value}
                      onChange={(e: any) =>
                        dispatch(setCondition(e.target.value))
                      }
                    />{" "}
                    {list?.name}
                  </li>
                ))}
              </ul>
            </>
          )}
          {checkSubCategoryFilter.includes(category) && (
            <>
              <div className="border-b flex flex-row justify-between p-2 mb-4">
                <h1 className="text-lg font-bold">
                  {t("autosComponent.vehicleType")}
                </h1>
              </div>
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                name="type"
                onChange={(e) => dispatch(setVehicleType(e.target.value))}
              >
                <option value="option1">
                  {t("autosComponent.selectSubCategory")}
                </option>
                {vehicleSubCategory?.map(
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
            </>
          )}
          {brandInclude.includes(type1) && (
            <>
              <div className="border-b flex flex-row justify-between p-2 mb-4">
                <h1 className="text-lg font-bold">
                  {t("categorySelection.brand")}
                </h1>
              </div>
              <div>
                <select
                  className="block mb-4 appearance-none w-full bg-white border rounded-sm border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                  name="brand"
                  onChange={(e: any) => dispatch(setBrand(e.target.value))}
                >
                  <option value="option1">
                    {t("autosComponent.selectBrand")}
                  </option>
                  {brands?.make?.map((brand: any, i: number) => (
                    <option value={brand} key={i}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {(type1 === "Motorcycles" || type1 === "Autos") &&
            brand &&
            models &&
            models[0]?.model && (
              <>
                <div className="border-b flex flex-row justify-between p-2 mb-4">
                  <h1 className="text-lg font-bold">
                    {t("autosComponent.model")}
                  </h1>
                </div>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                  name="model"
                  onChange={(e: any) => dispatch(setModel(e.target.value))}
                >
                  <option value="option1">{t("autosComponent.model")}</option>
                  {models[0].model.map((model: any, i: number) => (
                    <option value={model} key={i}>
                      {model}
                    </option>
                  ))}
                </select>
              </>
            )}

          {(category === "Autos" || category === "Motorcycles") && (
            <>
              <div className="border-b flex flex-row justify-between p-2 mb-4">
                <h1 className="text-lg font-bold">
                  {t("autosComponent.bodyShape")}
                </h1>
              </div>
              <div>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                  name="bodyShape"
                  onChange={(e: any) => dispatch(setBodyShape(e.target.value))}
                >
                  <option>{t("autosComponent.selectBodyShape")}</option>
                  {bodyShape1?.map((bd: any, i: number) => (
                    <option value={bd.name} key={i}>
                      {t(`bodyShape.${bd.name}`)}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {IncludeKm.includes(type1) && (
            <>
              <div className="border-b flex flex-row justify-between p-2 mb-4">
                <h1 className="text-lg font-bold">
                  {t("autosComponent.kilometers")}
                </h1>
              </div>
              <div>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                  name="km"
                  onChange={(e: any) => dispatch(setKm(e.target.value))}
                >
                  <option value="">
                    {t("autosComponent.selectKilometer")}
                  </option>
                  {kilometers.map((kms: any, i: number) => (
                    <option value={kms.name} key={i}>
                      {kms.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {(category == "Motorcycles" ||
            category === "Autos" ||
            category === "Busses") && (
            <>
              <div className="border-b flex flex-row justify-between p-2 mb-4">
                <h1 className="text-lg font-bold">
                  {t("autosComponent.selectFuelType")}
                </h1>
              </div>
              <div>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                  name="bodyShape"
                  onChange={(e: any) => dispatch(setFuelType(e.target.value))}
                >
                  <option value="option1">
                    {t("autosComponent.selectFuelType")}
                  </option>
                  {fuelTypes?.map((ft: any, i: number) => (
                    <option value={ft.value} key={i}>
                      {t(`fuelType.${ft.name}`)}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {type1 === "Autos" && (
            <>
              <div className="border-b flex flex-row justify-between p-2 mb-4">
                <h1 className="text-lg font-bold">
                  {t("autosComponent.gearBox")}
                </h1>
              </div>
              <div>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                  name="gearBox"
                  onChange={(e: any) => dispatch(setGearBox(e.target.value))}
                >
                  <option value="option1">
                    {t("autosComponent.selectGearBox")}
                  </option>
                  {gearBox1.map((gear: any, i: number) => (
                    <option value={gear?.value} key={i}>
                      {t(`gearBox.${gear.name}`)}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {brand && (
            <>
              <div className="border-b flex flex-row justify-between p-2 mb-4">
                <h1 className="text-lg font-bold">
                  {t("autosComponent.year")}
                </h1>
              </div>
              <div>
                <input
                  className="block mb-4 appearance-none w-full bg-white border rounded-sm border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                  name="year"
                  placeholder={t("autosComponent.enterYear")}
                  onChange={(e: any) => dispatch(setYear(e.target.value))}
                />
              </div>
            </>
          )}
          {category === "Busses" && (
            <>
              <div className="border-b flex flex-row justify-between p-2 mb-4">
                <h1 className="text-lg font-bold">
                  {t("autosComponent.axleCount")}
                </h1>
              </div>
              <div>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                  name="axelCount"
                  onChange={(e: any) => dispatch(setAxelCount(e.target.value))}
                >
                  <option value="option1">
                    {t("autosComponent.selectAxleCount")}
                  </option>
                  {fieldsData?.axelType?.map((axel: any, i: number) => (
                    <option value={axel?.value} key={i}>
                      {axel?.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div className="border-b flex flex-row justify-between p-2">
            <h1 className="text-lg font-bold">
              {t("categorySelection.priceRange")}
            </h1>
          </div>
          <div className="grid grid-col-3 mt-4 space-y-3">
            <div className="h-auto w-auto space-x-4 mx-1">
              <input
                type="text"
                name="maxPrice"
                value={maxPrice}
                className={inputStyle}
                placeholder={t("categorySelection.minPrice")}
                onChange={(e: any) => dispatch(setMaxPrice(e.target.value))}
              />
              <input
                type="text"
                className={inputStyle}
                name="minPrice"
                value={minPrice}
                placeholder={t("categorySelection.maxPrice")}
                onChange={(e: any) => dispatch(setMinPrice(e.target.value))}
              />
            </div>
            <div className="h-auto w-full space-x-4">
              <button className={btnStyle1} onClick={applyFilter}>
                {t("categorySelection.applyFilter")}
              </button>
            </div>
            {(brands || address || minPrice || maxPrice || condition) && (
              <div className="h-auto w-full space-x-4">
                <button className={btnStyle1} onClick={clearFilter}>
                  {t("categorySelection.clearFilter")}
                </button>
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center w-full h-full">
            <Image
              src="/assets/eidcarosse.gif"
              alt="eidcarosse_logo"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <>
            {productData?.length > 0 ? (
              <div className="flex flex-col w-full">
                <div
                  className="flex flex-col md:flex-row justify-between bg-white border border-[#e52320] mb-3 p-2 pl-5"
                  data-aos="fade-left"
                >
                  <div className="mb-2 md:mb-0">
                    <h1 className="text-xl font-bold">
                      {productsCount} {t("categorySelection.results")}
                    </h1>
                  </div>
                  {!category ? (
                    ""
                  ) : (
                    <div className="">
                      <select
                        className="block appearance-none w-72 bg-white border border-gray-300 hover:border-red-600 focus:outline-none px-4 py-2 pr-8 leading-tight"
                        name="sort"
                        onChange={(e: any) => handleSortBy(e)}
                      >
                        {sortByList.map((list: any, i: number) => (
                          <option className="my-1" value={list.value} key={i}>
                            {list.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                {sortByLoading ? (
                  <div className="flex justify-center w-full h-auto">
                    <Image
                      src="/assets/eidcarosse.gif"
                      alt="eidcarosse_logo"
                      width={200}
                      height={200}
                    />
                  </div>
                ) : newWidth <= 688 ? (
                  <ProductList productList={productData} />
                ) : (
                  <div className="messageArea h-[950px]">
                    {productData?.map((product: any, i: number) => (
                      <div
                        className="grid grid-cols-3 h-auto mb-5 hover:border hover:border-red-600 bg-white hover:shadow-md hover:shadow-red-400"
                        key={i}
                      >
                        <Link href={`/product-details/${product?._id}`}>
                          <div className="w-60 lg:w-auto p-2">
                            <div className="flex justify-center bg-gray-50 w-full h-48 border-none rounded-lg">
                              <img
                                src={product?.images[0]}
                                className="h-44 w-auto object-fill border-none rounded-lg"
                                alt=""
                              />
                            </div>
                          </div>
                        </Link>
                        <div className="w-full col-span-2 p-2">
                          <div className="flex flex-row justify-between">
                            <Link href={`/product-details/${product?._id}`}>
                              <h1 className="text-gray-600 w-auto h-8 mt-2 ml-[-2px] text-[13px]">
                                {product.category === "Autos" && (
                                  <div className="space-x-1">
                                    <DirectionsCar
                                      style={{ fontSize: "20px" }}
                                    />
                                    <span>{t("categories.0")}</span>
                                  </div>
                                )}
                                {product.category === "Bikes" && (
                                  <div className="space-x-2">
                                    <TwoWheeler style={{ fontSize: "20px" }} />
                                    <span>{t("categories.1")}</span>
                                  </div>
                                )}
                                {product.category === "Boats" && (
                                  <div className="space-x-2">
                                    <DirectionsBoat
                                      style={{ fontSize: "20px" }}
                                    />
                                    <span>{t("categories.2")}</span>
                                  </div>
                                )}
                                {product.category === "Busses" && (
                                  <div className="space-x-2">
                                    <DirectionsBus
                                      style={{ fontSize: "20px" }}
                                    />
                                    <span>{t("categories.3")}</span>
                                  </div>
                                )}
                                {product.category ===
                                  "Construction Machines" && (
                                  <div className="space-x-2">
                                    <PrecisionManufacturing
                                      style={{ fontSize: "20px" }}
                                    />
                                    <span>{t("categories.4")}</span>
                                  </div>
                                )}
                                {product.category === "Drones" && (
                                  <div className="space-x-2 flex flex-row">
                                    <Image
                                      className="h-5 w-5"
                                      src="/assets/drone.png"
                                      alt="droneIcon"
                                      width={100}
                                      height={100}
                                    />
                                    <span>{t("categories.5")}</span>
                                  </div>
                                )}
                                {product.category === "Others" && (
                                  <div className="space-x-1">
                                    <DataSaverOn style={{ fontSize: "20px" }} />
                                    <span>{t("categories.6")}</span>
                                  </div>
                                )}
                                {product.category === "Parts" && (
                                  <div className="space-x-1">
                                    <BuildCircle style={{ fontSize: "20px" }} />
                                    <span>{t("categories.7")}</span>
                                  </div>
                                )}
                                {product.category === "Trailers" && (
                                  <div className="space-x-1">
                                    <RvHookup style={{ fontSize: "20px" }} />
                                    <span>{t("categories.8")}</span>
                                  </div>
                                )}
                                {product.category === "Trucks" && (
                                  <div className="space-x-1">
                                    <FireTruck style={{ fontSize: "20px" }} />
                                    <span>{t("categories.9")}</span>
                                  </div>
                                )}
                                {product.category === "Vans" && (
                                  <div className="space-x-1">
                                    <AirportShuttle
                                      style={{ fontSize: "20px" }}
                                    />
                                    <span>{t("categories.10")}</span>
                                  </div>
                                )}
                              </h1>
                              <h2 className=" text-[16px] line-clamp-1 text-black font-bold cursor-pointer hover:text-[#FF0000]">
                                {product?.title}
                              </h2>
                            </Link>
                            {product?.userId?._id === userId ? (
                              ""
                            ) : (
                              <div className="space-x-3">
                                <Favorite
                                  className={`${
                                    findProductId(product?._id)
                                      ? "text-[#FF0000]"
                                      : "text-gray-300"
                                  } cursor-pointer`}
                                  onClick={() => adFavorite(product?._id, i)}
                                  style={{ fontSize: "20px" }}
                                />
                                <Share
                                  onClick={() => handleShare(product?._id)}
                                  className="cursor-pointer text-gray-400"
                                  style={{ fontSize: "20px" }}
                                />
                              </div>
                            )}
                          </div>
                          <Link className="mt-3 space-y-1" href={`/product-details/${product?._id}`}>
                            {product?.price ? (
                              <>
                                <h1 className="text-[20px] text-[#FF0000] font-bold">
                                  CHF {addInvertedComma(product?.price)}
                                </h1>
                                <h1 className="text-[12px] text-gray-400 font-bold">
                                  EUR {addInvertedComma(product?.price * 1.06)}
                                </h1>
                              </>
                            ) : (
                              <>
                                <h1 className=" py-2 w-36 h-10 text-[20px] font-semibold">
                                  {t("product.contactForPrice")}
                                </h1>
                              </>
                            )}
                          </Link>
                          <div className="flex flex-row mt-5 w-full">
                            <div className="text-sm w-full line-clamp-1 mr-[10px] lg:mr-0">
                              {showDate(product?.createdAt) < 2 ? (
                                <>
                                  <div className="bg-green-600 text-white rounded-full px-3 text-center w-16">
                                    {t("condition.new")}
                                  </div>
                                </>
                              ) : (
                                <div className="text-[sm] mt-[0.5px]">
                                  <FontAwesomeIcon icon={faClock} />{" "}
                                  {Number.isNaN(showDate(product?.createdAt))
                                    ? "0 days ago"
                                    : `${showDate(
                                        product?.createdAt
                                      )} days ago`}
                                </div>
                              )}
                            </div>
                            <div className="w-full flex justify-end space-x-2">
                              <Chat
                                className="cursor-pointer text-gray-400"
                                style={{ fontSize: "20px" }}
                                onClick={() => handleChat(product)}
                              />
                              <RemoveRedEye
                                className="text-gray-500 mt-[-1px]"
                                style={{ fontSize: "20px" }}
                              />
                              <h1 className="text-[13px]">{product?.views}</h1>
                            </div>
                          </div>
                          <Link
                            className={`flex mt-2 text-gray-600 h-10 border-t-2 pt-2 w-full`}
                            href={`/product-details/${product?._id}`}
                          >
                            <div className="w-full truncate flex flex-row">
                              <LocationOn style={{ fontSize: "20px" }} />
                              <h1 className="text-[13px]">
                                {product?.address}
                              </h1>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {pagination().length > 1 && (
                  <div
                    className={`flex flex-row justify-between bg-white h-12 border border-[#e52320] rounded-sm px-5 py-2 mt-2`}
                  >
                    <>
                      <button className={btnStyle} onClick={previousHandle}>
                        <KeyboardDoubleArrowLeft className={logoStyle} />
                        <span className={spanStyle}></span>
                      </button>
                      <div className="flex flex-row space-x-4">
                        {pagination().map((li: any, i: number) => (
                          <button
                            className={`${
                              page === li
                                ? "bg-[#e52320] w-6 md:w-8 text-white text-[16px] border-none rounded-sm"
                                : "pt-[2px] text-[12px] md:text-lg hover:bg-gray-200 transition duration-150 ease-linear p-2"
                            }`}
                            key={i}
                            onClick={() => {
                              dispatch(setPage(li));
                              scrollToTop(); // Call the scrollToTop function here
                            }}
                          >
                            {li}
                          </button>
                        ))}
                      </div>
                      <button className={btnStyle} onClick={nextHandle}>
                        <span className={spanStyle}></span>
                        <KeyboardDoubleArrowRight className={logoStyle} />
                      </button>
                    </>
                  </div>
                )}
              </div>
            ) : !productData ? (
              <div className="flex justify-center w-full h-full">
                <Image
                  src="/assets/eidcarosse.gif"
                  alt="eidcarosse_logo"
                  width={200}
                  height={200}
                />
              </div>
            ) : (
              <div className="flex w-full justify-center">
                <Image
                className="h-96 w-96"
                src="/assets/no_record.png"
                alt="noRecordFound"
                width={1200}
                height={1200}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
