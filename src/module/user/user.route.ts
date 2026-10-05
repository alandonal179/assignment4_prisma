import {Router} from "express";
import {userController} from "./user.controller.js";
import {auth} from "../../middleware/auth";

const router=Router();

router.post("/register",userController.signup);

router.get("/me",auth(), userController.getprofile);

export default router;