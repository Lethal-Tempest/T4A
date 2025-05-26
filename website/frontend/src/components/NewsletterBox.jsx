import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis neque esse ipsa explicabo eius facilis hic, porro animi dolorem ipsam inventore quia, voluptatibus, expedita necessitatibus alias! Quibusdam quas provident veniam.</p>
        <form className='w-full sm:w-1/2 flex items-center mx-auto my-6 pl-3'>
            <input type='email' placeholder='Enter your email' className='w-full sm:flex-1 outline-none bg-gray-50 px-3 py-3' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox