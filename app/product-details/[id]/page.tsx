/*
This page is about is about product details. In this page there is two divs one for showing product details and one for showing sellers 
details. Both divs are named in comments

*/
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  AccessTime,
  Cancel,
  Category,
  Favorite,
  InsertLink,
  Language,
  Mail,
  Phone,
  PhoneInTalk,
  Place,
  Share,
  Visibility,
  WhatsApp,
} from "@mui/icons-material";
import MapContainer from "@/components/MapContainer";
import AOS from "aos";
import axios  from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./productDetails.css";
import { Helmet } from 'react-helmet';


import formatDateTime from "@/utils/checkTime";
import {
  setProductId,
  setShowShare,
  setProductUserId,
} from "@/store/appSlice";
import dynamic from "next/dynamic";
import addInvertedComma from "@/utils/addInvertedComma";
import { useTranslation } from "react-i18next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Head from "next/head";


function ProductDetails() {
  const { t } = useTranslation(); // Initialize the translation hook

  const { id } = useParams();
  const [product, setProduct] = useState<any>();

  const { userInfo } = useSelector((state: any) => state.auth);
  const userId = userInfo?.data?.userDetails?._id;

  const { refresh } = useSelector((state: any) => state.app);
  const router = useRouter();
  const dispatch = useDispatch();
  const [prodId, setProdId] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/getSpecific/${id}`
        );
        setProduct(res.data?.data);
      } catch (error: any) {
        if(error.response.status === 400){
          router.push('/')
        }
      }
    };
    const addView = async () => {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/addView?id=${id}`
      );
    };
    addView();
    fetchData();
  }, [id, refresh, router]);

  const [contact, setContact] = React.useState(false);

  useEffect(() => {
    AOS.init();
  }, [id]);

  const handleChange = () => {
    setContact(!contact);
  };

  const listStyle2 = "text-sm text-gray-500";

  const adFavorite = async (productId: any) => {
    if (userInfo === null) {
      router.push("/login");
    } else {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/setFavorite/${productId}/${userId}`
      );
      if (res.status == 201) {
        setProdId([...prodId, productId]);
      } else {
        const newProdId = prodId.filter((prod: any, i: number) => {
          return prod !== productId;
        });
        setProdId(newProdId);
      }
    }
  };

  type InteriorColor = "Beige" | "Black" | "Grey" | "White" | "Brown" | "Red" | "Yellow" | "Orange" | "Other";
  const interiorColor: InteriorColor = product?.interiorColor || "Other";

  const interiorColorTranslations: {
    [key in InteriorColor]: string;
  } = {
    Beige: t('interiorColor.name1'),
    Black: t('interiorColor.name2'),
    Grey: t('interiorColor.name3'),
    White: t('interiorColor.name4'),
    Brown: t('interiorColor.name5'),
    Red: t('interiorColor.name6'),
    Yellow: t('interiorColor.name7'),
    Orange: t('interiorColor.name8'),
    Other: t('interiorColor.name9'),
  };
  


  
  

  const findProductId = (productId: any) => {
    return prodId.includes(productId);
  };

  const handleShare = (productId: string) => {
    dispatch(setShowShare(true));
    dispatch(setProductId(productId));
  };

  const handleChat = async () => {
    if (userInfo !== null) {
      dispatch(setProductId(product?._id));
      dispatch(setProductUserId(product?.userId?._id));
      const data = {
        userId: userId,
        productUserId: product?.userId?._id,
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

  const redirectLogin: any = () => {
     router.push('/login')
  }
  
  

  return (
    <div className="">
     <Helmet>
        <title>{`${product?.title}`}</title>
        <meta name="description" content={`${product?.name}`} />
        
        {/* Add an image to the metadata */}
        <meta property="og:image" content={product?.images[0]} />
        {/* Optional: Add more Open Graph tags for better social media sharing */}
        <meta property="og:title" content={`Product Details: ${product?.description}`} />
        <meta property="og:description" content={`Details for ${product?.description}`} />

        {/* Add more meta tags as needed */}
      </Helmet>
      <>
        {!product ? (
          <div className="flex justify-center mt-5">
            <Image
              src="/assets/eidcarosse.gif"
              alt="eidcarosse_logo"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 grid-flow-rows mx-4 lg:mx-20 mt-10">
            <div className="col-span-2">
              <div
                className={`lg:w-auto min-h-[800px] mb-5 border rounded-lg bg-white p-5`}
              >
<div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
  <Carousel>
    {product?.images.map((img: any, i: number) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={img}
        alt={`image${i}`}
        key={i}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '800px',
          maxHeight: '400px',
          objectFit: 'contain',
          display: 'block', // Ensures the image is centered within its container
          margin: '0 auto', // Horizontally centers the image
        }}
      />
    ))}
  </Carousel>
</div>

                {product?.price * 1 === 0 ? (
                  <div className="bg-black space-y-2 rounded-lg rounded-tr-[700px] rounded-br-[700px] w-40 p-2 h-16 md:w-64 md:h-auto">
                    <h1 className="text-white text-sm md:text-3xl font-bold">
                      {t("product.contactForPrice")}
                    </h1>
                  </div>
                ) : (
                  // <div className="bg-[#FF0000] space-y-2 rounded-lg rounded-tr-[700px] rounded-br-[700px] w-40 p-2 h-16 md:w-64 md:h-auto">
                  //   <h1 className="text-white text-sm md:text-3xl font-bold">
                  //     CHF {addInvertedComma(product?.price * 1)}
                  //   </h1>
                  //   <h1 className="text-gray-300 text-sm md:text-xl font-semibold">
                  //     Euro {addInvertedComma(product?.price * 2)}
                  //   </h1>
                  // </div>
                  <>
                         {/* <div className="bg-[#FF0000] space-y-2 rounded-lg rounded-tr-[700px] rounded-br-[700px] w-40 p-2 h-16 md:w-64 md:h-auto">
                           <h1 className="text-white text-sm md:text-3xl font-bold">
                             CHF {addInvertedComma(product?.price * 1)}
                          </h1>
                          <h1 className="text-gray-300 text-sm md:text-xl font-semibold">
                            Euro {addInvertedComma(product?.price * 2)}
                           </h1>
                         </div> */}
                        <h1 className="text-[#FF0000] text-sm md:text-3xl font-bold">
                          CHF {addInvertedComma(product?.price * 1)}
                        </h1><h1 className="text-gray-500 text-sm md:text-xl font-semibold">
                          Euro {addInvertedComma(product?.price * 2)}
                        </h1></>
                )}
                <div className="flex flex-col md:flex-row justify-between my-6">
                  <div className="space-y-4 mb-5 md:mb-0">
                    <div className="text-black font-bold text-3xl">
                      <h1>{product?.title}</h1>
                    </div>
                    <div className="flex flex-row gap-2 text-gray-600">
                      <Category className="text-[#FF0000]" />
                      <h1 className="text-black">  {product.category === "Autos" && t('categories.0')}
    {product.category === "Bikes" && t('categories.1')}
    {product.category === "Boats" && t('categories.2')}
    {product.category === "Busses" && t('categories.3')}
    {product.category === "Construction Machines" && t('categories.4')}
    {product.category === "Drones" && t('categories.5')}
    {product.category === "Others" && t('categories.6')}
    {product.category === "Parts" && t('categories.7')}
    {product.category === "Trailers" && t('categories.8')}
    {product.category === "Trucks" && t('categories.9')}
    {product.category === "Vans" && t('categories.10')}</h1>
                    </div>
                    <div className="flex flex-row gap-2 text-gray-600">
                      <Place className="text-[#FF0000]" />
                      <h1 className="text-black">{product?.address}</h1>
                    </div>
                    <div className="flex flex-row gap-2 text-gray-600">
                      <AccessTime className="text-[#FF0000]" />
                      <h1 className="text-black">
                        {formatDateTime(product?.createdAt)}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <h1>
                      <Visibility className="text-gray-500" />{" "}
                      <span className={listStyle2}>{product?.views}</span>
                    </h1>
                    <Favorite
                      className={`${
                        findProductId(product?._id)
                          ? "text-[#FF0000]"
                          : "text-gray-300"
                      } cursor-pointer`}
                      onClick={() => adFavorite(product?._id)}
                    />
                    <h1>
                      <Share
                        className="text-gray-500"
                        onClick={() => handleShare(product?._id)}
                      />
                    </h1>
                  </div>
                </div>
                <div className="border-t-2">
                  <div className="mt-5">
                    <h1 className="text-xl font-bold">
                      <span className="relative">
                        <span>{t("product.Overview")}</span>
                        <span className="absolute bottom-0 left-0 w-8 h-1 bg-[#FF0000] top-7"></span>
                      </span>
                    </h1>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
                      {!product?.subCategory ? '' : <h1><span className="font-bold">{t("product.subCategory")}: </span> {t(`subCategoryOptions.${product.subCategory}`)}</h1> }
                      {!product?.condition ? '' : <h1><span className="font-bold">{t("product.Condition")}: </span>{t(`condition.${product.condition}`)} </h1> }
                      {!product?.brand ? '' : <h1><span className="font-bold">{t("product.Brand")}: </span> {product?.brand}</h1> }
                      {!product?.model ? '' : <h1><span className="font-bold">{t("product.Model")}: </span> {product?.model}</h1> }
                      {!product?.year ? '' : <h1><span className="font-bold">{t("product.Year")}: </span> {product?.year}</h1> }
                      {!product?.bodyShape ? '' : <h1><span className="font-bold">{t("product.BodyShape")}: </span> {t(`bodyShape.${product.bodyShape}`)}</h1> }
                      {!product?.fuelType ? '' : <h1><span className="font-bold">{t("product.FuelType")}: </span> {t(`fuelType.${product.fuelType}`)}</h1> }
                      {!product?.km ? '' : <h1 className="line-clamp-1"><span className="font-bold">{t("product.Kilometers")}: </span> {product?.km}</h1> }
                      {!product?.gearBox ? '' : <h1><span className="font-bold">{t("product.Gearbox")}: </span> {t(`gearBox.${product.gearBox}`)}</h1> }
                      {!product?.axeltype ? '' : <h1><span className="font-bold">Axel Type: </span>{product?.axeltype}</h1> }
                      {!product?.engineCapacity ? '' : <h1><span className="font-bold">{t("product.EngineCapacity")}: </span> {product?.engineCapacity}</h1> }
                      {!product?.interiorColor ? '' : <h1><span className="font-bold">{t("product.InteriorColor")}: </span>{t(`interiorColor.${product.interiorColor}`)}</h1> }
                      {!product?.exteriorColor ? '' : <h1><span className="font-bold">{t("product.ExteriorColor")}: </span> {t(`interiorColor.${product.exteriorColor}`)}</h1> }
                    </ul>
                  </div>
                </div>
                {product?.description !== "" && (
                  <div className="border-t-2 space-y-2 mt-2">
                    <h1 className="text-xl font-bold mt-5">
                      <span className="relative">
                        <span>{t('autosComponent.description')}</span>
                        <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#FF0000] top-7"></span>
                      </span>
                      </h1>
                    <p className="inline-block break-words w-full border-b-2 p-2">
                      {product?.description}
                    </p>
                  </div>
                )}
                <section className="space-y-1 mt-3">
                  {product?.videoUrl && (
                    <h1 className="flex whitespace-nowrap gap-1">
                      <span className="font-bold">
                        {" "}
                        <InsertLink className="text-[#FF0000] mt-[-4px]" />{" "}
                        {t('autosComponent.videoURL')}:{" "}
                      </span>
                      <span className="w-auto truncate">{product?.videoUrl}</span>
                    </h1>
                  )}
                </section>
              </div>
            </div>

            <div className="">
              <div className="w-full lg:w-auto max-h-[440px]">
                <div className=" bg-white p-5 border rounded-lg">
                  <div className="border-b border-gray-300">
                    <h1 className="text-xl text-center font-bold uppercase mb-3">
                      {t("product.SellerInformation")}
                    </h1>
                  </div>
                  <div className="flex flex-row mt-4 space-x-4">
                    <Image
                      className="h-16 w-16 border rounded-full"
                      src={product?.userId?.image}
                      alt="logo"
                      width={100}
                      height={100}
                    />
                    <div>
                    <h1 className="mt-2 text-lg font-semibold">
                      {product?.userId?.firstName +
                        " " +
                        product?.userId?.lastName}{" "}
                    </h1>
                    <h1 className="text-sm">Member Since {new Date(product?.createdAt).toLocaleString('en-us', { month: "short", year: "numeric" })}</h1>
                    </div>
                  </div>
                  <div className="space-y-3 mt-7">
                    {product?.whatsapp || product?.viber || product?.phone ? 
                    <>
                    {!contact && (
                      <div
                        className="border bg-gray-800 text-md font-semibold text-white p-2 rounded-md cursor-pointer"
                        onClick={handleChange}
                      >
                        <div className="flex flex-row justify-center gap-2">
                          <Phone />
                          <span>{t("product.ContactSeller")}</span>
                        </div>
                      </div>
                    )} 
                    {contact ?  (
                      userInfo ? 
                      <div className="bg-gray-100 text-black border border-gray-100 flex flex-col justify-center translate-y-0 transition ease-linear duration-200 ">
                        <div className="flex justify-end">
                        <Cancel
                            className="text-red-500"
                            onClick={() => setContact(false)}
                          />
                        </div>
                        <div className="mx-auto space-y-2 mb-2">
                        {product?.viber && (
                            <h1 className="space-x-3">
                              <PhoneInTalk className="text-white border bg-purple-500 border-purple-500 rounded-lg mr-3" />{" "}
                              {product?.viber}
                            </h1>
                          )}
                          {product?.whatsapp && (
                            <h1>
                              {" "}
                              <WhatsApp className="text-green-500 mr-3" />{" "}
                              {product?.whatsapp}
                            </h1>
                          )}
                          {product?.phone && (
                            <h1>
                              {" "}
                              <Phone className="text-[#FF0000] mt-[-1px] mr-3" />{" "}
                              {product?.userId?.phoneNumber}
                            </h1>
                          )}
                        </div>
                      </div>
                      :
                      redirectLogin()
                    ) : ''}
                    </>
                    : ''}
                    
                    {userId === product?.userId?._id ? (
                      ""
                    ) : (
                      <div className="border bg-[#FF0000] text-md font-semibold text-white p-2 rounded-md cursor-pointer">
                        <a
                          className="flex flex-row justify-center gap-2"
                          onClick={handleChat}
                        >
                          <Mail />
                          <span>{t("product.SendMessage")}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 bg-white p-3 space-y-3">
                <h1 className="font-bold text-xl"> {t("product.Location")}</h1>
                <div className="flex flex-row gap-2 text-gray-600">
                  <Place className="text-[#FF0000]" />
                  <h1>{product?.address}</h1>
                </div>
                <MapContainer
                  apikey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
                  address={product?.address}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProductDetails), { ssr: false });
