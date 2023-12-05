"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import AutosComponent from "@/components/AutosComponent";
import { useSelector } from "react-redux";
import BikeSubComponent from "@/components/BikeSubComponent";
import VehicleSubComponent from "@/components/VehicleSubComponent";
import SpecialCatComponent from "@/components/SpecialCatComponent";
import PartsComponent from "@/components/PartsComponent";
import OthersComponent from "@/components/OthersComponent";

export default function Addtype() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const userData =
    userInfo === null ? userInfo : userInfo?.data?.userDetails?._id;
  const router = useRouter();  

  const pathname = usePathname();

  useEffect(() => {
    if (userData === null) {
      router.push("/");
    }
  }, [router, userData]);

  if (userData !== null) {
    return (
      <>
        {pathname === "/post-ad/Autos" ? (
          <AutosComponent />
        ) : pathname === "/post-ad/Bicycles" ? (
          <BikeSubComponent type={"Bicycles"} />
        ) : pathname === "/post-ad/E-scooters" ? (
          <BikeSubComponent type={"E-scooters"} />
        ) : pathname === "/post-ad/E-bikes" ? (
          <BikeSubComponent type={"E-bikes"} />
        ) : pathname === "/post-ad/Motorcycles" ? (
          <BikeSubComponent type={"Motorcycles"} />
        ) : pathname === "/post-ad/Busses" ? (
          <VehicleSubComponent type={"Busses"} />
        ) : pathname === "/post-ad/Construction%20Machines" ? (
          <VehicleSubComponent type={"Construction Machines"} />
        ) : pathname === "/post-ad/Trailers" ? (
          <VehicleSubComponent type={"Trailers"} />
        ) : pathname === "/post-ad/Trucks" ? (
          <VehicleSubComponent type={"Trucks"} />
        ) : pathname === "/post-ad/Vans" ? (
          <VehicleSubComponent type={"Vans"} />
        ) : pathname === "/post-ad/Boats" ? (
          <SpecialCatComponent type={"Boats"} />
        ) : pathname === "/post-ad/Drones" ? (
          <SpecialCatComponent type={"Drones"} />
        ) : pathname === "/post-ad/Others" ? (
          <OthersComponent type={"Others"} />
        ) : pathname === "/post-ad/Auto" ? (
          <PartsComponent type={"Auto"} />
        ) : pathname === "/post-ad/Bike" ? (
          <PartsComponent type={"Bike"} />
        ) : pathname === "/post-ad/Boat" ? (
          <PartsComponent type={"Boat"} />
        ) : pathname === "/post-ad/Buss" ? (
          <PartsComponent type={"Buss"} />
        ) : pathname === "/post-ad/Construction%20Machine" ? (
          <PartsComponent type={"Construction Machine"} />
        ) : pathname === "/post-ad/Drone" ? (
          <PartsComponent type={"Drone"} />
        ) : pathname === "/post-ad/Other" ? (
          <PartsComponent type={"Other"} />
        ) : pathname === "/post-ad/Trailer" ? (
          <PartsComponent type={"Trailer"} />
        ) : pathname === "/post-ad/Truck" ? (
          <PartsComponent type={"Truck"} />
        ) : pathname === "/post-ad/Van" ? (
          <PartsComponent type={"Van"} />
        ) : (
          ""
        )}
      </>
    );
  }
  return null;
}
