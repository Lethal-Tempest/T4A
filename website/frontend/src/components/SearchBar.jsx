import { useContext, useEffect, useState } from "react";
import React from 'react'
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const handleChange=(e)=>{
        setSearch(e.target.value);
    }
    useEffect(()=>{
        if(location.pathname.includes('collection')){
          setVisible(true);
        }
        else{
            setVisible(false);
        }
    },[location])
  return showSearch && visible ? (
    <div className="border-t border-b border-gray-200 bg-gray-50 text-center">
        <div className="inline-flex items-center justify-between border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input onChange={handleChange} type="text" placeholder="Search" value={search} className="flex bg-inherit text-sm outline-none w-full" />
            <img src={assets.search_icon} alt="search" className="w-5 cursor-pointer" />
        </div>
        <img className="inline w-3 cursor-pointer" src={assets.cross_icon} alt="cross" onClick={() => setShowSearch(false)} />
    </div>
  ) : null;
}

export default SearchBar