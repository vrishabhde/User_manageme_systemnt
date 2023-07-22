import Products from "../models/product.js";
import path from "path";


const __dirname = path.resolve();




export const addproduct_html = async (req, res) => {
    try {
        res.sendFile(__dirname + '/public/html/addproduct.html')

    } catch (err) {
        return res.send(err)
    }
}



export const addproduct = async (req, res) => {
    try {
        const { title, color, price } = req.body;

        const product = new Products({
            title, color, price
        })
        await product.save();
        return res.send("product added successfully");

    } catch (err) {
        return res.send(err);
    }
}


export const getproduct_html = async (req, res) => {
    try {
        res.sendFile(__dirname + '/public/html/getproduct.html')

    } catch (err) {
        return res.send(err)
    }
}



export const getproduct = async (req, res) => {
    try {
        const { page } = req.body;
       
        let limit = 3;
        let skip = (page - 1) * limit;
        const allproduct = await Products.find({}).exec();
        if(page > allproduct.length/limit) return res.send("products not found");
        const getpagination = await Products.find({}).skip(skip).limit(limit).exec();
        if (getpagination) {
            return res.json({ total_products: allproduct.length, currentpage_product:getpagination.length, getpagination });
        } else {
            return res.send("products not found");
        }

    } catch (err) {
        return res.send(err);
    }
}


export const deleteproduct_html = async (req, res) => {
    try {
        res.sendFile(__dirname + '/public/html/deleteproduct.html')

    } catch (err) {
        return res.send(err)
    }
}

export const deleteproduct = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) return res.send("Id is require");

        const delete_ptoduct = await Products.findByIdAndDelete({ _id }).exec();

        return res.send("product removed successfully");

    } catch (err) {
        return res.send(err);
    }
}

