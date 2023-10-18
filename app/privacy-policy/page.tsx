import Home from '@/components/Home'
import privacyPolicy from '@/utils/privacypolicy'
import React from 'react'

export default function Page() {
    return (
        <div>
            <Home>
                <div className='container mx-auto mt-10'>
                    <div className='border-none rounded-sm bg-white mb-10 h-full p-8'>
                        <div className=''>
                            <h1 className='text-[50px] text-gray-800 mb-6 font-semibold ml-[-1px]'>Privacy Policy</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Eidcarosse mobile application creators – prioritize and value the security and privacy of the information you share with us through our Eidcarosse. We intend to make our users as comfortable using our app as possible. If you are to trust us with your information, you must understand how we collect, use, and maintain it. When you are about to acquire Eidcarosse, you’ll need to register with us. The registration gives us your First and Last Name, Email Address and Phone Number.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Information Collection and Use</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                We may require you to provide us with certain personal information for a better experience. This information includes but is not limited to, name, addressWhen you register and provide your name, phone number, email address, account username, and password, we will not retain your address information.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Personal Information</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                When you register and provide your name, phone number, email address, account username, and password, we will not retain your address information.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>For How Long is Personal Information Retained?</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                When you register with us, your personal information and email are retained for the sake of future support. This information remains stored with us until you delete your personal information.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>What We Don’t Do with Your Personal Information</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                We don’t and will never disclose, share, or provide your private information with other companies to market their own services or products. It is also against our policy to share your personal information with unauthorized people.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Your Rights Over Your Data</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                As a registered user, it is within your rights to edit your personal information. You can also request that a file of your information be exported. Upon logging into our site, you can delete your data too.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Cookies</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                Cookies are small files with little data that are often used for unique anonymous identification. The website you visit sends them to your browser and stores them on your device’s internal memory. Although our app or service may not use cookies explicitly, it may utilize third-party coding that uses them to collect information and improve their services. You will know when cookies are being sent to your device and have the option to accept or refuse cookies. However, rejecting cookies may deter you from accessing some services.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Our Security Procedures Against Data Breaches</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                We value the trust you’ve placed in us by giving us your personal information. Therefore, we employ industry-standard security means and technologies to protect your personal information from unauthorized disclosure, access, or use. Please don’t disclose your registration password and username to unauthorized people to help us protect your privacy. Even though no internet transmission method or electronic storage procedure is 100% watertight. Eidcarosse leaves nothing to chance in efforts to protect your personal information. In case your information is accessed by unauthorized people or is lost, we’ll inform you as soon as we become aware of this.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>How to Access Your Data or Edit Your Personal Information</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                When you log in on our site with your details, all your account information will be available for you to edit or delete. If you want to stop email notifications for the Eidcarosse app, just unsubscribe or send us an email, and we’ll erase your email or account. Ensure that your email’s subject reads ‘delete my username’.
                            </p>
                            <h1 className='text-lg text-gray-800 mb-6 font-semibold'>Contact Us</h1>
                            <p className='text-md text-gray-500 mb-10'>
                                If you have any suggestions or questions about our privacy policy, please feel free to contact us via link
                            </p>
                        </div>

                        {/* {privacyPolicy?.map((data: any, i: number) => (
                            <div className='' key={i}>
                                {data.title !== 'Privacy Policy' ?
                                    <h1 className='text-lg text-gray-800 mb-6 font-semibold'>{data.title}</h1>
                                    : <h1 className='text-[50px] text-gray-800 mb-6 font-semibold ml-[-1px]'>{data.title}</h1>}
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
