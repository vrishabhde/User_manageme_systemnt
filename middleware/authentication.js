import awdiztoken from "../models/AwdizToken.js";
import Users from "../models/register.js";
import encrypt from "encryptjs";



export const checkregister = async(req,res, next) => {
    try{
        const { name, email, number, pin, role, password, confirmpassword } = req.body;
        if (!name) return res.send("name is required");
        if (!email) return res.send("email is required");
        if (!number) return res.send("number is required");
        if (!pin) return res.send("pin is required");
        if (!role) return res.send("role is required");
        if (!password) return res.send("password is required");
        if(!confirmpassword) return res.send("confirmpassword is required");

        if(password.length < 8 || confirmpassword.length < 8) return res.send("password should be minimum of 8 digit");
        if(password !== confirmpassword) return res.send("password not matched");

        next();

    }catch(err){
        return res.send(err);
    }
}



export const checklogin = async(req,res,next) => {
    try{
        const { email, password } = req.body;
        if (!email) return res.send("email is required");
        if (!password) return res.send("password is required");

        const response = await Users.find({ email }).exec();
        if (!response.length) return res.send("user not found/registered");

        let secretkey = 'vrushabh';
        const decryptPassword = encrypt.decrypt(response[0].password, secretkey, 256);

        if(password !== decryptPassword) return res.send("credentials wrong");

        next();
       
    }catch(err){
        return res.send(err);
    }
}



export const checkaddproduct = async(req,res,next) =>{
    try{
        const { email, password, access_token, title, color, price } = req.body;
        if (!title) return res.send("title is required")
        if (!color) return res.send("color is required")
        if (!price) return res.send("price is required");
        if (!email) return res.send("email is required");
        if (!access_token) return res.send("access_token   is required");
        if (!password) return res.send("password is required");

        const response = await Users.find({ email }).exec();
        if (!response.length) return res.send("user not registered");


        let secretkey = 'vrushabh';
        const decryptPassword = encrypt.decrypt(response[0].password, secretkey, 256);
        
        const checktoken = await awdiztoken.find({}).exec();

        if(!checktoken.length) return res.send("regenerate token");

        if(checktoken[0].access_token !== access_token) return res.send("incorrwect credentials");

        if (decryptPassword !== password) return res.send("credentials wrong");

        if(response[0].role == "buyer") return res.send("you are not allowed to add the products");

        next();

    }catch(err){
        return res.send(err);
    }
}



export const checkforgetproduct = async(req,res,next) => {
    try {
        const { email,password, access_token } = req.body
        if (!email) return res.send("email is require");
        if (!access_token) return res.send("access_token is require");
        if (!password) return res.send("password is require");

        const response = await Users.find({email}).exec()
        if(!response.length) return res.send("user not found");

        let secretkey = 'vrushabh';
        const decryptPassword = encrypt.decrypt(response[0].password, secretkey, 256)

        if(decryptPassword !== password) return res.send("credentials wrong");

        const get_token = await awdiztoken.find({}).exec();
        if(!get_token.length) return res.send("regenerate token")

        if(get_token[0].access_token !== access_token) return res.send("token wrong")

        if(response[0].role == "seller") return res.send("seller cant get all products");
        
        next();

    } catch (error) {
        return res.send(error)
    }
}



export const checkfordelete = async(req,res,next) => {
    try {
        const { email, password, access_token } = req.body;
        if (!email) return res.send("email is require");
        if (!password) return res.send("password is require");
        if (!access_token) return res.send("product access_token is require");
    

        const response = await Users.find({ email }).exec();
        
        if (!response.length) return res.send("user not found");

        if(response[0].role != "admin") return res.send("you are not allowed to deletre the product");

        let secretkey = 'vrushabh';

        const decryptPassword = encrypt.decrypt(response[0].password, secretkey, 256)
        console.log(decryptPassword);
        if(decryptPassword !== password) return res.send("credential wrong");

        const get_token = await awdiztoken.findOne({}).exec();
        console.log(get_token);
        if(!get_token) return res.send("regenerate token");

        if(get_token.access_token !== access_token) return res.send("wrong token entered");

        next();
    } catch (error) {
        return res.send(error)
    }
}

