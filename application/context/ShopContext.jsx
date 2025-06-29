import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ShopContext = createContext();

const backendUrl = "http://192.168.0.206:4000"          //203 for ext            //111 for normal
const currency = "$"

export const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    useEffect(() => {
        fetchProducts();
    },[]);
    return (
        <ShopContext.Provider value={{ backendUrl, products, currency }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShopContext = () => useContext(ShopContext);