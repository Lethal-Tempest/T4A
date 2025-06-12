import React from 'react'
import {assets} from '../assets/admin_assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img src={assets.logo} alt='logo' className='w-[max(10%,80px)]'/>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white text-xs sm:text-sm px-5 rounded-full py-2'>Logout</button>
    </div>
  )
}

export default Navbar