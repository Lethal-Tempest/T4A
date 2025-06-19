import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import {backendUrl, currency} from '../src/App';
import { toast } from 'react-toastify';
import { assets } from '../assets/admin_assets/assets';

const Orders = ({token}) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async() =>{
    if(!token) return null;
    try {
      const response = await axios.post(backendUrl+'/api/order/list',{},{headers:{token}});
      if(response.data.success){
        setOrders(response.data.orders);
      }
      else{
        toast.error(response.data.message)
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const statusHandler = async(event, orderId)=>{
      try {
        const response = await axios.post(backendUrl + '/api/order/status', {orderId, status: event.target.value}, {headers:{token}});
        if(response.data.success){
          fetchAllOrders();
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  useEffect(()=>{
    fetchAllOrders();
  },[token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index)=>{
            console.log(order.items);
            return(
              <div>
                <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.55fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 sm:text-sm test-gray-700' key={index}>
                  <img className='w-12' src={assets.parcel_icon} alt="parcel_icon" />
                  <div>
                    {order.items.map((item, idx) => (
                      <p className='py-0.5' key={idx}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                        {idx !== order.items.length - 1 ? ',' : ''}
                      </p>
                    ))}
                    <p className='mt-3 mb-2 font-medium'>{order.address.firstName+' '+order.address.lastName}</p>
                    <div>
                      <p>{order.address.street}</p>
                      <p>{order.address.city + ', '+ order.address.state+'-'+order.address.zipcode+', '+order.address.country}</p>
                    </div>
                    <p>{order.address.phone}</p>
                  </div>
                  <div>
                    <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                    <p className='mt-3'>Method: {order.paymentMethod}</p>
                    <p>Payment: {order.payment}</p>
                    <p>Date: {new Date(order.date).toDateString()}</p>
                  </div>
                  <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
                  <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold'>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders