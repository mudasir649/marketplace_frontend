import { setShowRepairNow, setShowSellNow } from "@/store/appSlice";
import { DirectionsCar, Handyman } from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "@/utils/useWindowDimensions";

export default function SellRepairComponent() {
  const { t } = useTranslation();
  const bothDivsStyle = "border rounded-md lg:w-[450px] hover:shadow-md hover:shadow-[#e52320] w-auto h-64 text-center p-5 space-y-3";
  const h1Style = "cursor-pointer text-2xl font-semibold hover:text-[#FF0000]";
  const btnStyle = "h-10 w-40 bg-[#FF0000] hover:bg-red-700 text-white p-2";

  const { width, height } = useWindowDimensions();

    const newWidth = width || 0;
    const newHeight = height || 0;


  const dispatch = useDispatch();

  return (
    <div className="-mb-4">
      <div className="container mx-auto flex justify-center p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className={bothDivsStyle}>
            <div className="flex justify-center">
              <Image
                src="/assets/carIcon.png"
                alt="car logo"
                height={80}
                width={80}
                className="cursor-pointer"
              />
            </div>
            <h1 className={`${h1Style} line-clamp-1`}>
              {t("sellRepairComponent.sellTitle")}
            </h1>
            <h1 className="text-md line-clamp-1">
              {t("sellRepairComponent.sellSubtitle")}
            </h1>
            <button
              className={btnStyle}
              onClick={() => dispatch(setShowSellNow(true))}
            >
              {t("sellRepairComponent.sellButton")}
            </button>
          </div>
          <div className={bothDivsStyle}>
            <div className="flex justify-center">
              <Image
                src="/assets/repairIcon.png"
                alt="car logo"
                height={80}
                width={80}
                className="cursor-pointer"
              />
            </div>
            <h1 className={`${h1Style} line-clamp-1`}>
              {t("sellRepairComponent.repairTitle")}
            </h1>
            <h1 className="text-md line-clamp-1">
              {t("sellRepairComponent.repairSubtitle")}
            </h1>
            <button
              className={btnStyle}
              onClick={() => dispatch(setShowRepairNow(true))}
            >
              {t("sellRepairComponent.repairButton")}
            </button>
          </div>
        </div>
      </div>
      {/* <div className="container mx-auto flex p-5">
        <div className="flex w-full">
            {newWidth <= 1024 ? '' :
            <div className="w-[500px]">
                <Image 
            className="h-auto w-auto"
            src='/assets/banner12.jpeg'
            alt="banner"
            width={300}
            height={300}
            />
            </div>
        }
            <div className="w-full flex flex-col md:flex-row md:py-14 ml-5">
                <div className="w-full">
                    <h1 className="capitalize text-4xl font-bold">Download Our <span className="text-[#FF0000]">eidcarosse</span> App</h1>
                    <p className="text-xl mt-3">Buy, sell and find just about anything using the app on your mobile.</p>
                </div>
                <div className="w-full p-0 pt-4 md:p-7">
                    <h1 className="capitalize text-lg font-semibold">Get your app today</h1>
                    <div className="flex space-x-5 mt-4">
                        <Image 
                        src='/assets/appstore.jpeg'
                        alt="appstore"
                        width={150}
                        height={150}
                        />
                        <Image 
                        src='/assets/playstore.png'
                        alt="appstore"
                        width={150}
                        height={150}
                        />
                    </div>
                </div>
            </div>
        </div>
      </div> */}
    </div>
  );
}
