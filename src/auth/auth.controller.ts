import { authService } from "./auth.service.js";
import type { Request, Response } from "express";

const loginUser = async (req:Request, res:Response) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authService.handlelogin(payload);

       res.cookie("accessToken", accessToken, {
        httpOnly : true,
        secure : false,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 // 24 hour or 1 day
    })


        res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : false,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 * 7 // 7 day
    })

    // const result = await authService.handlelogin(email, password);

    res.status(200).json({
        message: "user logged in successfully",
    });
};

export const authController = {
    loginUser
};