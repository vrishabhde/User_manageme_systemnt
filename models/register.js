import mongoose, { Schema, mongo } from "mongoose";

const newuser = new Schema({
    name:String,
    email:String,
    number:Number,
    role:String,
    pin:String,
    password:String,


})

export default mongoose.model("Users", newuser);