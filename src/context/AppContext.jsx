import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "./context";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const getInitialCart = () => {
        try {
            const storedCart = localStorage.getItem("cartItems");
            return storedCart ? JSON.parse(storedCart) : {};
        } catch {
            return {};
        }
    };

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getInitialCart);
    const [searchQuery, setSearchQuery] = useState({});
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    // Fetch User auth status, user data and cart items
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems || {});
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsUserLoaded(true);
        }
    };

    // Fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            console.log(error.message);
            setIsSeller(false);
        }
    };

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart");
    };

    // Update cart quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    };

    // Remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
        toast.success("Removed from cart");
    };

    // Get cart count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    };

    // Get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemsInfo = products.find((product) => product._id === items);
            if (itemsInfo && cartItems[items] > 0) {
                totalAmount += itemsInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    // Fetch all data on mount
    useEffect(() => {
        fetchProducts();
        fetchSeller();
        fetchUser();
    }, []);

    // Persist cart locally to survive refresh for guest users.
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Update database cart items
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post("/api/cart/update", { cartItems });

                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        // Avoid sending an empty cart before auth/cart hydration is complete.
        if (isUserLoaded && user) {
            updateCart();
        }
    }, [cartItems, user, isUserLoaded]);

    const value = {
        fetchProducts,
        setSearchQuery,
        searchQuery,
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        getCartAmount,
        getCartCount,
        axios,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};