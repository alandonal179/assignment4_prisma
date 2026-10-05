import {Router} from "express";
import {gearcontroller} from "./gear.controller.js";
import {auth} from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();


router.post("/gear",auth(Role.Provider),gearcontroller.creategear);

router.put("/gear/:id",auth(Role.Provider),gearcontroller.updategear);

router.delete("/gear/:id",auth(Role.Provider),gearcontroller.deletegear);

export default router;