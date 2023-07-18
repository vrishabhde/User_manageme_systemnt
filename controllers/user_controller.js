import Products from "../models/product.js";
import Users from "../models/register.js";
import encrypt from "encryptjs"

export const register = async (req, res) => {
    try {
        const { name, email, number, pin, role, password } = req.body;
        if (!name) return res.send("name is required");
        if (!email) return res.send("email is required");
        if (!number) return res.send("number is required");
        if (!pin) return res.send("pin is required");
        if (!role) return res.send("role is required");
        if (!password) return res.send("password is required");

        let secretkey = 'vrushabh';
        let plaintextForPassword = password;
        let plaintextForPin = pin;

        const response = await Users.find({ email }).exec();
        if (response.length) return res.send("user already registered");
        const encryptPassword = encrypt.encrypt(plaintextForPassword, secretkey, 256);
        const encryptPin = encrypt.encrypt(plaintextForPin, secretkey, 256);

        const user = new Users({
            name, email, number, role,
            password: encryptPassword,
            pin: encryptPin

        })
        await user.save();
        return res.send("registration success");

    } catch (err) {
        return res.send(err);
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.send("email is required");
        if (!password) return res.send("password is required");

        const response = await Users.find({ email }).exec();
        let secretkey = 'vrushabh';
        if (!response.length) return res.send("user not registered");
        const decryptPassword = encrypt.decrypt(response[0].password, secretkey, 256);

        if (response[0].email == email && decryptPassword == password) {
            return res.send("login successfully");
        } else {
            return res.send("credential wrong");
        }


    } catch (err) {
        return res.send(err);
    }
}


export const pinAuthentication = async (req, res) => {
    try {
        const { email, password, pin, title, category, price } = req.body;
        let secretkey = 'vrushabh';

        const response = await Users.find({ email }).exec();

        if (!response.length) return res.send("user not registered");

        const decryptPassword = encrypt.decrypt(response[0].password, secretkey, 256);

        const decryptPin = encrypt.decrypt(response[0].pin, secretkey, 256);
        if (response[0].role == "admin" || response[0].role == "seller") {
            if (response[0].email == email && decryptPassword == password && decryptPin == pin) {

                const product = new Products({
                    title, category, price
                })
                await product.save();
                return res.send("product added successfully");
            }
        } else {
            return res.send("buyer not allowed to add product");
        }

    } catch (err) {
        return res.send(err);
    }
}


export const getproduct = async (req, res) => {
    try {
const {email} = req.body
        const response = await Users.find({email}).exec();
        // console.log(response)
        if (response[0].email == email) {
            if (response[0].role == "admin" || response[0].role == "buyer") {
                const get = await Products.find({}).exec();
                return res.send(get);
            }
        } else {
            return res.send("credential wrong");
        }
    } catch (err) {
        return res.send(err);
    }
}


export const deleteproduct = async(req,res) => {
    try{
       const {email} = req.body;
       const response = await Users.find({email}).exec();
       if (response[0].email == email) {
        if (response[0].role == "admin") {
            const get = await Products.findOneAndDelete({}).exec();
            return res.send("product removed");
        }
    } else {
        return res.send("credential wrong");
    }
    }catch(err){
        return res.send(err);
    }
}
