import { v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import dotenv from 'dotenv'
dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    // secure:true
})




const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:"app",
        format: async (req, file) => console.log(file),
        public_id: (req, file) => file.public_id,
        // console.log("req from clod", req.file)
        // console.log("req from clod", file)
        // return{
        //     folder:"app",
        //     allowed_formats:['jpg', 'png', 'jpeg'],
        //     // transformations:[{width:500,height:500,crop:"limit"}],
        // }
    }
    // folder:"app",
    // allowedFormats:['jpg', 'png', 'jpeg'],
    // transformations:[{width:500,height:500,crop:"limit"}],
})

export const upload = multer({storage})

// module.exports = upload


// exports.uploads = (file, folder) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(file, (result) => {
//             resolve({
//                 url: result.url,
//                 id: result.public_id
//             })
//         }, {
//             resource_type: "auto",
//             folder: folder
//         })
//     }

//     )
// }