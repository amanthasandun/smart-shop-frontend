import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const currency = import.meta.VITE_CURRENCY;
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery , setSearchQuery] = useState({})

    const fetchProducts = async () => {
        setProducts(dummyProducts)
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

    // fetch all products 
    useEffect(() => {
        fetchProducts()
    }, [])


    const value = { setSearchQuery , searchQuery , navigate , user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}