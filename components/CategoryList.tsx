'use client';
import { useRouter } from "next/navigation";
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
import { useSelector } from "react-redux";

export default function CategoryList({ setCategory, setExpand }: any) {
    const { t } = useTranslation(); // Initialize the translation hook

    const { vehicleList } = useSelector((state: any) => state.app);

    console.log(vehicleList[1]?.subCategories[3]?.image);
    


    const subList = [
      {
        logo: <Image className="h-6 w-6" src={vehicleList[1]?.subCategories[3]?.image} alt="droneIcon" width={100} height={100} />,
        name: t("subList.3"),
        name1: "Motorcycles",
      },  
      
        {
          logo: <Image className="h-6 w-6" src={vehicleList[1]?.subCategories[1]?.image} alt="droneIcon" width={100} height={100} />,
          name: t("subList.1"),
          name1: "E-Scooters",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[1]?.subCategories[2]?.image} alt="droneIcon" width={100} height={100} />,
          name: t("subList.2"),
          name1: "E-Bikes",
        },{
          logo: <Image className="h-6 w-6" src={vehicleList[1]?.subCategories[0]?.image} alt="droneIcon" width={100} height={100} />,
          name: t("subList.0"),
          name1: "Bicycles",
        },
        
      ];
    
      const partsSubList = [
        {
          logo: <Image className="h-6 w-6" src={vehicleList[0]?.image} alt="auto" width={100} height={100} />,
          name: t("categoriesParts.0"),
          name1: "Auto",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[1]?.image} alt="auto" width={100} height={100} />,
          name: t("categoriesParts.1"),
          name1: "Bike",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[2]?.image} alt="auto" width={100} height={100} />,
          name: t("categoriesParts.2"),
          name1: "Boat",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[3]?.image} alt="auto" width={100} height={100} />,
          name: t("categoriesParts.3"),
          name1: "Buss",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[7]?.image} alt="droneIcon" width={100} height={100} /> ,
          name: t("categoriesParts.4"),
          name1: "Construction Machine",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[4]?.image} alt="droneIcon" width={100} height={100} />,
          name: t("categoriesParts.5"),
          name1: "Drone",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[5]?.image} alt="droneIcon" width={100} height={100} /> ,
          name: t("categoriesParts.7"),
          name1: "Trailer",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[6]?.image} alt="droneIcon" width={100} height={100} />,
          name: t("categoriesParts.8"),
          name1: "Truck",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[8]?.image} alt="droneIcon" width={100} height={100} />,
          name: t("categoriesParts.9"),
          name1: "Van",
        },
        {
          logo: <Image className="h-6 w-6" src={vehicleList[10]?.image} alt="droneIcon" width={100} height={100} />,
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
          <Image className="h-6 w-6" src={vehicleList[0]?.image} alt="auto" width={100} height={100} /> <h1> {t("categories.0")}</h1>
        </li>
        <li className={`dropdow`}>
          <h1 onClick={() => handleClick("Bikes")} className={liStyle}>
            {" "}
            <Image className="h-6 w-6" src={vehicleList[1]?.image} alt="auto" width={100} height={100} /> <h1>{t("categories.1")}</h1> 
          </h1>
          <div className="absolute hidden ml-[220px] mt-[-30px] bg-white w-auto h-auto p-2 border-none rounded-sm dropdow-menu">
            <ul className="block">
              {subList?.map((list: any, i: number) => (
                <li
                  className={categoryliStyle}
                  onClick={() => handleClick(list.name1)}
                  key={i}
                >
                      {list?.logo}
                      <h1>{list.name}</h1>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li onClick={() => handleClick("Boats")} className={liStyle}>
          <Image className="h-6 w-6" src={vehicleList[2]?.image} alt="auto" width={100} height={100} /> <h1>{t("categories.2")}</h1>
        </li>
        <li onClick={() => handleClick("Busses")} className={liStyle}>
          <Image className="h-6 w-6" src={vehicleList[3]?.image} alt="auto" width={100} height={100} /> <h1>{t("categories.3")}</h1>
        </li>
        <li
          onClick={() => handleClick("Construction Machines")}
          className={liStyle}
        >
          <Image className="h-6 w-6" src={vehicleList[7]?.image} alt="auto" width={100} height={100} /> <h1>{t("categories.4")}</h1>
        </li>
        <li onClick={() => handleClick("Drones")} className={liStyle}>
          <Image className="h-6 w-6" src={vehicleList[4]?.image} alt="droneIcon" width={100} height={100} />
          <h1>{t("categories.5")}</h1>
        </li>
        <li onClick={() => handleClick("Trailers")} className={liStyle}>
          <Image className="h-6 w-6" src={vehicleList[5]?.image} alt="droneIcon" width={100} height={100} /> <h1>{t("categories.8")}</h1>
        </li>
        <li onClick={() => handleClick("Trucks")} className={liStyle}>
          <Image className="h-6 w-6" src={vehicleList[6]?.image} alt="droneIcon" width={100} height={100} /> <h1>{t("categories.9")}</h1>
        </li>
        <li onClick={() => handleClick("Vans")} className={liStyle}>
          <Image className="h-6 w-6" src={vehicleList[8]?.image} alt="droneIcon" width={100} height={100} /> <h1>{t("categories.10")}</h1>
        </li>
        <li className={`dropdow`}>
          <h1 onClick={() => handleClick("Parts")} className={liStyle}>
            {" "}
              <Image className="h-6 w-6" src={vehicleList[9]?.image} alt="droneIcon" width={100} height={100} /> <h1>{t("categories.7")}</h1>
          </h1>
          <div className="absolute hidden ml-[220px] mt-[-30px] bg-white w-auto h-auto p-2 border-none rounded-sm dropdow-menu">
            <ul className="block w-52">
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
          <Image className="h-6 w-6" src={vehicleList[10]?.image} alt="droneIcon" width={100} height={100} /> <h1>{t("categories.6")}</h1>
        </li>
      </ul>
    </div>
  );
}