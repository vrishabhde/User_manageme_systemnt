import mongoose, { Schema } from "mongoose";


const newproduct = new Schema({

    title:String,
    category:String,
    price:Number,


})

export default mongoose.model("Products", newproduct);