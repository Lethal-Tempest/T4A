import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../src/App';
import { toast } from 'react-toastify';
import { currency } from '../src/App';

const List = ({token}) => {
  console.log(token);
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl+"/api/product/list");
      if(response.data.success){
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + "/api/product/remove", {
        headers: { token },
        data: { id },
      });
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }
      else{
        toast.error(response.data.message)
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div>
      <p>All Product List</p>
      <div>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {
          list.map((product,i)=>
            <div key={i} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center mt-2 py-1 px-2 border border-gray-300 text-sm'>
              <img src={product.image[0]} className='w-12 h-12 object-cover' />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>{currency}{product.price}</p>
              <p onClick={()=>removeProduct(product._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          )
        }
      </div>
    </div> 
  )
}

export default List