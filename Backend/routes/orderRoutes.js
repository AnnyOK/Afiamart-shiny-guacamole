import express from 'express';
const router = express.Router()
import {addOrders, getOrderById, updateOrderToPaid,getMyOrders, getAllOrders,deliverOrderById} from  '../controllers/orderController.js'
import {isAdmin, protect} from '../middleware/auth.js'


router.route('/').post(protect,addOrders).get(protect,isAdmin,getAllOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById).put(deliverOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
export default router