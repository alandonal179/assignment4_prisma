import {Router} from "express";
import { admincontroller } from "./admin.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router=Router();

router.get("/users",auth(Role.Admin),admincontroller.getAllUsers);

router.get("/gear",auth(Role.Admin),admincontroller.getAllgears);

router.get("/rentals",auth(Role.Admin),admincontroller.getAllrentalorders);

router.patch("/users/:id",auth(Role.Admin),admincontroller.updatestatustodb);



export default router;