import { setShowRepairNow } from '@/store/appSlice';
import { Cancel } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function BuyNow() {

    const dispatch = useDispatch();

    const handleRepairNow = () => {
        dispatch(setShowRepairNow(false))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-opacity-100 backdrop-blur-sm z-10 overflow-y-scroll`}>
            <div className='container mx-10 w-[800px] h-auto mt-12 bg-white shadow-3xl border rounded-md'>
                <div className='flex justify-end'>
                    <button className='text-white text-xl lg:mr-[-30px]' onClick={() => handleRepairNow()}>
                        <Cancel className='text-[#e52320]' />
                    </button>
                </div>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Full Name</label>
                        <input type="text" id="fullname" name="fullname" className="w-full border py-2 px-3 focus:outline-none focus:border-red-600" placeholder="John Doe" required />
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" className="w-full border py-2 px-3 focus:outline-none focus:border-red-600" placeholder="555-555-5555" required />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-600">Email Address</label>
                            <input type="email" id="email" name="email" className="w-full border py-2 px-3 focus:outline-none focus:border-red-600" placeholder="johndoe@example.com" required />
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-600">Make</label>
                            <input type="text" id="make" name="make" className="w-full border py-2 px-3 focus:outline-none focus:border-red-600" placeholder="Make" required />
                        </div>
                        <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-600">Model</label>
                            <input type="text" id="model" name="model" className="w-full border py-2 px-3 focus:outline-none focus:border-red-600" placeholder="Model" required />
                        </div>
                        <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-600">Year</label>
                            <input type="text" id="year" name="year" className="w-full border py-2 px-3 focus:outline-none focus:border-red-600" placeholder="Year" required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Upload Image</label>
                        <input type="file" id="image" name="image" className="w-full border py-2 px-3 focus:outline-none focus:border-red-600" accept="image/*" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea id="description" name="description" className="w-full border py-2 px-3 focus:outline-none focus:border-red-600" placeholder="Enter a description..." required></textarea>
                    </div>
                    <div className="mt-4 mb-10">
                        <button type="submit" className="bg-[#FF0000] text-white px-4 py-2 hover:bg-red-800 focus:outline-none focus:bg-red-700" onClick={(e: any) => handleSubmit(e)}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
