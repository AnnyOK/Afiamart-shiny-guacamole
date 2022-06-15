import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModels.js'
import Product from './models/productModels.js'
import Order from './models/orderModels.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
      console.log(1)
    await User.deleteMany()
    console.log(2)

    await Product.deleteMany()
    console.log(3)

    await Order.deleteMany()
    //now seed the data bases
    console.log(4)

    const createdUsers = await User.insertMany(users)
    console.log(5)

    const adminUser = createdUsers[0]._id

    console.log(6)


    const sampleProduct = products.map((product) => ({ ...product, adminUser }))

    await Product.insertMany(sampleProduct)
    console.log(8)

    console.log('Data inserted')
    process.exit()
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
}
const deleteData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data deleted')
    process.exit()
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
}
if (process.argv[2] === '-d') {
  deleteData()
} else {
  importData()
}
