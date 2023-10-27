"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
        ) : pathname === "/post-ad/E-scooter" ? (
          <BikeSubComponent type={"E-scooter"} />
        ) : pathname === "/post-ad/E-bikes" ? (
          <BikeSubComponent type={"E-bikes"} />
        ) : pathname === "/post-ad/Motorcycle" ? (
          <BikeSubComponent type={"Motorcycle"} />
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
        ) : pathname === "/post-ad/Auto%20Parts" ? (
          <PartsComponent type={"Auto Parts"} />
        ) : pathname === "/post-ad/Bike%20Parts" ? (
          <PartsComponent type={"Bike Parts"} />
        ) : pathname === "/post-ad/Boat%20Parts" ? (
          <PartsComponent type={"Boat Parts"} />
        ) : pathname === "/post-ad/Bus%20Parts" ? (
          <PartsComponent type={"Bus Parts"} />
        ) : pathname === "/post-ad/Construction%20Machine%20Parts" ? (
          <PartsComponent type={"Construction Machine Parts"} />
        ) : pathname === "/post-ad/Drone%20Parts" ? (
          <PartsComponent type={"Drone Parts"} />
        ) : pathname === "/post-ad/Other%20Parts" ? (
          <PartsComponent type={"Other Parts"} />
        ) : pathname === "/post-ad/Trailer%20Parts" ? (
          <PartsComponent type={"Trailer Parts"} />
        ) : pathname === "/post-ad/Truck%20Parts" ? (
          <PartsComponent type={"Truck Parts"} />
        ) : pathname === "/post-ad/Van%20Parts" ? (
          <PartsComponent type={"Van Parts"} />
        ) : (
          ""
        )}
      </>
    );
  }
  return null;
}
