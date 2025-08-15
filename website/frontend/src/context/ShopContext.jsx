import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userDetails, setUserDetails] = useState({});

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select a size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size]++;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

    }

    const getCartCount = () => {
        let count = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                count += cartItems[item][size];
            }
        }
        return count;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if ({ token }) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let amount = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                amount += cartItems[item][size] * products.find((product) => product._id === item).price;
            }
        }
        return amount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getCartData = async (token) => {
        try {
            const response = await axios.get(backendUrl + '/api/cart/get', {
                headers: { token }
            });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserDetails = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/user/getuser',
                {},
                { headers: { token } }
            );
            if (response.data.success) {
                console.log(response.data); // ✅ should now work
                return response.data.user;
            }
            else{
                console.log(response.data)
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };



    useEffect(() => {
        const init = async () => {
            getProductsData();

            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                setToken(savedToken);
                await getCartData(savedToken);

                const user = await getUserDetails(savedToken);
                if (user) {
                    setUserDetails(user);
                    console.log(user); // ✅ Logs the correct user details
                }
            }
        };

        init();
    }, []);



    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken, setCartItems, userDetails
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;