import express from "express";
const router =express.Router();
import Product from "../models/productModels.js"
import asyncHandler from "express-async-handler"


router.get('/api/products',async(req,res)=>{
    const products = await Product.find()
    console.log(products)
    res.json(products)
})

router.get('/api/products/:id',asyncHandler(async(req,res)=>{
        const product =await Product.findById(req.params.id)
       if(product){
        res.json(product)
       }else{
           res.status(404)
           throw new Error('Product not found')
    
       }
})
)
export default router