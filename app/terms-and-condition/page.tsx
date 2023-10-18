import Home from '@/components/Home'
import TermConditions from '@/utils/termscondition'
import dynamic from 'next/dynamic'
import React from 'react'

function Page() {
    return (
        <div>
            <Home>
                <div className='container mx-auto mt-10'>
                    <div className='border-none rounded-sm bg-white mb-10 h-full p-8'>
                        <div className=''>
                            <h1 className='text-[50px] text-gray-800 mb-6 font-semibold ml-[-1px]'>Terms and Conditions</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Before using the Eidcarosse mobile app service, it is essential that you carefully review and agree to the following Terms and Conditions. Your acceptance of these terms is required for utilizing the app. Make sure to go through the Terms & Conditions thoroughly prior to using the service.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>General</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse holds advertisers and users accountable for ensuring that all content, including images, videos, graphics, and text, uploaded to the platform complies with applicable laws. Any inaccuracies or legal issues arising from the posted content are not the responsibility of Eidcarosse. Both advertisers and users guarantee that their content does not infringe upon copyrights, intellectual property rights, or any other rights of any individual or entity. By using the service, the user or advertiser agrees to release Eidcarosse from any obligations, claims, or liabilities associated with the use or inability to use the platform. Additionally, advertisers consent to their content being displayed on partner sites of Eidcarosse, subject to the same terms and conditions as on Eidcarosse itself.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Copyright</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Advertisers grant Eidcarosse a perpetual, irrevocable, royalty-free, non-exclusive license and the right to use, modify, reproduce, publish, adapt, translate, create derivative works from, distribute, or incorporate the provided content into any form, technology, or medium, whether presently known or developed in the future.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Watermarks</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse applies watermarks to all images to prevent their unauthorized reuse for other purposes without the advertiser’s explicit permission.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Safety and Images</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse reserves the right to modify the titles of any content on the app for editorial purposes.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Personal</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse reserves the right to cooperate with authorities in case any content on the app violates the law. The identity of users, buyers, or advertisers may be determined, for example, by an ISP. IP addresses may also be registered to ensure compliance with the terms and conditions.</p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Cookies</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Cookies are small files with little data that are often used for unique anonymous identification. The website you visit sends them to your browser and stores them on your device’s internal memory. Although our app or service may not use cookies explicitly, it may utilize third-party coding that uses them to collect information and improve their services. You will know when cookies are being sent to your device and have the option to accept or refuse cookies. However, rejecting cookies may deter you from accessing some services.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Privacy</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse will collect information from users, buyers, and advertisers. By using Eidcarosse, each user and advertiser consents to and authorizes the collection and use of this information. Eidcarosse also reserves the right to disclose the information to Company Affiliates and any other person for supporting, administering, and maintaining Eidcarosse, including marketing, research, planning, and product development.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Cookies</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                This app may use cookies, which require cookie-enabled devices. A cookie file contains information, such as a random user ID that the site automatically assigns to a visitor to track the pages they visit. Cookies cannot read data off your hard disk or identify the user.</p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Email Address of Users</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Users are required to submit valid email addresses before they are allowed to post advertisement listings. The email addresses will not be displayed publicly. However, users are allowed to send emails to other users through Eidcarosse.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Site Availability</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse does not guarantee uninterrupted or secure access to the app. The app is provided on an ‘as is’ and ‘as and when available’ basis.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Disclaimer</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse assumes no responsibility whatsoever for the use of Eidcarosse and disclaims all responsibility for any claim, injury, damage, or liability of any kind resulting from, arising out of, or in any way related to (a) any errors on Eidcarosse or the Content, including but not limited to typographical errors and technical errors, (b) any third-party websites or content directly or indirectly accessed or retrieved through links in Eidcarosse, (c) the unavailability of Eidcarosse, (d) your use of Eidcarosse or the Content, or (e) your use of any equipment (or software) in connection with Eidcarosse.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Indemnification</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Advertisers and other users agree to indemnify Eidcarosse and its employees, agents, officers, directors, from and against all expenses, losses, damages, and costs, including attorney’s fees, arising from any violation of these Terms and Conditions (including negligent or wrongful conduct).
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Modifications</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse reserves the right to alter or modify these Terms and Conditions. Such alterations or modifications shall be effective immediately upon posting on Eidcarosse. You are responsible for regularly reviewing for such modifications. Your continued access or use of Eidcarosse shall be deemed to be your acceptance of the modified terms and conditions.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Governing Law</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse is operated under the laws and regulations of the respective country.
                            </p>
                        </div>
                        {/* {TermConditions?.map((data: any, i: number) => (
                            <div className='' key={i}>
                                {data.title !== 'Terms and Conditions' ?
                                    <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{data.title}</h1>
                                    : <h1 className='text-[50px] text-gray-800 mb-6 font-semibold ml-[-10px]'>{data.title}</h1>}
                                {data.title !== "Contact Us" ? <p className='text-md text-gray-500 mb-10'>{data.description}</p>
                                    :
                                    <p className='text-md text-gray-500 '>{data.description} link</p>}
                            </div>
                        ))} */}
                    </div>
                </div>
            </Home>
        </div>
    )
}


export default dynamic(() => Promise.resolve(Page), { ssr: false });