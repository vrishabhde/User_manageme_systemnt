import mongoose, { Schema } from "mongoose";


const newtoken = new Schema({
    access_token:String
})

export default mongoose.model("awdiztoken", newtoken);