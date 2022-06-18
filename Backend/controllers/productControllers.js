 import asyncHandler from 'express-async-handler';
 import Product from '../models/productModels.js'
 
 export const getProducts=async(req, res) =>{
    try{
        const products = await Product.find()
        console.log(products)
        res.json(products)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
export const getProduct= asyncHandler(async(req,res)=>{
    try{
    const product =await Product.findById(req.params.id)
   if(product){
    res.json(product)
   }else{
       res.status(404)
       throw new Error('Product not found')

   }
}catch(err){
    res.status(500).json({message: err})
}
})
