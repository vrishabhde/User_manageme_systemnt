import express from "express";
import { get_token, home, login, login_html, register, register_html } from "../controllers/user_controller.js";
import { addproduct, addproduct_html, deleteproduct, deleteproduct_html, getproduct, getproduct_html } from "../controllers/product_controller.js";
import { CronJob } from "cron";
import { v4 as uuidv4 } from 'uuid';
import awdiztoken from "../models/AwdizToken.js";
import { checkaddproduct, checkfordelete, checkforgetproduct, checklogin, checkregister } from "../middleware/authentication.js";



const router = express.Router();



let job = new CronJob(' 0 */4 * * *', async () => {
    let awdiz_token = uuidv4();

    const checktoken = await awdiztoken.findOne({}).exec();
    if (checktoken) {
        checktoken.access_token = awdiz_token
        await checktoken.save();
        console.log("updated")
    } else {
        const new_token = new awdiztoken({

            access_token: awdiz_token

        });
        console.log("token generated");
        await new_token.save();
    }
})  
job.start();


router.get("/home", home);
router.get("/register", register_html);
router.post("/register",checkregister,  register);
router.get("/login", login_html);
router.post("/login",checklogin, login);
router.get("/addproduct", addproduct_html)
router.post("/addproduct",checkaddproduct, addproduct)
router.get("/getproduct", getproduct_html);
router.post("/getproduct",checkforgetproduct, getproduct);
router.get("/deleteproduct", deleteproduct_html);
router.post("/deleteproduct",checkfordelete, deleteproduct);
router.get("/get_token", get_token);


export default router;