import {Router} from "express";
import {reviewcontroller} from "./review.controller.js";
import { auth } from "../../middleware/auth.js";



const router = Router();

router.post("/reviews",auth(),reviewcontroller.addReview);






export default router;