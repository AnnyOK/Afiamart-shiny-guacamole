import express from  'express'
import path from 'path'
import {upload} from './cloudinary.js'
import  multer from 'multer'
// import cloudinary from '../config/cloudinary.js'
import { v2 as cloudinary} from 'cloudinary'
const router = express.Router()


// const storage = multer.diskStorage({
//     destination(req,file,cb){
//         cb(null,'uploads/')
//     },

//         filename(req,file,cb){
// cb(null,`${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
//         }
// })
// const checkFileType =(file,cb)=>{
//     const  fileType = /jpg|png|gif|jpeg/
//     const extname = fileType.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = fileType.test(file.mimetype)
//     console.log(extname,mimetype)
//     if(extname && mimetype){
//         return cb(null,true)
//     }else{
//         cb('images only ')
//     }

// }
const sayHi=(req,res, next) => {
    console.log(' Hi cloud_name: ' )
next()
}
// const upload = multer({
//     storage,
//     fileFilter:function(req,file,cb){

//         checkFileType(file,cb)
//     }
// })

// router.post('/',upload.single('image'), sayHi, (req,res)=>{
//     console.log("file",req.file)
//     res.json(req.file)
// })

router.post('/', async (req,res)=>{
    console.log("file", req.files.image.tempFilePath)
    

    
    try {
        const cloudFileUpLoad = await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: 'App'
            }
        )

        console.log('expose here')
        res.json({
            image: cloudFileUpLoad.secure_url,
        })
    } catch (error) {
        res.status(404).send({ message: error})
    }

    
})


export default router