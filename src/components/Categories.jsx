import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'



const Categories = () => {
  const {navigate} = useAppContext()
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium '>
        Categories
      </p>
      
        <div  className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-7 gap-6'>
        {categories.map((category , index )=>(
        <div
          key={index}
          className='flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer'
          style={{backgroundColor:category.bgColor}}
          onClick={()=>{
            navigate(`/products/${category.path.toLowerCase()}`)
            scrollTo(0 , 0)
          }}
        >

          <img src={category.image} alt="Fruit category" className='w-12 h-12 mb-2' />
          <p className='text-sm font-medium text-gray-700 text-center'>{category.text}</p>
        
        </div>
        ))
      }
      
      </div>
      
    </div>
  )
}

export default Categories
