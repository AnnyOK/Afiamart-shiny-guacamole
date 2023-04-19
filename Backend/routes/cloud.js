import express from 'express'
import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
import fs from 'fs';
const router = express.Router()
dotenv.config()
console.log("cloud name",cloudinary.config().cloud_name)
router.post('/cloud',async(req,res)=>{
    console.log(cloudinary.config())
    console.log('filess',req.files.image.tempFilePath )
    try{
        const imgpath= req.files.image.tempFilePath
        // "//Users/okpalaanayo/Desktop/blueclock.png"
        // req.body.image

        const uploadReport =await cloudinary.uploader.upload(imgpath,{resource_type:"image",})
        // .then((response)=> {
        //     res.json(response)})
        console.log('uploadreport',uploadReport)
        fs.unlinkSync(imgpath)
        res.status(200).send(uploadReport)
    
    }catch(e){
        res.json(e)
    }
   })
export default router




// //reads in the cloudinary env variable - put this before
// require('dotenv').config()
// //we're aliasing version 2 and referencing with a variable
// const cloudinary = require('cloudinary').v2
// //cloudinary picks up env and is now configured
// console.log(cloudinary.config().cloud_name)
// //Node.js sdk uploader function  returns a promise
// cloudinary.uploader
// .upload('//Users/okpalaanayo/Desktop/giftbox.png',{
//     // /Users/okpalaanayo/Desktop
//     //image is thr default resource type if you dont specify
//     resource_type:"image",
// })
// .then((result)=>{
//     //JSON.stringify will provide a formatted string
//     //1st params is the value to be output
//     //2nd param  null is a function that can be applied to the output
//     //3rd param is the number of space characters to use for whitespace in formating the output
//     console.log("success",JSON.stringify(result,null,2 ))
// })
// .catch((err)=>{console.log("error",JSON.stringify(err,null,2))})