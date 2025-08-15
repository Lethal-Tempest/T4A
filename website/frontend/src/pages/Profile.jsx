import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
    const { userDetails, token, backendUrl, setUserDetails } = useContext(ShopContext);
    const [passChange, setPassChange] = useState(false);
    const [updatedDetails, setUpdatedDetails] = useState({
        name: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState('');

    // Set preview and form values from userDetails
    useEffect(() => {
        if (userDetails) {
            setPreview(userDetails.dp);
            setUpdatedDetails((prev) => ({
                ...prev,
                name: userDetails.name,
                email: userDetails.email
            }));
        }
    }, [userDetails]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (updatedDetails.newPassword && updatedDetails.newPassword !== updatedDetails.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        if (updatedDetails.newPassword && updatedDetails.newPassword.length < 8) {
            return toast.error('Password must be at least 8 characters long');
        }

        try {
            const formData = new FormData();
            formData.append('name', updatedDetails.name);
            formData.append('email', updatedDetails.email);
            if (updatedDetails.oldPassword) formData.append('oldPassword', updatedDetails.oldPassword);
            if (updatedDetails.newPassword) formData.append('newPassword', updatedDetails.newPassword);
            if (selectedImage) formData.append('userimg', selectedImage);

            const response = await axios.post(`${backendUrl}/api/user/updateuser`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setUserDetails(response.data.updatedUser);
                setPreview(response.data.updatedUser.dp); // Update preview image
                setPassChange(false); // Hide form again
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        }
    };

    return (
        <div className='flex flex-col items-center pt-15'>
            <div className='relative w-48 h-48'>
                <img className='w-full h-full rounded-full object-cover' src={preview} alt='profile' />
                
                {passChange && (
                    <>
                        <label htmlFor="file-upload" className='absolute bottom-0 right-0 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white text-xs'>
                            +
                        </label>
                        <input
                            id="file-upload"
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                            className='hidden'
                        />
                    </>
                )}
            </div>

            <div className='pt-10 flex flex-col items-start gap-2 text-xl'>
                <div className='flex gap-2'>
                    <h4 className='font-semibold text-gray-700'>Name:</h4>
                    <p className='text-gray-600'>{userDetails.name}</p>
                </div>
                <div className='flex gap-2'>
                    <h4 className='font-semibold text-gray-700'>Email:</h4>
                    <p className='text-gray-600'>{userDetails.email}</p>
                </div>

                <h4 onClick={() => setPassChange(!passChange)} className='text-sm text-blue-600 hover:cursor-pointer pt-4'>
                    Change Profile?
                </h4>

                {passChange && (
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 pb-4'>
                        <input type='text' onChange={(e) => setUpdatedDetails({ ...updatedDetails, name: e.target.value })} value={updatedDetails.name} placeholder='Name' className='border p-2 text-sm w-60 text-gray-700' />
                        <input type='email' onChange={(e) => setUpdatedDetails({ ...updatedDetails, email: e.target.value })} value={updatedDetails.email} placeholder='Email' className='border p-2 text-sm w-60 text-gray-700' />
                        <input type='password' onChange={(e) => setUpdatedDetails({ ...updatedDetails, oldPassword: e.target.value })} value={updatedDetails.oldPassword} placeholder='Old Password' className='border p-2 text-sm w-60 text-gray-700' />
                        <input type='password' onChange={(e) => setUpdatedDetails({ ...updatedDetails, newPassword: e.target.value })} value={updatedDetails.newPassword} placeholder='New Password' className='border p-2 text-sm w-60 text-gray-700' />
                        <input type='password' onChange={(e) => setUpdatedDetails({ ...updatedDetails, confirmPassword: e.target.value })} value={updatedDetails.confirmPassword} placeholder='Confirm Password' className='border p-2 text-sm w-60 text-gray-700' />
                        <button type='submit' className='bg-black text-white text-xs sm:text-sm px-5 py-2 hover:cursor-pointer'>UPDATE</button>
                    </form>
                )}

                <h4 className='text-sm text-red-600 hover:cursor-pointer'>Delete Account?</h4>
            </div>
        </div>
    );
};

export default Profile;
