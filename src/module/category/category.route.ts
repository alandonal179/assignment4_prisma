import { Router } from "express";
import { categorycontroller } from "./category.controller";

const router = Router();

router.get("/category",categorycontroller.getcategory);

export default router;