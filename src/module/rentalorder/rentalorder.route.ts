import { Router } from "express";
import { rentalController } from "./rentalorder.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/rentalorder",auth(),rentalController.createrentalorder);

export default router;