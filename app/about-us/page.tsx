import Home from '@/components/Home'
import { aboutUs, buyers, description, sellers } from '@/utils/about'
import dynamic from 'next/dynamic'
import React from 'react'

function Page() {
    return (
        <div>
            <Home>
                <div className='container mx-auto mb-10 mt-10'>
                    <div className='border-none rounded-sm bg-white p-8'>
                        <h1 className='text-[50px] text-gray-800 mb-6 font-semibold'>
                            About Us
                        </h1>
                        <p className='mb-10'>
                            Eidcarosse is a comprehensive online marketplace dedicated to facilitating the buying and selling of vehicles. With a user-friendly interface and powerful search features, Eidcarosse connects individuals looking for vehicles with sellers offering an extensive range of options. Whether you’re in the market for a stylish sedan, a powerful truck, a sleek bike, or any other vehicle, Eidcarosse provides a platform that simplifies the entire process.
                        </p>
                        <h1 className='text-xl text-gray-800 mb-6 font-semibold'>
                            Buyers
                        </h1>
                        <ol className='mb-10' style={{ listStyleType: "disc" }}>
                            <li className='ml-5'>
                                For buyers, Eidcarosse offers a vast selection of vehicles from private sellers and dealerships, ensuring you have access to a wide range of options to suit your preferences and budget.
                            </li>
                            <li className='ml-5'>
                                With detailed listings and comprehensive vehicle information, including specifications, mileage, and pricing, you can make informed decisions and find the perfect vehicle that meets your needs.
                            </li>
                        </ol>
                        <h1 className='text-xl text-gray-800 mb-6 font-semibold'>Sellers</h1>
                        <ol style={{ listStyleType: "disc" }}>
                            <li className='ml-5'>
                                For sellers, Eidcarosse offers a convenient platform to showcase your vehicles to a large and diverse audience of potential buyers.
                            </li>
                            <li className='ml-5'>
                                List your vehicle with detailed descriptions, high-quality images, and competitive pricing, and connect directly with interested buyers.
                            </li>
                            <li className='ml-5'>
                                Eidcarosse empowers sellers to reach a wider market and streamline the selling process, making it easier to find the right buyer for your vehicle.
                            </li>
                        </ol>
                        <p className='mb-1 mt-10'>
                            Eidcarosse prioritizes user experience and ensures a secure and transparent transaction process. The platform provides messaging capabilities, allowing buyers and sellers to communicate directly and negotiate terms. Additionally, Eidcarosse offers a range of verification and safety features to provide peace of mind to all users.
                        </p>
                        <p className='mb-1 mt-10'>
                            Join Eidcarosse today and discover a vibrant marketplace where buying and selling vehicles is made simple. Experience the convenience, transparency, and efficiency of Eidcarosse as you embark on your vehicle buying or selling journey. Whether you’re a buyer searching for your dream vehicle or a seller looking to find the right buyer, Eidcarosse is your go-to destination for a seamless and rewarding experience.
                        </p>
                    </div>
                </div>
            </Home>
        </div>
    )
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });