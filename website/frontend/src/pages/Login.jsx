import React, { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userImg, setUserImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Login') {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
      else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (userImg) formData.append('userimg', userImg);

        const response = await axios.post(backendUrl + '/api/user/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          console.log(response.data);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (token?.length > 0) {
      navigate('/');
    }
  }, [token]);
  useEffect(() => {
    let previewUrl;
    if (userImg instanceof File) {
      previewUrl = URL.createObjectURL(userImg);
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [userImg]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState !== 'Login' && (
        <>
          <img
            src={
              userImg instanceof File
                ? URL.createObjectURL(userImg)
                : userImg
            }
            alt="Profile"
            className="rounded-full w-60 h-60 object-cover"
          />
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setUserImg(e.target.files[0])}
            className='w-full px-3 py-2 border border-gray-800'
          />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            required
          />
        </>
      )}

      <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm'>
        <p className='cursor-pointer'>Forgot Your password?</p>
        {
          currentState === 'Login' ?
            <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p> :
            <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login' ? 'Sign in' : 'Sign Up'}</button>
    </form>
  )
}

export default Login