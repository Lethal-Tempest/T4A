import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const {products, search, showSearch}=useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(category.filter((item)=>item!==e.target.value));
    }else{
      setCategory([...category,e.target.value]);
    }
  }
  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(subCategory.filter((item)=>item!==e.target.value));
    }else{
      setSubCategory([...subCategory,e.target.value]);
    }
  }
  const applyFilter=()=>{
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy=productsCopy.filter((product)=>product.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length>0){
      productsCopy = productsCopy.filter((product)=>category.includes(product.category));
    }
    if(subCategory.length>0){
      productsCopy = productsCopy.filter((product)=>subCategory.includes(product.subCategory));
    }
    setFilterProducts(productsCopy);
  }
  const sortProduct=()=>{
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>a.price-b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>b.price-a.price));
        break;
      default:
        applyFilter();
        break;
    }
  }
  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search, showSearch, products])
  useEffect(()=>{
    sortProduct();
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 '>
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center gap-2 cursor-pointer'>FILTERS
        <img src={assets.dropdown_icon} className={`h-3 ${showFilter?'rotate-90':''}`} alt='dropdown' />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?'':'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onClick={toggleCategory} />
              <span>Men</span>
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onClick={toggleCategory} />
              <span>Women</span>
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onClick={toggleCategory} />
              <span>Kids</span>
            </p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter?'':'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onClick={toggleSubCategory}/>
              <span>Topwear</span>
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onClick={toggleSubCategory}/>
              <span>Bottomwear</span>
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onClick={toggleSubCategory}/>
              <span>Winterwear</span>
            </p>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1='ALL ' text2='COLLECTIONS' />
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relevance</option>
            <option value="low-high">Sort by Price: Low to High</option>
            <option value="high-low">Sort by Price: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 gap-y-6'>
          {
            filterProducts.map((product, index)=>{
              return(
                <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Collection