import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur, fuga voluptatum minus aliquam facilis eveniet illum veniam hic nulla dicta fugit</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iusto cupiditate incidunt nihil voluptatem voluptate quidem provident fugit sequi rerum doloribus</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, laborum alias rem tempora sapiente exercitationem numquam repellendus beatae ab perspiciatis repudiandae fuga vero omnis?</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim earum, natus reprehenderit corrupti ratione quas architecto in aliquam cum voluptatum ea dolorum illum voluptate dolor accusantium quisquam quaerat tenetur perferendis!</p>
        </div>
        <div className='border border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinience:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim earum, natus reprehenderit corrupti ratione quas architecto in aliquam cum voluptatum ea dolorum illum voluptate dolor accusantium quisquam quaerat tenetur perferendis!</p>
        </div>
        <div className='border border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim earum, natus reprehenderit corrupti ratione quas architecto in aliquam cum voluptatum ea dolorum illum voluptate dolor accusantium quisquam quaerat tenetur perferendis!</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About