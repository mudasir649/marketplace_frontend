import React from "react";
import { useRouter } from "next/navigation";
import {
  setProductData,
  setProductsCount,
  setShowContact,
} from "@/store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import BackToTop from "./BackToTop";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import Image from "next/image";

interface IList {
  name: String;
  value: String;
}

interface IList1 {
  name: String;
  value: String;
}

export default function Footer() {
  const { t } = useTranslation(); // Initialize the translation hook

  const headingStyle = "capitalize text-xl font-bold mb-5";
  const ulStyle = "text-gray-500 mb-5";
  const dispatch = useDispatch();
  const router = useRouter();

  const { page } = useSelector((state: any) => state.app);

  const handleFooter = (value: any) => {
    if (value == "About Eidcarosse") {
      router.push("/about-us");
    } else if (value === "Contact") {
      dispatch(setShowContact(true));
    }
  };

  const list1 = [
    {
      name: t("categories.0"),
    },
    {
      name: t("categories.1"),
    },
    {
      name: t("categories.2"),
    },
  ];

  const list2 = [
    {
      name: t("list2.0"),
      value: "",
    },
    {
      name: t("list2.1"),
      value: "",
    },
    {
      name: t("list2.2"),
      value: "",
    },
  ];

  const list3 = [
    {
      name: t("list3.0"),
      value: "About Eidcarosse",
    },
    {
      name: t("list3.1"),
      value: "Contact",
    },
  ];

  const list4 = [
    {
      name: t("list3.2"),
      value: t("list3.2"),
    },
    {
      name: t("list4.0"),
      value: "faq",
    },
    {
      name: t("list4.2"),
      value: "privacy-policy",
    },
    {
      name: t("list4.4"),
      value: "terms-and-condition",
    },
  ];

  return (
    <footer className="w-full bottom-0 mt-8">
      <div className="flex flex-col lg:flex-row gap-4 container mx-auto py-4 border-t-2 border-b-2">
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row w-auto">
          <div className="flex">
          {list2.map((list: IList, i: number) => (
            <h1
              className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000] px-3"
              key={i}
              onClick={() => router.push("/how-to-sell-fast")}
            >
              {list.name}
            </h1>
          ))}
          {list3?.map((lst: IList, i: number) => (
            <h1
              className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000] px-3"
              key={i}
              onClick={() => handleFooter(lst.value)}
            >
              {lst.name}
            </h1>
          ))}
          </div>
          <div className="flex">
          {list4?.map((lst: IList, i: number) => (
            <h1
              className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000] px-3"
              key={i}
              onClick={() => handleFooter(lst.value)}
            >
              {lst.name}
            </h1>
          ))}
          </div>
        </div>
        <div className="flex gap-5">
          <Image
            className="h-6 w-6"
            src="/assets/facebook 1.png"
            alt="facebook"
            width={50}
            height={50}
          />
          <Image
            className="h-6 w-6"
            src="/assets/instagram 1.png"
            alt="facebook"
            width={50}
            height={50}
          />
          <Image
            className="h-6 w-6"
            src="/assets/twitter 1.png"
            alt="facebook"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className="text-center text-[black] my-2">
        <div className="container mx-auto md:inline-block">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
  return (
    <footer className="w-full bottom-0 bg-white border-t-2">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center px-4 py-4">
        <div className="bg-red-500 w-full">
          {list2.map((list: IList, i: number) => (
            <h1
              className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]"
              key={i}
              onClick={() => router.push("/how-to-sell-fast")}
            >
              {list.name}
            </h1>
          ))}
          {list3?.map((lst: IList, i: number) => (
            <h1
              className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]"
              key={i}
              onClick={() => handleFooter(lst.value)}
            >
              {lst.name}
            </h1>
          ))}
        </div>
        <div className="bg-blue-500 w-full">div 3</div>
        {/* <div className="md:hidden mb-4">
          <div className="flex flex-col space-y-2">
            {list2?.map((lst: IList, i: number) => (
              <h1
                className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]"
                key={i}
                onClick={() => router.push("/how-to-sell-fast")}
              >
                {lst.name}
              </h1>
            ))}
            {list3?.map((lst: IList, i: number) => (
              <h1
                className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]"
                key={i}
                onClick={() => handleFooter(lst.value)}
              >
                {lst.name}
              </h1>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            {list4?.map((lst: IList1, i: number) => (
              <h1
                className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]"
                key={i}
                onClick={() => router.push(`${lst.value}`)}
              >
                {lst.name}
              </h1>
            ))}
          </div>
        </div>
        <div className="hidden md:flex flex-col md:flex-row md:space-y-0 md:space-x-8">
          <div className="flex flex-col space-y-2">
            {list2?.map((lst: IList, i: number) => (
              <h1
                className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]"
                key={i}
                onClick={() => router.push("/how-to-sell-fast")}
              >
                {lst.name}
              </h1>
            ))}
            {list3?.map((lst: IList, i: number) => (
              <h1
                className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]"
                key={i}
                onClick={() => handleFooter(lst.value)}
              >
                {lst.name}
              </h1>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            {list4?.map((lst: IList1, i: number) => (
              <h1
                className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000]"
                key={i}
                onClick={() => router.push(`${lst.value}`)}
              >
                {lst.name}
              </h1>
            ))}
          </div>
        </div> */}

        {/* <div className="md:text-right text-[black]">
          <div className="container mx-auto md:inline-block">
            {t("copyright")}
          </div>
        </div> */}

        {/* Back to Top */}
        <div className="md:ml-auto">
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
