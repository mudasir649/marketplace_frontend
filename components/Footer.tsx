import React from 'react'
import { list1, list2, list3, list4 } from "../utils/dataVariables";

interface IList {
  name: String
}

export default function Footer() {

  const headingStyle = 'capitalize text-xl font-bold text-white mb-5'
  const ulStyle = 'text-gray-300 mb-5'

  return (
    <footer>
      <div className='bg-gray-900'>
        <div className='flex flex-col lg:flex-row container mx-auto lg:space-x-20 lg:p-20 p-10'>
          <div>
            <h1 className={headingStyle}>Popular Categories</h1>
            <ul className={ulStyle}>
              {list1?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i}>{lst.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={headingStyle}>How to sell fast</h1>
            <ul className={ulStyle}>
              {list2?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i}>{lst.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={headingStyle}>Information</h1>
            <ul className={ulStyle}>
              {list3?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i}>{lst.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={headingStyle}>help & support</h1>
            <ul className={ulStyle}>
              {list4?.map((lst: IList, i: number) => (
                <li className='mb-3' key={i}>{lst.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='bg-black py-8 text-center text-white'>
        <div className='container mx-auto'>
          Cospyright &copy; 2023 Eidcarosse. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
