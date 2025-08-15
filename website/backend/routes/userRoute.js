import express from 'express';
import { registerUser, loginUser, adminLogin, getUserDetails, updateUserDetails } from '../controllers/userController.js';
import upload from '../middleware/multer.js';

const userRouter=express.Router();

userRouter.post('/register', upload.fields([{name:'userimg', maxCount:1}]), registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/adminlogin', adminLogin);
userRouter.post('/getuser', getUserDetails);
userRouter.post('/updateuser', upload.fields([{name:'userimg', maxCount:1}]), updateUserDetails);

export default userRouter