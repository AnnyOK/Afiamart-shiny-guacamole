import express from 'express';
import {authUser,getUserProfile,updateUserProfile, registerUser,getAllUsers, deleteUser,getUserById,updateUser}  from "../controllers/userControllers.js"
import{protect,isAdmin} from "../middleware/auth.js"

const router = express.Router()


router.post('/login', authUser)

router.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile)

router.route('/')
.post(registerUser)
.get(protect, isAdmin, getAllUsers)

router.route('/:id')
.delete(protect,isAdmin,deleteUser)
.get(protect,isAdmin,getUserById)
.put(protect,isAdmin,updateUser)

export default router
