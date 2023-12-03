"use client";
import { PlaylistAdd } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./post-ad.css";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Select from "react-select";

export default function PostAd() {

  const { t } = useTranslation();

  const CustomOption = ({ innerProps, label, data }: any) => (
    <div {...innerProps} className="flex w-full p-2 hover:bg-blue-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.image}
        alt="image"
        style={{ width: "20px", marginRight: "8px" }}
      />
      <h1 className="-mt-1">
      {t(`allCategories.${data.name}`)}</h1>
    </div>
  );

  const router = useRouter();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo === null) {
      router.push("/login");
    }
  }, [userInfo, router]);

  const [openSub, isOpenSub] = useState<Boolean>(false);
  const [showSub, setShowSub] = useState<Boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [list, setList] = useState<any>();
  const [subList, setSubList] = useState<any>();
  const [subCategory, setSubCategory] = useState<string>("");

  const handleCategory = (value: any, subValue: any) => {
    setCategory(value);
    if (value == "Bikes") {
      setShowSub(true);
      setSubList(subValue);
    } else if (value == "Parts") {
      setShowSub(true);
      setSubList(subValue);
    } else {
      router.push(`/post-ad/${value}`);
    }
  };

  const handleSubCategory = (value: any) => {
    setSubCategory(value);
    router.push(`/post-ad/${value}`);
  };

  console.log(subCategory);
  

  useEffect(() => {
    const fetchList = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/ad/get-types-list`
      );
      if (res.status === 200) {
        setList(res.data?.data);
      }
    };
    fetchList();
  }, []);

  if (userInfo !== null) {
    return (
      <>
        <div className="container mx-auto mb-20 mt-10">
          <div className="border-none box-container bg-white rounded-sm h-full p-3">
            <div className="container mx-auto">
              <h1 className="space-x-3 border-b-2 pb-3">
                <PlaylistAdd className="text-[#FF0000] mt-[-4px]" />
                <span className="text-lg font-bold">
                  {t("postAd.selectCategory")}
                </span>
              </h1>
            </div>
            <div className="container mx-0 mt-6 lg:mx-20 w-auto">
              <div className="flex flex-col md:flex-row justify-end space-x-0 md:space-x-20 space-y-2 md:space-y-0 mb-5 mt-5">
                <h1
                  className={`flex flex-row space-x-1 text-md font-bold ${
                    showSub && "w-40"
                  }`}
                >
                  {t("postAd.category")}{" "}
                  <span className="text-[#FF0000]">*</span>
                </h1>
                <div className="w-full flex">
                  <Select
                    className="w-full hover:outline-[#FF0000] focus:outline-[#FF0000]"
                    defaultValue={t("postAd.selectCategory")}
                    options={list}
                    value={
                      category ? { value: category, label: category } : null
                    }
                    onChange={(selectedOption: any) =>
                      handleCategory(
                        selectedOption.name,
                        selectedOption.subCategories
                      )
                    }
                    isSearchable={false}
                    components={{
                      Option: CustomOption,
                    }}
                  />
                </div>
              </div>
              {showSub && (
                <div className="flex flex-col md:flex-row justify-end space-x-0 md:space-x-20 space-y-2 md:space-y-0 mb-5 mt-5">
                  <h1 className="flex flex-row space-x-1 text-md font-bold w-40 whitespace-nowrap truncate">
                    {t("postAd.subCategory")}{" "}
                    <span className="text-[#FF0000]">*</span>
                  </h1>
                  <div
                    className="flex flex-col hover:border-red-500 w-full rounded-sm h-10"
                    onClick={() => isOpenSub(!openSub)}
                  >
                    <div className="flex flex-row">
                      <Select
                        className="w-full"
                        options={subList}
                        value={
                          subCategory ? { value: subCategory, label: subCategory } : null
                        }                        
                        onChange={(selectedOption: any) =>
                          handleSubCategory(
                            selectedOption.name,
                          )
                        }
                        isSearchable={false}
                        components={{
                          Option: CustomOption,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
