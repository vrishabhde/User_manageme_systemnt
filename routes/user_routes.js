import express from "express";
import { deleteproduct, getproduct, login, pinAuthentication, register } from "../controllers/user_controller.js";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/pinAuthentication", pinAuthentication);
router.get("/getproduct", getproduct);
router.post("/deleteproduct", deleteproduct);


export default router;