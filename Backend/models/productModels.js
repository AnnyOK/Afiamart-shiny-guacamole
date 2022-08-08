import mongoose from "mongoose";

const reviewSchema= mongoose.Schema({
    name:{type:String, required:true},
    rating:{type:Number, required: true,default:0},
    comment:{type:String, required:true},
    user: { type: mongoose.Schema.Types.ObjectId, required: false,ref:'User' },

},{timestamps:true})

const productSchema= mongoose.Schema({

  //
  user: { type: mongoose.Schema.Types.ObjectId, required: false,ref:'User' },
  name: { type: String, required: true },

  image: { type: String, required: true},
  brand: { type: String, required: true },
  category: { type: String, required: true },
  reviews:[reviewSchema],
  rating:{type:Number, required: true,default:0},
  numreviews:{type:Number, required: true,default:0},
  price:{type:Number, required: true,default:0},
  countInStock:{type:Number, required: true,default:0},
  description:{type:String},
  createdAt:{type:Date, required: true,default:Date.now()},
  updatedAt:{type:Date, required: true,default:Date.now()},

  timestamps:{type:Boolean,default:true}
})
const Product= mongoose.model('Product',productSchema)
export default Product