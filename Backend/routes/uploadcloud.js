import express from 'express';
const router = express.Router();
import cloudinary from '../utils/cloudinary.js';
import {upload} from '../utils/multer.js'

router.post('/',upload.single('image'), async(req,res)=>{
console.log(req.file)
    try{
        console.log('Uploading')
const result = await cloudinary.uploader.upload(req.file.path)
res.json(result)
    }catch(err){
        console.log(err)
    }
})
router.get("/get-signature", async(req,res)=>{
    const timestamp = Math.round(new Date().getTime()/1000)
    const signature = await cloudinary.utils.api_sign_request({
        timestamp: timestamp,

    },
    cloudinary.config.api_secret
    )
    res.json({timestamp,signature})
})
export default router