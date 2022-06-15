import express from'express';
//import products from "./Data/products.js"
import dotenv from'dotenv'
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import router from  "./routes/productRoutes.js"
import{notFound,errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()


const app = express();
connectDB()
app.use('/',router);
app.use(notFound)
app.use(errorHandler)


 
const PORT= process.env.PORT|| 4000
app.listen(PORT,console.log(`listening on port ${PORT}`))