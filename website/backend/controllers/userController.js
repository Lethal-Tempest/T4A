import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            res.json({
                success: false,
                message: "User does not exist"
            })
        }
        const match = await bcrypt.compare(password, user.password);
        if(match){
            const token = createToken(user._id);
            res.json({
                success: true,
                message: "User logged in successfully",
                token
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const registerUser=async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        const exists = await userModel.findOne({email});
        if(exists){
            res.json({
                success: false,
                message: "User already exists"
            })
        }
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email"
            })
        }
        if (password.length<8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const newUser=await user.save();
        const token=createToken(newUser._id);
        res.json({
            success: true,
            message: "User registered successfully",
            token
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const adminLogin=async(req, res)=>{

}

export {loginUser, registerUser, adminLogin}