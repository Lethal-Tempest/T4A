import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} alt='logo' className='mb-5 w-32' />
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorum assumenda cupiditate exercitationem minima numquam eveniet consectetur. Repellendus nemo quos unde nostrum obcaecati inventore ullam, illo assumenda! Tenetur, voluptates odio.</p>
            </div>
            <div>
                <p  className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1 234 567 890</li>
                    <li>contact@lv.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='text-center text-sm py-5'>Copyright &copy; 2023. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer