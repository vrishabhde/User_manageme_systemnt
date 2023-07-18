import product from "../models/product.js";


export const addproduct = async (req,res) => {
    try{
            const {title, category, price} = req.body;
            if(!title) return res.send("title is required")
            if(!category) return res.send("category is required")
            if(!price) return res.send("price is required");
          
            const response = await Users.find({ email }).exec();
            let secretkey = 'vrushabh';
            if (!response.length) return res.send("user not registered");
            const decryptPassword = encrypt.decrypt(response[0].password, secretkey, 256);
    
            if (response[0].email == email && decryptPassword == password) {
                return res.send("login successfully");
            } else {
                return res.send("credential wrong");
            }
    }catch(err){
        return res.send(err);
    }
}