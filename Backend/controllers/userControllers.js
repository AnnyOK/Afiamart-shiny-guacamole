import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/generateToken.js'
//@desc Auth user & get token
//@route POST api/users/login
//@access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('invalid email or password')
    }
  } catch (err) {
    console.log(err)
  }
})

//@desc get logged userprofile in user
//@ route: GET api/users/profile
//@access private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc updateUserProfile logged in user
//@ route: Put api/users/profile
//@access private
export const updateUserProfile = asyncHandler(async (req, res) => {
  console.log(req)

  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name||user.name
    user.email = req.body.email||user.email
    if(req.body.password){
      user.password = req.body.password
    }
    const updatedUser= await user.save()
    
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
//@desc create  user & get token
//@route POST api/users
//@access public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }
  const user =await User.create({
    name,
    email,
    password,
  })
  if(user){
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
    })
  }else{
      res.status(400)
      throw new Error('Invalid user data')
  }
})
