import {Router} from "express";
import {gearcontroller} from "./gear.controller.js";



const router = Router();

router.get("/gear",gearcontroller.getAllGear);

router.get("/gear/:id",gearcontroller.getSinglegear);






export default router;