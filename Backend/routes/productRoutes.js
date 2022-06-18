import express from "express";
const router =express.Router();
import{getProducts,getProduct} from '../controllers/productControllers.js'
//import Product from "../models/productModels.js"
//import asyncHandler from "express-async-handler"


router.get('/',getProducts)

router.get('/:id',getProduct)
export default router