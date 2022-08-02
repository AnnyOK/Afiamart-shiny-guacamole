import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB= async()=>{
    try{

        const conn = await mongoose.connect(process.env.MONGO_DB,{
        useUnifiedTopology:true,
        useNewUrlParser:true
        //useCreateIndex:true
        })

console.log(`mongoDB connected:${conn.connection.host}`)
    }catch(error){

        console.log(`Error: ${error.message}`)
        process.exit(1)

    }
}
export default connectDB