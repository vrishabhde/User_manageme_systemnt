
import Users from "../models/register.js";
import encrypt from "encryptjs"
import awdiztoken from "../models/AwdizToken.js";
import path from "path";


const __dirname = path.resolve();

export const home = async (req, res) => {
    try {
        res.sendFile(__dirname + '/public/html/home.html')

    } catch (err) {
        return res.send(err)
    }
}

export const register_html = async (req, res) => {
    try {
        res.sendFile(__dirname + '/public/html/register.html')

    } catch (err) {
        return res.send(err)
    }
}



export const register = async (req, res) => {
    try {
        const { name, email, number, pin, role, password } = req.body;
        const response = await Users.find({ email }).exec();
        if (response.length) return res.send("user already registered");

        let secretkey = 'vrushabh';
        let plaintextForPassword = password;
        let plaintextForPin = pin;

        const encryptPassword = encrypt.encrypt(plaintextForPassword, secretkey, 256);
        const encryptPin = encrypt.encrypt(plaintextForPin, secretkey, 256);

        const user = new Users({
            name, email, number, role,
            password: encryptPassword,
            pin: encryptPin

        })
        await user.save();
        return res.send({ messeage: "registration success", user });

    } catch (err) {
        return res.send(err);
    }
}



export const login_html = async (req, res) => {
    try {
        res.sendFile(__dirname + '/public/html/login.html')

    } catch (err) {
        return res.send(err)
    }
}



export const login = async (req, res) => {
    try {
        const {email} = req.body;
        const getusers = await Users.find({email}).exec();
        if (getusers[0].role == "buyer" || getusers[0].role == "seller") {
            return res.send("login success");
        } else if(getusers[0].role == "admin") {
            const response = await Users.find({}).exec();
            return res.send({message:"login_success",total_users:response.length,response});
        }else{
            return res.send({status : 400, message : "An unexpected error occured."});
        }

    } catch (err) {
        return res.send(err);
    }
}




export const get_token = async(req,res) => {
    try {
        const response = await awdiztoken.find({}).exec()
        if(!response.length) return res.send("regenerate token");
        return res.send(response[0].access_token)

    } catch (error) {
        return res.send(error);
    }
}


