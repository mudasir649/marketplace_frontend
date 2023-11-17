import { routeName, typeMap } from "@/utils/dataVariables";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import Header2 from "./Header2";
import Footer from "./Footer";
import Banner from "./Banner";

function AppComponent({ children }: any) {
  const pathname = usePathname();  
  const checkType = routeName.includes(pathname);
  
  return (
    <div className="w-full">
      <Header2 />
      {!checkType ? <Banner /> : ''}
      {children}
      <Footer />
    </div>
  );
}

export default AppComponent;
