import React from "react";
import { useRouter } from "next/navigation";
import {
  setShowContact,
} from "@/store/appSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import BackToTop from "./BackToTop";
import Image from "next/image";
import useWindowDimensions from "@/utils/useWindowDimensions";

interface IList {
  name: String;
  value: String;
}


export default function Footer() {
  const { t } = useTranslation(); // Initialize the translation hook

  const dispatch = useDispatch();
  const router = useRouter();

  let { width } = useWindowDimensions();

  let newWidth = width || 0;


  const handleFooter = (value: any) => {
    if (value == "About Eidcarosse") {
      router.push("/about-us");
    } else if(value === "privacy-policy"){
      router.push('/privacy-policy')
    }else if(value === 'terms-and-condition'){
      router.push('/terms-and-condition')
    }else if(value === 'faq'){
      router.push('/faq')
    }else if(value === 'buy-and-sell-quickly'){
      router.push('/how-to-sell-fast')
    }
     else if (value === "Contact") {
      router.push('/contact-us')
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
      value: "buy-and-sell-quickly",
    },
    {
      name: t("list2.1"),
      value: "",
    },
    {
      name: t("list2.2"),
      value: "",
    },
    {
      name: t("list3.1"),
      value: "Contact",
    },
    {
      name: t("list4.0"),
      value: "faq",
    },
  ];

  const list4 = [
    {
      name: t("list3.0"),
      value: "About Eidcarosse",
    },
    {
      name: t("list3.2"),
      value: t("list3.2"),
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
      {newWidth <= 460 ? 
      <>
      <div className="flex flex-col lg:flex-row gap-4 container mx-auto py-4 border-t-2 border-b-2">
        <div className="flex">
          <div className="w-full">
            {list2?.map((lst: IList, i: number) => (
              <h1
              className={`text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000] px-3 ${i > 0 ? 'mt-5': ''}`}
              key={i}
              onClick={() => handleFooter(lst.value)}
              // onClick={() => router.push("/how-to-sell-fast")}
            >
              {lst.name}
            </h1>            
          ))}
          </div>
          <div className="w-full">
          {list4?.map((lst: IList, i: number) => (
              <h1
              className={`text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000] px-3 ${i > 0 ? 'mt-5': ''}`}
              key={i}
              onClick={() => handleFooter(lst.value)}
              // onClick={() => router.push("/how-to-sell-fast")}
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
      </>
      : 
      <>
      <div className="flex flex-col lg:flex-row gap-4 container mx-auto py-4 border-t-2 border-b-2">
        <div className="flex flex-wrap whitespace-nowrap">
        {list2.map((list: IList, i: number) => (
            <h1
              className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000] px-3 mb-2"
              key={i}
              onClick={() => handleFooter(list.value)}
            >
              {list.name}
            </h1>
          ))}
          {list4?.map((lst: IList, i: number) => (
            <h1
              className="text-sm cursor-pointer text-[#007AB7] hover:text-[#FF0000] px-3 mb-2"
              key={i}
              onClick={() => handleFooter(lst.value)}
            >
              {lst.name}
            </h1>
          ))}
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
      </>
}
    </footer>
  );
}
