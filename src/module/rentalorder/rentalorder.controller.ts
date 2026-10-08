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

const getRentalorder=async(req:Request,res:Response)=>{
    const userId = req.user.id;

    const rentalresult = await rentalOrderService.getRentalorderfromdbbyuser(userId);

    res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: rentalresult,
});
}

const getSingleRentalOrderdetails=async(req:Request,res:Response)=>{

    const id = req.params.id;

    const singlerentalorderdetails = await rentalOrderService.getRentalOrderdetailsbyId(id);


        res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: singlerentalorderdetails ,
});

}

export const rentalController={
    createrentalorder,
    getRentalorder,
    getSingleRentalOrderdetails,
}