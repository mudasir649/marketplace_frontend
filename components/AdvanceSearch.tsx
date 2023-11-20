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
  setCondition,
  setMaxPrice,
  setMinPrice,
  setPage,
  setProdId,
  setProductId,
  setProductUserId,
  setShowShare,
  setSortBy,
  setType,
} from "@/store/appSlice";
import addInvertedComma from "@/utils/addInvertedComma";
import ProductList from "./ProductList";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import showDate from "@/utils/showDate";
import { useTranslation } from "react-i18next";
import "./advance-search.css";

interface IList {
  logo: any;
  name: string;
  name1: string;
  quantity: number;
}

interface IFilterSearch {
  condition: string;
  brand: string;
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
  checkType,
}: any) {
  // Redux hooks
  const { t } = useTranslation(); // Initialize the translation hook

  const { page, address, title, type1 } = useSelector(
    (state: any) => state.app
  );
  const [googleLocation, setGoogleLocation] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [showLocation, setShowLocation] = useState<Boolean>(false);
  const [address1, setAddress1] = useState<string>("");
  const [sortByLoading, setSortByLoading] = useState<Boolean>(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { condition, brand, minPrice, maxPrice, prodId } = useSelector(
    (state: any) => state.app
  );
  const userId = userInfo?.data?.userDetails?._id;

  const { width, height } = useWindowDimensions();
  const newWidth = width || 0;
  const newHeight = height || 0;

  const [filtersData, setFiltersData] = useState<IFilterSearch>({
    condition: null || "",
    brand: null || "",
    minPrice: null || "",
    maxPrice: null || "",
  });
  const router = useRouter();

  const pagination = () => {
    let paginationList: any = [];
    let totalPages = Math.ceil(productsCount / 10);
    for (let i = 1; i <= totalPages; i++) {
      paginationList.push(i);
    }
    return paginationList;
  };

  const previousHandle = () => {
    if (page !== 1) {
      dispatch(setPage(page - 1));
    } else {
      return;
    }
  };
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

  const nextHandle = () => {
    if (page !== pagination().length) {
      dispatch(setPage(page + 1));
    } else {
      return;
    }
  };

  const categoryList = [
    {
      logo: <DirectionsCar />,
      name: t("categories.0"),
      name1: "Autos",
      quantity: 23,
    },
    {
      logo: <TwoWheeler />,
      name: t("categories.1"),
      name1: "Bikes",
      quantity: 12,
    },
    {
      logo: <DirectionsBoat />,
      name: t("categories.2"),
      name1: "Boats",
      quantity: 2,
    },
    {
      logo: <DirectionsBus />,
      name: t("categories.3"),
      name1: "Busses",
      quantity: 0,
    },
    {
      logo: <PrecisionManufacturing />,
      name: t("categories.4"),
      name1: "Construction Machines",
      quantity: 74,
    },
    {
      logo: <Flight />,
      name: t("categories.5"),
      name1: "Drones",
      quantity: 32,
    },
    {
      logo: <RvHookup />,
      name: t("categories.8"),
      name1: "Trailers",
      quantity: 90,
    },
    {
      logo: <FireTruck />,
      name: t("categories.9"),
      name1: "Trucks",
      quantity: 11,
    },
    {
      logo: <AirportShuttle />,
      name: t("categories.10"),
      name1: "Vans",
      quantity: 9,
    },
    {
      logo: <BuildCircle />,
      name: t("categories.7"),
      name1: "Parts",
      quantity: 0,
    },
    {
      logo: <DataSaverOn />,
      name: t("categories.6"),
      name1: "Others",

      quantity: 23,
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
      name1: "E-Scooters",
    },
    {
      logo: <ElectricBike />,
      name: t("subList.2"),
      name1: "E-Bikes",
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
      name1: "Autos Parts",
    },
    {
      logo: <TwoWheeler />,
      name: t("categoriesParts.1"),
      name1: "Bikes Parts",
    },
    {
      logo: <DirectionsBoat />,
      name: t("categoriesParts.2"),
      name1: "Boat Parts",
    },
    {
      logo: <DirectionsBus />,
      name: t("categoriesParts.3"),
      name1: "Busses Parts",
    },
    {
      logo: <PrecisionManufacturing />,
      name: t("categoriesParts.4"),
      name1: "Construction Machines Parts",
    },
    {
      logo: <Flight />,
      name: t("categoriesParts.5"),
      name1: "Drones Parts",
    },
    {
      logo: <RvHookup />,
      name: t("categoriesParts.7"),
      name1: "Trailers Parts",
    },
    {
      logo: <FireTruck />,
      name: t("categoriesParts.8"),
      name1: "Trucks Parts",
    },
    {
      logo: <AirportShuttle />,
      name: t("categoriesParts.9"),
      name1: "Vans Parts",
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
      value: "Latest"
    },
    {
    name: t("sortByList.1"),
    value: "Old"
    },
    {
      name: t("sortByList.4"), 
      value: "Price (low to high)"
    },
    {
      name: t("sortByList.4"),
      value: "Price (high to low)"
    },
    {
      name: t("sortByList.2"),
      value: "A to Z (title)"
    },
    {
      name: t("sortByList.3"), 
      value: "Z to A (title)"
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  const handleSearch = async (value: any) => {
    dispatch(setPage(1));
    dispatch(setCondition(""));
    dispatch(setBrand(""));
    dispatch(setType(value));
    router.push(`/advance-search/${value}`);
  };

  console.log(type1);

  const handleFilterData = (e: any) => {
    setFiltersData({ ...filtersData, [e.target.name]: e.target.value });
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

  async function applyFilter() {
    setLoading(true);
    if (pathname == "/advance-search/search" || pathname == "/advance-search") {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&address=${address1}&title=${title}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        setProductData(res.data?.data?.ad);
        setProductsCount(res.data?.data?.totalAds);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&address=${address1}&category=${category}&condition=${condition}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        setProductData(res.data?.data?.ad);
        setProductsCount(res.data?.data?.totalAds);
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
    let subValue;    
    if(category === "Motorcycles" || category === "Bicycles" || category === "E-scooter" ||category === "E-bikes"){
      try {
        res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=Bikes&subCategory=${category}&sortBy=${value}`
        );
        setProductData(res.data?.data?.ad);
        setProductsCount(res.data?.data?.totalAds);
        setSortByLoading(false);
      } catch (error) {
        setSortByLoading(false);
        console.log(error);
      }
    }else{
      try {
        res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${category}&sortBy=${value}`
        );
        setProductData(res.data?.data?.ad);
        setProductsCount(res.data?.data?.totalAds);
        setSortByLoading(false);
      } catch (error) {
        setSortByLoading(false);
        console.log(error);
      }
    }
    setSortByLoading(false);
  };

  const adFavorite = async (productId: any) => {
    if (userInfo === null) {
      router.push("/login");
    } else {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/setFavorite/${productId}/${userId}`
      );
      if (res.status == 201) {
        dispatch(setProdId([...prodId, productId]));
      }
    }
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
    setAddress1(value);
    setShowLocation(false);
  };

  const handleShare = (productId: any) => {
    dispatch(setShowShare(true));
    dispatch(setProductId(productId));
  };

  const handleChat = async (product: any) => {
    if (userInfo !== null) {
      dispatch(setProductId(product?._id));
      dispatch(setProductUserId(product?.userId));
      const data = {
        userId: userId,
        productUserId: product?.userId,
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // const scrollToTop = () => {
  //   const scrollStep = -window.scrollY / 60; // Adjust the division factor for speed
  
  //   const scrollInterval = setInterval(() => {
  //     if (window.scrollY !== 0) {
  //       window.scrollBy(0, scrollStep);
  //     } else {
  //       clearInterval(scrollInterval);
  //     }
  //   }, 15); // Adjust the interval for smoother animation
  // };
  const checkSubCategory = () => {
    if (
      subCategory === "Bicycles" ||
      subCategory === "E-scooter" ||
      subCategory === "E-bikes" ||
      subCategory === "Motorcycle"
    ) {
      return "Bikes";
    } else if (
      subCategory === "Auto Parts" ||
      subCategory === "Bike Parts" ||
      subCategory === "Boat Parts" ||
      subCategory === "Drone Parts" ||
      subCategory === "Bus Parts" ||
      subCategory === "Construction Machine Parts" ||
      subCategory === "Other Parts" ||
      subCategory === "Trailer Parts" ||
      subCategory === "Truck Parts" ||
      subCategory === "Van Parts"
    ) {
      return "Parts";
    }
  };

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
                    } cursor-pointer`}
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
                        } ml-10 cursor-pointer`}
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
                          category === list?.name1 ? "text-[#FF0000]" : ""
                        } ml-10 cursor-pointer whitespace-nowrap w-auto truncate`}
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
                value={address1}
                onChange={(e: any) => setAddress1(e.target.value)}
                className="focus:outline-none pl-2 w-96 overflow-hidden bg-transparent"
                onKeyUp={(e: any) => checkPlace(e)}
              />
            </div>
            {showLocation && address && (
              <div
                className={`flex flex-row p-2 border-2 border-[#FF0000] h-52 rounded-lg lg:p-2 bg-white overflow-y-scroll ${
                  newWidth <= 1024 ? "" : "absolute top-[202px] z-20 w-[320px]"
                }`}
              >
                {showLocation ? (
                  <ul className="w-full">
                    {googleLocation?.map((location: any, i: number) => (
                      <li
                        className="border-b"
                        key={i}
                        onClick={() => saveLocation(location?.description)}
                      >
                        {location.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </div>
            )}
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
          {brands && (
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
                  {brands?.make.map((brand: any, i: number) => (
                    <option value={brand} key={i}>
                      {brand}
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
            {brands && (
              <div className="h-auto w-full space-x-4">
                <button
                  className={btnStyle1}
                  onClick={() => {
                    router.push("/advance-search");
                  }}
                >
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
                  <div className="flex justify-center w-full h-full">
                    <Image
                      src="/assets/eidcarosse.gif"
                      alt="eidcarosse_logo"
                      width={200}
                      height={200}
                    />
                  </div>
                ) : newWidth <= 550 ? (
                  <ProductList productList={productData} />
                ) : (
                  <div className="messageArea h-[950px]">
                    {productData?.map((product: any, i: number) => (
                      <div
                        className="grid grid-cols-3 h-auto mb-5 hover:border hover:border-red-600 bg-white hover:shadow-md hover:shadow-red-400 transition-transform transform"
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
                                    <DirectionsCar style={{fontSize: "20px"}} />
                                    <span>{t("categories.0")}</span>
                                  </div>
                                )}
                                {product.category === "Bikes" && (
                                  <div className="space-x-2">
                                    <TwoWheeler style={{fontSize: "20px"}} />
                                    <span>{t("categories.1")}</span>
                                  </div>
                                )}
                                {product.category === "Boats" &&
                                <div className="space-x-2">
                                  <DirectionsBoat style={{fontSize: "20px"}} />
                                  <span>{t("categories.2")}</span>
                                </div>
                              }
                                {product.category === "Busses" &&
                                <div className="space-x-2">
                                  <DirectionsBus style={{fontSize: "20px"}} />
                                  <span>{t("categories.3")}</span>
                                </div>
                                }
                                {product.category === "Construction Machines" &&
                                <div className="space-x-2">
                                  <PrecisionManufacturing style={{fontSize: "20px"}} />
                                  <span>{t("categories.4")}</span>
                                </div>
                                  }
                                {product.category === "Drones" &&
                                <div className="space-x-2 flex flex-row">
                                  <Image className="h-5 w-5" src="/assets/drone.png" alt="droneIcon" width={100} height={100} />
                                  <span>{t("categories.5")}</span>
                                </div>
}
                                {product.category === "Others" &&
                                <div className="space-x-1">
                                  <DataSaverOn style={{fontSize: "20px"}} />
                                  <span>{t("categories.6")}</span>
                                </div>}
                                {product.category === "Parts" &&
                                <div className="space-x-1">
                                  <BuildCircle style={{fontSize: "20px"}} />
                                  <span>{t("categories.7")}</span>
                                </div>
                                }
                                {product.category === "Trailers" &&
                                <div className="space-x-1">
                                  <RvHookup style={{fontSize: "20px"}} />
                                  <span>{t("categories.8")}</span>
                                </div>}
                                {product.category === "Trucks" &&
                                <div className="space-x-1">
                                  <FireTruck style={{fontSize: "20px"}} />
                                  <span>{t("categories.9")}</span>
                                </div>
                                }
                                {product.category === "Vans" &&
                                <div className="space-x-1">
                                  <AirportShuttle style={{fontSize: "20px"}} />
                                  <span>{t("categories.10")}</span>
                                </div>
                                  }
                              </h1>
                              <h2 className=" text-[16px] line-clamp-1 text-black font-bold cursor-pointer hover:text-[#FF0000]">
                                {product?.title}
                              </h2>
                            </Link>
                            <div className="space-x-3">
                              <Favorite
                                className={`${
                                  findProductId(product?._id)
                                    ? "text-[#FF0000]"
                                    : "text-gray-300"
                                } cursor-pointer`}
                                onClick={() => adFavorite(product?._id)}
                                style={{ fontSize: "20px" }}
                              />
                              <Share
                                onClick={() => handleShare(product?._id)}
                                className="cursor-pointer text-gray-400"
                                style={{ fontSize: "20px" }}
                              />
                            </div>
                          </div> 
                          <div className="mt-3 space-y-1">
                            {product?.price ? (
                              <>
                                <h1 className="text-[20px] text-[#FF0000] font-bold">
                                  CHF {addInvertedComma(product?.price)}
                                </h1>
                                <h1 className="text-[12px] text-gray-400 font-bold">
                                  EURO {addInvertedComma(product?.price * 2)}
                                </h1>
                              </>
                            ) : (
                              <>
                                <h1 className="bg-black text-white text-center py-2 w-36 h-10 border-none rounded-lg text-[16px] font-semibold">
                                  {t("product.contactForPrice")}
                                </h1>
                              </>
                            )}
                          </div>
                          <div className="flex flex-row mt-5 w-full">
                            <div className="text-sm w-full line-clamp-1 mr-[10px] lg:mr-0">
                              {showDate(product?.createdAt) < 2 ? (
                                <>
                                  <div className="bg-green-600 text-white rounded-full px-3 text-center w-16">
                                    {t('co.new')}
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
                          <div
                            className={`flex mt-2 text-gray-600 h-10 border-t-2 pt-2 w-full`}
                          >
                            <div className="w-full truncate flex flex-row">
                              <LocationOn style={{ fontSize: "20px" }} />
                              <h1 className="text-[13px]">
                                {product?.address}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div
                  className={`flex flex-row justify-between bg-white h-12 border border-[#e52320] rounded-sm px-5 py-2 mt-2`}
                >
                  <button className={btnStyle} onClick={previousHandle}>
                    <KeyboardDoubleArrowLeft className={logoStyle} />
                    <span className={spanStyle}>
                    </span>
                  </button>
                  <div className="flex flex-row space-x-4">
                    {pagination().map((li: any, i: number) => (
                      <button
                      className={`${
                        page === li && "bg-[#e52320] w-6 md:w-8 text-white text-[12px] border-none rounded-sm"
                      } pt-[2px] text-[12px] md:text-lg`}
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
                    <span className={spanStyle}>
                    </span>
                    <KeyboardDoubleArrowRight className={logoStyle} />
                  </button>
                </div>
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
                <h1 className="text-xl font-bold">
                  {" "}
                  {t("categorySelection.noRecordFound")}
                </h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
