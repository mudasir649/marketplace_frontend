import Home from '@/components/Home'
import { aboutUs, buyers, description, sellers } from '@/utils/about'
import React from 'react'

export default function Page() {
    return (
        <div>
            <Home>
                <div className='container mx-auto mb-10 mt-10'>
                    <div className='border-none rounded-sm bg-white p-8'>
                        <h1 className='text-[50px] text-gray-800 mb-6 font-semibold'>{aboutUs.title}</h1>
                        <p className='text-gray-600 mb-10'>{aboutUs.description}</p>
                        <h1 className='text-xl text-gray-800 mb-6 font-semibold'>{buyers.title}</h1>
                        <ol className='mb-10' style={{ listStyleType: "disc" }}>
                            {buyers.description.map((desc: any, i: number) => (
                                <li className='ml-5' key={i}>{desc}</li>
                            ))}
                        </ol>
                        <h1 className='text-xl text-gray-800 mb-6 font-semibold'>{sellers.title}</h1>
                        <ol style={{ listStyleType: "disc" }}>
                            {sellers.description.map((desc: any, i: number) => (
                                <li className='ml-5' key={i}>{desc}</li>
                            ))}
                        </ol>
                        {description.map((desc: any, i: number) => (
                            <p className='mb-1 mt-10' key={i}>{desc}</p>
                        ))}
                    </div>
                </div>
            </Home>
        </div>
    )
}
