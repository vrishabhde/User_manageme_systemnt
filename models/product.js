import mongoose, { Schema } from "mongoose";


const newproduct = new Schema({

    title:String,
    color:String,
    price:Number,


})

export default mongoose.model("Products", newproduct);