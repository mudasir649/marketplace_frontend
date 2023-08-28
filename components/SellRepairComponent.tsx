import { DirectionsCar, Handyman } from '@mui/icons-material';
import React from 'react'

export default function SellRepairComponent() {

    const bothDivsStyle = 'border border-gray-400 rounded-md lg:w-[450px] w-auto h-64 text-center p-5 space-y-3 hover:border-[#e52320]';
    const h1Style = 'cursor-pointer text-2xl font-semibold hover:text-[#e52320]';
    const logoStyle = 'text-7xl border rounded-full p-1 hover:bg-[#e52320] hover:text-white hover:border-[#e52320]';
    const btnStyle = 'h-10 w-40 bg-[#e52320] text-white p-2'


    return (
        <div className='container mx-auto mt-48 lg:mt-0'>
            <div className='flex flex-col space-y-5 md:space-y-0 md:flex-row lg:justify-center lg:space-x-10'>
                <div className={bothDivsStyle}>
                    <DirectionsCar className={logoStyle} />
                    <h1 className={h1Style}>Do you want to sell</h1>
                    <h1 className='text-md'>Get a free quote for your vehicle</h1>
                    <button className={btnStyle}>Click here</button>
                </div>
                <div className={bothDivsStyle}>
                    <Handyman className={logoStyle} />
                    <h1 className={h1Style}>Request a repair quote</h1>
                    <h1 className='text-md'>Get a location-based cost estimate to repair your car</h1>
                    <button className={btnStyle}>Click here</button>
                </div>
            </div>
        </div>
    )
}
