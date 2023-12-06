import { useRouter } from "next/navigation";
import React from "react";
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
  PrecisionManufacturing,
  RvHookup,
  TwoWheeler,
} from "@mui/icons-material";
import Image from "next/image";

export default function CategoryList({ setCategory, setExpand }: any) {
    const { t } = useTranslation(); // Initialize the translation hook

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
        },{
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
          logo: <Image className="h-7 w-7" src="/assets/drone.png" alt="droneIcon" width={100} height={100} />,
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

  const liStyle =
    "border-b border-gray-200 whitespace-nowrap flex flex-row space-x-1 hover:bg-gray-200 p-1";
    const categoryliStyle =
    "flex space-x-2 border-b border-gray-200 whitespace-nowrap hover:bg-gray-200 p-1";

  const router = useRouter();

  const handleClick = async (value: any) => {
    setCategory(value);
    router.push(`/advance-search/${value}`);
    setExpand(false);
  };


  return (
    <div>
      <ul className="text-gray-500 space-y-1 cursor-pointer dropdow-menu-category z-10">
        <li onClick={() => handleClick("Autos")} className={liStyle}>
          {" "}
          <h1> <DirectionsCar /></h1> <h1> {t("categories.0")}</h1>
        </li>
        <li className={`dropdow`}>
          <h1 onClick={() => handleClick("Bikes")} className={liStyle}>
            {" "}
            <h1> <TwoWheeler /> </h1> <h1>{t("categories.1")}</h1> 
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
          <h1><DirectionsBoat /></h1> <h1>{t("categories.2")}</h1>
        </li>
        <li onClick={() => handleClick("Busses")} className={liStyle}>
          <h1><DirectionsBus /></h1> <h1>{t("categories.3")}</h1>
        </li>
        <li
          onClick={() => handleClick("Construction Machines")}
          className={liStyle}
        >
          <h1><PrecisionManufacturing /></h1> <h1>{t("categories.4")}</h1>
        </li>
        <li onClick={() => handleClick("Drones")} className={liStyle}>
          <h1><Image className="h-7 w-7" src="/assets/drone.png" alt="droneIcon" width={100} height={100} /></h1>
          <h1>{t("categories.5")}</h1>
        </li>
        <li onClick={() => handleClick("Trailers")} className={liStyle}>
          <h1> <RvHookup /></h1> <h1>{t("categories.8")}</h1>
        </li>
        <li onClick={() => handleClick("Trucks")} className={liStyle}>
          <h1><FireTruck /></h1> <h1>{t("categories.9")}</h1>
        </li>
        <li onClick={() => handleClick("Vans")} className={liStyle}>
          <h1><AirportShuttle /></h1> <h1>{t("categories.10")}</h1>
        </li>
        <li className={`dropdow`}>
          <h1 onClick={() => handleClick("Parts")} className={liStyle}>
            {" "}
            <h1><BuildCircle /></h1> <h1>{t("categories.7")}</h1>
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
        <li onClick={() => handleClick("Others")} className={liStyle}>
          <h1><DataSaverOn /></h1> <h1>{t("categories.6")}</h1>
        </li>
      </ul>
    </div>
  );
}