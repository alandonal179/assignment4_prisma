import {userService} from "./user.service.js";
import type { Request, Response } from "express";

const signup=async(req:Request,res:Response)=>{

    const payload = req.body;

    const result = await userService.registrationhandle(payload);





       res.status(201).json({
    success: true,
    statusCode: 201,
    message: "User registered successfully"
});

}

const getprofile=async(req:Request,res:Response)=>{


    const oneuser = await userService.getprofilefromdb(req.user.id);


    

res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    data: {
        id: oneuser.id,
        name: oneuser.name,
        email: oneuser.email,
        role: oneuser.role
    }
});


}

export const userController={
    signup,
    getprofile
}