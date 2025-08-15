import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider=(props)=>{

    const currency='$';
    const delivery_fee=10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const addToCart=async(itemId, size)=>{
        if(!size){
            toast.error('Select a size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]++;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);
    }

    const getCartCount=()=>{
        let count=0;
        for(const item in cartItems){
            for(const size in cartItems[item]){
                count+=cartItems[item][size];
            }
        }
        return count;
    }

    const updateQuantity = async(itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size]=quantity;
        setCartItems(cartData);
    }

    const getCartAmount=()=>{
        let amount=0;
        for(const item in cartItems){
            for(const size in cartItems[item]){
                amount+=cartItems[item][size]*products.find((product)=>product._id===item).price;
            }
        }
        return amount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl+"/api/product/list");
            if(response.data.success){
                setProducts(response.data.products);
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    const value={
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;