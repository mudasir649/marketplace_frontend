import React from 'react'
import Header from './Header'
import Banner from './Banner'
import Footer from './Footer'

export default function Home({ children }: any) {
  return (
    <div className='bg-gray-200'>
      <Header />
      <Banner />
      {children}
      <Footer />
    </div>
  )
}
