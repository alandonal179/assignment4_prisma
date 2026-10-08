import { Router } from "express";
import { rentalController } from "./rentalorder.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/rentals",auth(),rentalController.createrentalorder);

router.get("/rentals",auth(),rentalController.getRentalorder);

router.get("/rentals/:id",auth(),rentalController.getSingleRentalOrderdetails);

export default router;