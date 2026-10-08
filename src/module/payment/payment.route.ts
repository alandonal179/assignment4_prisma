import { Router } from "express";

import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/create", paymentController.createPayment);
router.post("/confirm", paymentController.confirmingPayment);

router.get("/",auth(),paymentController.getallpayments);
router.get("/:id",auth(),paymentController.getsinglepayment);



export default router;