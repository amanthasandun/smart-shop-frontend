import React from 'react'
import Navbar from './components/navbar'
import { Route, Router, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import { useAppContext } from './context/AppContext.jsx'
import Login from './components/Login.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductCatergory from './pages/ProductCatergory.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'

const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin} = useAppContext()

  return (
    <div>
      {isSellerPath ?null : <Navbar/>}
      {showUserLogin ? <Login/> : null}
      <Toaster/>
      <div className={`$isSellerPath ? "" : 'px-6 md:px-16 lg:px-24 xl:px-32'`}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<AllProducts/>}/>
          <Route path="/products/:category" element={<ProductCatergory/>}/>
          <Route path="/products/:category/:id" element={<ProductDetail/>}/>
          <Route path="/Cart" element={<Cart/>}/>
          <Route path="/add-address" element={<AddAddress/>}/>
          <Route path="/my-orders" element={<MyOrders/>}/>

        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}
export default App