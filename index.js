import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./routes/user_routes.js";

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use("/api/v1", router);

mongoose.connect("mongodb+srv://vrushabhde:vrushabhdeMDB@cluster0.41dmrwv.mongodb.net/mock_node_DB?retryWrites=true&w=majority")
.then(()=>console.log("DB connected"))
.catch((err)=>console.log("DB err=>",err))
app.listen(5002,()=>console.log("working on port 5002"))