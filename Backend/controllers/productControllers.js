 import { response } from 'express';
import asyncHandler from 'express-async-handler';
 import Product from '../models/productModels.js'

 //@desc Fetch all products
 //@ route Get /api/products
 //@access public
 export const getProducts=async(req, res) =>{
    const pageSize =  10
    const pageNumber = Number(req.query.page)|| 1
    const keyword = req.query.keyword ?{
        name:{
            $regex:req.query.keyword,
            $options:'i'
    }
}:{}
    try{
        const totalCount = await Product.countDocuments({...keyword})

        const pages = totalCount/pageSize
        const products = await Product.find({...keyword}).limit(pageSize).skip((pageNumber-1)*pageSize)
        res.json({products,pageNumber,pages})

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//@desc Fetch single product
 //@ route Get /api/products/:id
 //@access public
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
//@desc delete a  products
//@ route delete /api/products/:id
//@access private/admin
//@desc 
export const deleteProduct= asyncHandler(async(req,res)=>{
    try{
    const product =await Product.findById(req.params.id)
   if(product){
    await product.remove()
    res.json({Message:"Product removed"})
   }else{
       res.status(404)
       throw new Error('Product not found')

   }
}catch(err){
    res.status(500).json({message: err})
}
})

//@desc createProduct a  products
//@ route post /api/products/
//@access private/admin
//@desc 
export const createProduct= asyncHandler(async(req,res)=>{
    const product = new Product({
        name: 'sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:"sample brand",
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:"sample description",
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


//@desc updateProduct a  products
//@ route put /api/products/:id
//@access private/admin
//@desc 
export const updateProduct= asyncHandler(async(req,res)=>{
    const id= req.params.id
    const {name,price,user,image,brand,category,countInStock,numReviews,description} = req.body
    const product =await Product.findById(id)
    if(product){
        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct=await product.save()
        console.log(updatedProduct,product)
        res.status(201).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error(`Product  not found`)
    }
   
})

//@desc create a review a  products
//@ route post /api/products/:id/reviews
//@access private
//@desc 
export const createReview = asyncHandler(async(req,res)=>{
    const id= req.params.id
    const {rating,comment} = req.body
    const product =await Product.findById(id)
    if(product){
        const alreadyReviewed = product.reviews.find(r=>r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error(`Product already reviewed`)
        }
        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        
product.reviews.push(review)
product.numreviews = product.reviews.length
product.rating= product.reviews.reduce((acc, item) => item.rating + acc,0)/product.reviews.length
        
       await product.save()
       res.status(200).json({message:'Review added'}) 
    }else{
        res.status(404)
        throw new Error(`Product  not found`)
    }
   
})


//@ get opRated  products
//@ route get /api/products/top
//@access public
//@desc 
export const getTopRated = asyncHandler(async(req,res)=>{
    
    const topProducts = await Product.find({}).sort({rating:-1}).limit(5)
     res.json(topProducts)
   
})
