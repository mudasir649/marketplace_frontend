import { setProductData, setProductsCount } from "@/store/appSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  AirportShuttle,
  BuildCircle,
  DataSaverOn,
  DirectionsBike,
  DirectionsBoat,
  DirectionsBus,
  DirectionsCar,
  ElectricBike,
  ElectricScooter,
  FireTruck,
  Flight,
  PrecisionManufacturing,
  RvHookup,
  TwoWheeler,
} from "@mui/icons-material";

export default function CategoryList({ setCategory, setExpand }: any) {
    const { t } = useTranslation(); // Initialize the translation hook

    const subList = [
        {
          logo: <DirectionsBike />,
          name: t("subList.0"),
          name1: "Bicycles",
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
          name: t("subList.3"),
          name1: "Motorcycles",
        },
      ];
    
      const partsSubList = [
        {
          logo: <DirectionsCar />,
          name: t("categoriesParts.0"),
          name1: "Auto Parts",
        },
        {
          logo: <TwoWheeler />,
          name: t("categoriesParts.1"),
          name1: "Bike Parts",
        },
        {
          logo: <DirectionsBoat />,
          name: t("categoriesParts.2"),
          name1: "Boat Parts",
        },
        {
          logo: <DirectionsBus />,
          name: t("categoriesParts.3"),
          name1: "Bus Parts",
        },
        {
          logo: <PrecisionManufacturing />,
          name: t("categoriesParts.4"),
          name1: "Construction Machine Parts",
        },
        {
          logo: <Flight />,
          name: t("categoriesParts.5"),
          name1: "Drone Parts",
        },
        {
          logo: <RvHookup />,
          name: t("categoriesParts.7"),
          name1: "Trailer Parts",
        },
        {
          logo: <FireTruck />,
          name: t("categoriesParts.8"),
          name1: "Truck Parts",
        },
        {
          logo: <AirportShuttle />,
          name: t("categoriesParts.9"),
          name1: "Van Parts",
        },
        
        {
          logo: <DataSaverOn />,
          name: t("categoriesParts.6"),
          name1: "Other Parts",
        },
      ];

  const { page } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  const liStyle =
    "hover:text-[#FF0000] border-b border-gray-200 whitespace-nowrap";
    const categoryliStyle =
    "flex space-x-2 hover:text-[#FF0000] border-b border-gray-200 whitespace-nowrap";

  const router = useRouter();
  const handleClick = async (value: any) => {
    // setCategory(value);

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad?page=${page}&category=${value}`
      );
      dispatch(setProductData(res.data?.data.ad));
      dispatch(setProductsCount(res.data?.data.totalAds));
      router.push(`/advance-search/${value}`);
    } catch (error) {}
    router.push(`/advance-search/${value}`);
    setExpand(false);
  };
  return (
    <div>
      <ul className="text-gray-500 space-y-1 cursor-pointer dropdow-menu z-10">
        <li onClick={() => handleClick("Autos")} className={liStyle}>
          {" "}
          <DirectionsCar /> {t("categories.0")}
        </li>
        <li className={`dropdow`}>
          <h1 onClick={() => handleClick("Bikes")} className={liStyle}>
            {" "}
            <DirectionsBike /> {t("categories.1")}
          </h1>
          <div className="absolute hidden ml-[220px] mt-[-30px] bg-white w-auto h-auto p-2 border-none rounded-sm dropdow-menu">
            <ul className="block">
              {subList?.map((list: any, i: number) => (
                <li
                  className={categoryliStyle}
                  onClick={() => handleClick(list.name1)}
                  key={i}
                >
                      <h1>{list?.logo}</h1>
                      <h1>{list.name}</h1>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li onClick={() => handleClick("Boats")} className={liStyle}>
          <DirectionsBoat /> {t("categories.2")}
        </li>
        <li onClick={() => handleClick("Busses")} className={liStyle}>
          <DirectionsBus /> {t("categories.3")}
        </li>
        <li
          onClick={() => handleClick("Construction Machines")}
          className={liStyle}
        >
          <PrecisionManufacturing /> {t("categories.4")}
        </li>
        <li onClick={() => handleClick("Drones")} className={liStyle}>
          <Flight /> {t("categories.5")}
        </li>
        <li className={`dropdow`}>
          <h1 className={liStyle}>
            {" "}
            <BuildCircle /> {t("categories.7")}
          </h1>
          <div className="absolute hidden ml-[220px] mt-[-30px] bg-white w-auto h-auto p-2 border-none rounded-sm dropdow-menu">
            <ul className="block">
              {partsSubList?.map((list: any, i: number) => (
                <li
                  className={categoryliStyle}
                  onClick={() => handleClick(list.name1)}
                  key={i}
                >
                    <h1>{list?.logo}</h1>
                    <h1>{list.name}</h1>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li onClick={() => handleClick("Trucks")} className={liStyle}>
          <RvHookup /> {t("categories.8")}
        </li>
        <li onClick={() => handleClick("Vans")} className={liStyle}>
          <FireTruck /> {t("categories.9")}
        </li>
        <li onClick={() => handleClick("Trailers")} className={liStyle}>
          <AirportShuttle /> {t("categories.10")}
        </li>
        <li onClick={() => handleClick("Others")} className={liStyle}>
        <DataSaverOn /> {t("categories.6")}
        </li>
        
      </ul>
    </div>
  );
}
