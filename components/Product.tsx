import {
  AirportShuttle,
  BuildCircle,
  Chat,
  DataSaverOn,
  Delete,
  DirectionsBoat,
  DirectionsBus,
  DirectionsCar,
  EditNote,
  Favorite,
  FireTruck,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocationOn,
  PrecisionManufacturing,
  RemoveRedEye,
  RvHookup,
  Share,
  TwoWheeler,
} from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";
import "./ImageSlider.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  refreshPage,
  setProdId,
  setProductId,
  setProductUserId,
  setShowDeleteAd,
} from "@/store/appSlice";
import addInvertedComma from "@/utils/addInvertedComma";
import { useTranslation } from "react-i18next";
import "./product.css";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Product({ product, url }: any) {
  const { refresh, roomsData } = useSelector((state: any) => state.app);
  const { t } = useTranslation(); // Initialize the translation hook

  const pathname = usePathname();
  const dispatch = useDispatch();
  const checkPathname = pathname == "/my-favourites" ? true : false;
  const [fav, setFav] = useState<Boolean>(checkPathname);
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { prodId } = useSelector((state: any) => state.app);
  const userId = userInfo?.data?.userDetails?._id;

  useEffect(() => {
    AOS.init();
  }, [product]);

  const deleteAd = async (id: any) => {
    dispatch(setProductId(id));
    dispatch(setShowDeleteAd(true));
    // console.log(product?.chatIds);
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % product?.images.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? product?.images.length - 1 : prevSlide - 1
    );
  };
  const adFavorite = async () => {
    if (userInfo === null) {
      router.push("/login");
    } else {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/setFavorite/${product?._id}/${userId}`
      );
      if (res.status == 201) {
        dispatch(setProdId([...prodId, product]));
        dispatch(refreshPage(refresh + 1));
      } else {
        if (pathname == "/my-favourites") {
          dispatch(refreshPage(refresh + 1));
          const newRecord = prodId?.filter((item: any) => {
            return item._id !== product?._id;
          });
          dispatch(setProdId(newRecord));
        } else {
          const newRecord = prodId?.filter((item: any) => {
            return item._id !== product?._id;
          });
          dispatch(setProdId(newRecord));
          setFav(false);
        }
      }
    }
  };


  const handleShare = () => {
    let linkToCopy = `${process.env.NEXT_PUBLIC_LINK_URI}/product-details/${product?._id}`;
    try {
      navigator.clipboard.writeText(linkToCopy);
      toast('Link Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleChat = async () => {
    if (userInfo !== null) {
      dispatch(setProductId(product?._id));
      dispatch(setProductUserId(product?.userId?._id));
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

  const checkFavAds = () => {
    return prodId.some((item: any) => item._id === product?._id);
  };

  return (
    <div className="mb-3" data-aos="fade-up">
      <div className="image-slider group relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-2 cursor-pointer hover:shadow-md hover:shadow-[#e52320]">
        <Link href={`/product-details/${product?._id}`}>
          <div className="w-full h-52 md:h-40 relative overflow-hidden">
            <div
              className="image-slider-container"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / product?.images.length)
                }%)`,
                transition: "transform 0.5s ease-in-out",
                display: "flex",
                width: `${product?.images.length * 100}%`, // Adjust the width
              }}
            >
              {product?.images.map((image: string, index: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  className="h-40 object-contain image-transition"
                  src={image}
                  alt="Product Image"
                  style={{ flex: `0 0 ${100 / product?.images.length}%` }}
                />
              ))}
            </div>
          </div>
        </Link>
        {product?.images?.length > 1 && (
          <div className="slide-buttons">
            <button
              className="prev-button hidden group-hover:block"
              onClick={prevSlide}
            >
              <KeyboardArrowLeft style={{ background: "transparent" }} />
            </button>
            <button
              className="next-button hidden group-hover:block"
              onClick={nextSlide}
            >
              <KeyboardArrowRight style={{ background: "transparent" }} />
            </button>
          </div>
        )}
        
          <div className="px-6 py-4 max-w-full">
            <div className="w-auto overflow-hidden flex flex-row justify-between">
              <section className="overflow-hidden">
                {product?.price * 1 === 0 ? (
                  <h1 className="bg-black text-white text-center pt-2 w-32 h-10 border-none rounded-lg text-[14px] font-semibold">
                    {t("product.contactForPrice")}
                  </h1>
                ) : (
                  <>
                    <h2 className="text-[#FF0000] font-bold text-[17px] w-32 truncate">
                      CHF {addInvertedComma(product?.price * 1)}
                    </h2>
                    <h1 className="text-gray-400 font-semibold text-[13px] w-32 truncate">
                      EURO {addInvertedComma(product?.price * 2)}
                    </h1>
                  </>
                )}
              </section>
              <section className="flex flex-row">
                {product?.userId === userId ? '' : 
              <Favorite
                    className={`${
                      checkFavAds() ? "text-[#FF0000]" : "text-gray-300"
                    } cursor-pointer`}
                    onClick={() => adFavorite()}
                  />
}
              </section>
            </div>
            <Link href={`/product-details/${product?._id}`}>
            <div className="justify-between mt-5">
            <section className="text-gray-600 w-auto h-8 mt-2 ml-[-2px] text-[13px]">
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
            </section>
              <section className="text-lg font-semibold text-black w-full truncate">
                {product?.title}
              </section>
            </div>
        </Link>
          </div>
        <div className="mx-5 mb-12">
          <div className="text-gray-600 w-full h-10 border-t-2 pt-2 space-x-1">
            <div className="flex">
             <LocationOn
                  className="text-gray-400"
                  style={{ fontSize: "18px" }}
                />
                <h1 className="mt-[-1px] text-[13px] line-clamp-1">
                  {product?.address}
                </h1>
            </div>
          <div className="flex flex-row justify-between mt-3">
            <div>
              {pathname == "/my-ads" ? (
              <div className="flex flex-row space-x-2">
                <EditNote
                  className="text-4xl text-yellow-500"
                  onClick={() => router.push(`/edit-ad/${product?._id}`)}
                />
                <Delete
                  className="text-3xl text-red-500"
                  onClick={() => deleteAd(product?._id)}
                />
              </div>
            ) : (
              <>
                <div className="space-x-3">
                  <Share
                    onClick={() => handleShare()}
                    className="cursor-pointer text-gray-500"
                    style={{ fontSize: "18px" }}
                    />
                  {product.userId === userId ? (
                    ""
                  ) : (
                    <Chat
                    className="text-gray-500"
                    style={{ fontSize: "18px" }}
                    onClick={() => handleChat()}
                    />
                  )}
                </div>
              </>
            )}
            </div>
            <div className="flex space-x-1 mt-1">
            <RemoveRedEye
                    className="text-gray-500"
                    style={{ fontSize: "20px" }}
                  />
                  <h1 className="flex-grow text-[13px]">{product?.views}</h1>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
