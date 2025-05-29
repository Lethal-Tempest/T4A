import {v2 as cloudinary} from 'cloudinary';
import ProductModel from '../models/productModel.js';

const addProduct=async(req, res)=>{
    try {
        const {name, description, price, category, subCategory, sizes, bestSeller} = req.body;
        const image1= req.files.image1 && req.files.image1[0];
        const image2= req.files.image2 && req.files.image2[0];
        const image3= req.files.image3 && req.files.image3[0];
        const image4= req.files.image4 && req.files.image4[0];
        const images=[image1, image2, image3, image4].filter((item)=>item!==undefined);
        let imagesUrl=await Promise.all(
            images.map(async(image)=>{
                let result=await cloudinary.uploader.upload(image.path, {resource_type: "image"});
                return result.secure_url;
            })
        )
        const productData= {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller==='True'?true:false,
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData)
        const product=new ProductModel(productData);
        await product.save();
        res.json({
            success: true,
            message: "Product added successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const listProducts=async(req, res)=>{
    try {
        const products=await ProductModel.find({});
        res.json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const removeProduct=async(req, res)=>{
    try {
        await ProductModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Product removed successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const singleProduct=async(req, res)=>{
    try {
        const {productId} = req.body;
        const product=await ProductModel.findById(productId);
        res.json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export {addProduct, listProducts, removeProduct, singleProduct}