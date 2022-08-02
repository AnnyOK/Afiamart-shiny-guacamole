import express from 'express';
import {authUser,getUserProfile,updateUserProfile, registerUser}  from "../controllers/userControllers.js"
import{protect} from "../middleware/auth.js"

const router = express.Router()


router.post('/login', authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/').post(registerUser)
export default router
