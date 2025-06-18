import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { ShopContext } from '../context/ShopContext'

const Home = () => {
  const {navigate, token} = useContext(ShopContext);
  useEffect(()=>{
    if(token==''){
      navigate('/login')
    }
  })
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home