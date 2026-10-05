import type { Request, Response } from "express"
import { rentalOrderService } from "./rentalorder.service"

const createrentalorder=async(req:Request,res:Response)=>{

    const payload = req.body;

    const userId = req.user.id;

    const result = await rentalOrderService.createrentalordertodb({
        ...payload,
        userId
});



     res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Rental ordered successfully"
});
}

export const rentalController={
    createrentalorder,
}