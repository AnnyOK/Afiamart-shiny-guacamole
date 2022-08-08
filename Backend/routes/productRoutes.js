import express from "express";
const router =express.Router();
import{getProducts,getProduct,deleteProduct,createProduct, updateProduct,createReview,getTopRated} from '../controllers/productControllers.js'
import {protect,isAdmin} from '../middleware/auth.js'

//import Product from "../models/productModels.js"
//import asyncHandler from "express-async-handler"


router.route('/').get(getProducts)
.post(protect, isAdmin, createProduct )
router.route('/top').get(getTopRated)
router.route('/:id')
.get(getProduct)
.delete(protect,isAdmin,deleteProduct)
.put(protect,isAdmin,updateProduct )
router.route('/:id/reviews').post(protect,createReview)


export default router