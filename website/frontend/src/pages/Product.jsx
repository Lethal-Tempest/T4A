import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const {productId}=useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(false); 
  const [size, setSize] = useState('');
  const fetchProductData= async ()=>{
    products.map((product)=>{
      if(product._id===productId){
        setProductData(product);
        console.log(product);
        setImage(product.image[0]);
        return null;
      }
    })
  }
  useEffect(()=>{
    fetchProductData();
  },[productId, products])
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-2 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[25%] md:w-[20%] lg:[15%] w-full'>
            {productData.image.map((image, index)=>(
              <img key={index} onClick={()=>setImage(image)} src={image} alt='product' className='w-[35%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            ))}
          </div>
          <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[60%]'>
            <img className='w-full h-auto' src={image} alt='product'/>
          </div>
        </div>
        <div>
          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
          </h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='star' className='w-3.5' />
            <img src={assets.star_icon} alt='star' className='w-3.5' />
            <img src={assets.star_icon} alt='star' className='w-3.5' />
            <img src={assets.star_icon} alt='star' className='w-3.5' />
            <img src={assets.star_dull_icon} alt='star' className='w-3.5' />
            <p className='pl-2 text-gray-700'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div>
              {productData.sizes.map((itemSize, index)=>(
                <button onClick={()=>setSize(itemSize)} key={index} className={`mx-1 px-4 py-2 rounded-xl cursor-pointer ${itemSize===size ? 'border border-orange-500' : ''}`} >{itemSize}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white p-3 px-8 text-sm uppercase hover:opacity-95 active:bg-gray-900 cursor-pointer'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 text-gray-300' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col'>
              <p>100% Original Product</p>
              <p>Cash on delivery is aailable on this product</p>
              <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-gray-300 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-300 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500'>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, veritatis ipsam tenetur perspiciatis placeat fugit repellat officia est nemo atque similique laudantium! Animi ducimus nisi recusandae minima esse omnis pariatur.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ducimus sequi tenetur atque veniam ullam fugit esse dolorum, laborum nobis soluta totam error at quisquam praesentium, saepe culpa, veritatis earum!
            Tenetur vero culpa molestiae ducimus voluptate veniam maiores excepturi ex beatae quasi ea sapiente autem atque vel velit explicabo aut in perferendis, ab at optio aperiam. Sit quis corrupti totam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad magnam reprehenderit ab, ratione magni consequuntur similique consectetur, quos vitae temporibus rerum! Ipsum vel impedit atque neque reiciendis dolor libero cupiditate.
            Praesentium, modi. Sint officiis numquam inventore cum, accusantium obcaecati explicabo labore! Voluptatibus debitis molestias error tempora veniam nihil, temporibus laborum ipsa consequatur perspiciatis autem eum voluptatum magnam animi repellat eaque?</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} productId={productData._id} /> 
    </div>
  ) : (
    <div className='opacity-0'></div>
  )
}

export default Product