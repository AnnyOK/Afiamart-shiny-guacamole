import {upload} from './cloudinary.js'
import express, { response } from  'express'
import path from 'path'

import  multer from 'multer'
import { userInfo } from 'os'
const router = express.Router()



router.post('/',upload.single('image'),async(req,res)=>{
    try{
        const uploader = async(path)=>await cloudinary.uploads(path,"Images")

        const urls = []
        const files = req.files;
        for(const file of files){
            const { data} =file;
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        res.status(200).json({
            message: 'images uploaded successfully',
            data:urls
        })
    }catch(error){
}
    
})
export default router