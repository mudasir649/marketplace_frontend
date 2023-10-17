import Home from '@/components/Home'
import TermConditions from '@/utils/termscondition'
import React from 'react'

export default function Page() {
    return (
        <div>
            <Home>
                <div className='container mx-auto mt-10'>
                    <div className='border-none rounded-sm bg-white mb-10 h-full p-8'>
                        {TermConditions?.map((data: any, i: number) => (
                            <div className='' key={i}>
                                {data.title !== 'Terms and Conditions' ?
                                    <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{data.title}</h1>
                                    : <h1 className='text-[50px] text-gray-800 mb-6 font-semibold ml-[-10px]'>{data.title}</h1>}
                                {data.title !== "Contact Us" ? <p className='text-md text-gray-500 mb-10'>{data.description}</p>
                                    :
                                    <p className='text-md text-gray-500 '>{data.description} link</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </Home>
        </div>
    )
}
