import express, { application } from'express';
import path from 'path';
import morgan from 'morgan'
//import products from "./Data/products.js"
// import uploads from './routes/cloudinary.js'
import dotenv from'dotenv'
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import  orderRoutes from "./routes/orderRoutes.js"
// import uploadcloud from "./routes/uploadcloud.js"   
import cloud from "./routes/cloud.js"   
import{notFound,errorHandler} from './middleware/errorMiddleware.js'
import fileUpload from "express-fileupload"
import { v2 as cloudinary} from 'cloudinary'
dotenv.config()


const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(fileUpload({useTempFiles: true}))

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// })

connectDB()
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
// app.use('/api/upload',uploadcloud)
app.use('/api/uploads',cloud)
app.get('/api/config/paypal', (req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend','build', 'index.html')))
    }
    

app.use(notFound)
app.use(errorHandler)





 
const PORT= process.env.PORT|| 4000
app.listen(PORT,console.log(`listening on port ${PORT}`))