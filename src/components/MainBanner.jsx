import React from 'react'
import { assets } from '../assets/assets'
import { Link } from "react-router-dom"

const MainBanner = () => {
  return (
    <div className='relative'>

      {/* Desktop Banner */}
      <img 
        src={assets.main_banner_bg} 
        alt="Banner" 
        className='w-full hidden md:block'
      />

      {/* Mobile Banner */}
      <img 
        src={assets.main_banner_bg_sm} 
        alt="Banner" 
        className='w-full md:hidden'
      />

      {/* Banner Content */}
      <div className='absolute inset-0 flex flex-col items-center justify-end px-4 md:px-12 md:items-start md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-18'>

        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-tight'>
          Fresh you can trust and saving you will love !!!
        </h1>

        <div className='flex items-center gap-4 mt-6 font-medium'>

          {/* Shop Now Button */}
          <Link  
            to={"/products"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
          >
            Shop Now 
            <img
              className='md:hidden transition group-hover:translate-x-1'
              src={assets.white_arrow_icon} 
              alt="arrow" 
            />
          </Link>

          {/* Explore Deals Button */}
          <Link  
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
          >
            Explore Deals
            <img
              className='transition group-hover:translate-x-1'
              src={assets.black_arrow_icon} 
              alt="arrow" 
            />
          </Link>

        </div>

      </div>

    </div>
  )
}

export default MainBanner