import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY;
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery , setSearchQuery] = useState({})


    // Fetch the seller status
    const fetchSeller = async ()=>{
        try {
            const {data} = await axios.get("/api/seller/is-auth")
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false)
            }
        } catch (error) {
            console.log(error.message);
            setIsSeller(false)
        }
    }

    // Fetch all productstt
    const fetchProducts = async () => {
        try {
            const {data} = await axios.get("/api/product/list")
            if(data.success){
                setProducts(data.products)
            }else{
                toast(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        setCartItems(cartData)
        toast.success("Add to cart")
    }

    //Update cart Quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    // remove product from the cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }
        setCartItems(cartData)
        toast.success("removed from the cart")
    }

    // get cart count 
    const getCartCount = ()=>{
        let totalCount = 0
        for(const item in cartItems){
            totalCount += cartItems[item]
        }
        return totalCount;
    }

    // Get cart total amount
    const getCartAmount =()=>{
        let totalAmount = 0 ;
        for(const items in cartItems){
            let itemsInfo = products.find((product)=>product._id === items)
            if(cartItems[items] > 0){
                totalAmount += itemsInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100)/100
    }

    // fetch all products 
    useEffect(() => {
        fetchProducts()
        fetchSeller()
    }, [])


    const value = { fetchProducts,setSearchQuery , searchQuery , navigate , user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems , getCartAmount , getCartCount , axios}

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}