import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import {jwtDecode} from "jwt-decode";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({
                success: false,
                message: "User does not exist"
            })
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = createToken(user._id);
            res.json({
                success: true,
                message: "User logged in successfully",
                token
            })
        }
        else {
            res.json({
                success: false,
                message: "Invalid credentials"
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

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userimg = req.files?.userimg?.[0];

        if (!userimg) {
            return res.json({
                success: false,
                message: "User image is required"
            });
        }

        const uploadResult = await cloudinary.uploader.upload(userimg.path, { resource_type: "image" });
        const userImageUrl = uploadResult.secure_url;
        console.log(userImageUrl);

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Invalid email"
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            dp: userImageUrl
        });

        const newUser = await user.save();
        const token = createToken(newUser._id);

        res.json({
            success: true,
            message: "User registered successfully",
            token
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({
                success: true,
                message: "Admin logged in successfully",
                token
            })
        } else {
            res.json({
                success: false,
                message: "Invalid credentials"
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

const getUserDetails = async (req, res) => {
    try {
        const token = req.headers.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }
        const userId = jwtDecode(token).id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }
        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const token = req.headers.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }

        const userId = jwtDecode(token).id;
        const { name, email, oldPassword, newPassword } = req.body;
        const {selectedImage} = req.data.selectedImage;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // If oldPassword and newPassword are provided, verify and update password
        if (oldPassword && newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Old password is incorrect" });
            }

            if (oldPassword === newPassword) {
                return res.status(400).json({ success: false, message: "New password must be different from the old one" });
            }

            user.password = await bcrypt.hash(newPassword, 10); // 🔒 Secure password update
        }

        // Update other fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (selectedImage) user.dp = cloudinary.url(selectedImage.path, { resource_type: "image" });

        const updatedUser = await user.save(); // Save all changes

        res.json({
            success: true,
            message: "User details updated successfully",
            updatedUser
        });

    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export { loginUser, registerUser, adminLogin, getUserDetails, updateUserDetails };