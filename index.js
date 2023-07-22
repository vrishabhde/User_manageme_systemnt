import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./routes/user_routes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(morgan('dev'));
app.use("/api/v1", router);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log("DB err=>",err))
app.listen(process.env.PORT,()=>console.log("working on port 5002"))