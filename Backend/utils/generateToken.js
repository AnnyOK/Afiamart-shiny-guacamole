import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const generateToken = (id)=>{
return jwt.sign({id},process.env.SECRET_JWT,{expiresIn:"30d"})
}
export default generateToken