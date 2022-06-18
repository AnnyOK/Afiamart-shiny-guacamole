import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/generateToken.js'
//@desc Auth user & get token
//@route POST api/users/login
//@access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
// console.log(email,password)
try{
  const user = await User.findOne({ email })
//   console.log(user.password)
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token:generateToken(user._id)
    })
  }else{
      res.status(401)
      throw new Error("invalid email or password")
  }
}catch(err){
console.log( err )
}
})

//@desc get logged in user
//@ route: GET api/users/profile
//@access private
export const getUserProfile = asyncHandler(async (req, res) => {
  
    const user = await User.findById(req.user._id)

if(user){
res.json({
    id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
})
}else{
    res.status(404)
    throw new Error('User not found')
}
  })
  
  //@desc create  user & get token
//@route POST api/users
//@access public
export const registerUser = asyncHandler(async (req, res) => {
    const { name,email, password } = req.body
  try{
    const userExists = await User.findOne({ email })
if(userExists){
res.status(400)
throw new Error('user already exists')

}    
if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token:generateToken(user._id)
      })
    }else{
        res.status(401)
        throw new Error("invalid email or password")
    }
  }catch(err){
  console.log( err )
  }
  })
  
  