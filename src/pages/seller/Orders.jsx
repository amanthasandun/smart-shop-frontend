import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'

const Orders = () => {

    const {currency} = useAppContext()
    const [orders , setOrders] = useState([])

    const fetchOrders = async ()=>{
      setOrders(dummyOrders)
    }

    useEffect(()=>{
      fetchOrders();
    },[])


  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gray-50'>
        <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Orders List</h2>
        {orders.map((order, index) => (
            <div key={index} className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-5 text-gray-800 md:grid-cols-[minmax(220px,2fr)_1.5fr_auto_1.2fr] md:items-start">
                
                <div className="flex items-start gap-4">
                    <img className="h-12 w-12 shrink-0 object-cover" src={assets.box_icon} alt="boxIcon" />
                    <div className="space-y-1">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex flex-col">
                                <p className="font-medium leading-snug">
                                    {item.product.name} <span className="text-primary">x {item.quantity}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-sm text-gray-700">
                    <p className='text-black/80'>{order.address.firstName} {order.address.lastName}</p>
                    <p>{order.address.street}, {order.address.city}</p><p> {order.address.state},{order.address.zipcode}, {order.address.country}</p>
                    <p>{order.address.phone}</p>
                </div>

                <p className="text-lg font-semibold md:text-right">{currency}{order.amount}</p>

                <div className="flex flex-col gap-1 text-sm text-black/70 md:text-base md:items-end md:text-right">
                    <p>Method: {order.paymentType}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className={order.isPaid ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'}>
                      Payment: {order.isPaid ? 'Paid' : 'Pending'}
                    </p>
                </div>
            </div>
        ))}
    </div>
  </div>
  )
}

export default Orders
