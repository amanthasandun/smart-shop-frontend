import React from 'react'
import {useAppContext} from "../context/useAppContext"
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCart from '../components/ProductCart'

const ProductCatergory = () => {
    const {products} = useAppContext()
    const {category}= useParams()

    const searchCatergory = categories.find((item)=>{return item.path.toLowerCase()===category})

    const filteredCategory = products.filter((product)=>product.category.toLowerCase()===category)
    
  return (
    <div className='mt-16'>
      {searchCatergory && (
        <div className='flex flex-col items-end w-max'>
            <p>{searchCatergory.text.toUpperCase()}</p>
            <div className='w-16 h-0.5 bg-primary rounded-full '></div>
        </div>
      )}

      {filteredCategory.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-6'>
            {
                filteredCategory.map((product)=>(
                    <ProductCart key={product._id} product={product}/>
                ))
            }
        </div>
      ):(
        <div className='flex items-center justify-center h-[60vh]'>
            <p className='text-2xl font-medium text-primary'>No product found in this category</p>
        </div>
      )}
    </div>
  )
}

export default ProductCatergory
