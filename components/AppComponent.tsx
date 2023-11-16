import { typeMap } from "@/utils/dataVariables";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import Header2 from "./Header2";
import Footer from "./Footer";
import Banner from "./Banner";

function AppComponent({ children }: any) {
  const { type1 } = useSelector((state: any) => state.app);
  const pathname = usePathname();
  const checkType: string = typeMap[type1] || type1;
  return (
    <div className="w-full">
      <Header2 />
      {pathname === "/" ||
      pathname === "/advance-search" ||
      pathname === `/advance-search/${checkType}` ||
      pathname === `/advance-search/search` ? (
        <Banner />
      ) : (
        ""
      )}
      {children}
      <Footer />
    </div>
  );
}

export default AppComponent;
