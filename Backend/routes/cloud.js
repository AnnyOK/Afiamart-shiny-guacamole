import express from 'express'
import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
const router = express.Router()
console.log(cloudinary.config().cloud_name)

dotenv.config()
router.post('/cloud',async(req,res)=>{
    try{
        
        const imgpath= "//Users/okpalaanayo/Desktop/blueclock.png"
        req.body.image
         cloudinary.uploader.upload(imgpath,{resource_type:"image",}).then((response)=>res.json(response))
        console.log(uploadReport)
        res.json(uploadReport)
    
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