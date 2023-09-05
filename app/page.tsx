'use client'
import Product from "@/components/Product";
import Home from "../components/Home";
import productData from "@/utils/data";
import topProductData from "@/utils/data copy";
import FooterBanner from "@/components/FooterBanner";
import TopProducts from "@/components/TopProducts";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { East } from "@mui/icons-material";
import SellRepairComponent from "@/components/SellRepairComponent";
import ProductList from "@/components/ProductList";
import { ToastContainer } from "react-toastify";

export default function MainPage() {

  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;

  // const ProductsList = ({ productList }: any) => {
  //   return (
  //     <>
  //       <div className='container mx-auto'>
  //         <div className={`grid ${newWidth < 688 ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-14`}>
  //           {productList?.map((product: any, i: any) => {
  //             return (
  //               <Product product={product} key={i} />
  //             )
  //           })}
  //         </div>
  //       </div>
  //     </>
  //   )
  // }

  return (
    <div className="">
      <Home suppressHydrationWarning={true}>
        <SellRepairComponent />
        <TopProducts>
          <ProductList productList={topProductData} />
        </TopProducts>
        <FooterBanner />
        <section className='mb-20'>
          <div className='container mx-auto flex justify-between mb-5'>
            <h1 className='text-xl lg:text-3xl font-bold ml-6 mt-1'>Top Inserts</h1>
            <span className='capitalize text-lg font-bold mt-[5px] mr-[25px]'>see all Ads <East className='text-[#e52320]' data-aos="fade-right" /> </span>
          </div>
          <ProductList productList={productData} />
        </section>
      </Home>
    </div>
  )
}
