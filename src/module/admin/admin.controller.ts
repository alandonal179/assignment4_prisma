import type { Request, Response } from "express";
import { adminservice } from "./admin.service";


const getAllUsers=async(req:Request,res:Response)=>{
    const result = await adminservice.getAllUserfromdb();

    res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: result
});
}


const getAllgears=async(req:Request,res:Response)=>{
    const results = await adminservice.getAllgearfromdb();

    res.status(200).json({
    success: true,
    message: "Gears fetched successfully",
    data: results
});
}



const getAllrentalorders=async(req:Request,res:Response)=>{
    const resultsoforder = await adminservice.getAllrentalorderfromdb();

    res.status(200).json({
    success: true,
    message: "Rental orders fetched successfully",
    data: resultsoforder
});
}

const updatestatustodb=async(req:Request,res:Response)=>{
     const id = req.params.id as string;
   const { activeStatus } = req.body;

    const result = await adminservice.updatestatus(id, activeStatus);

    res.status(200).json({
        success: true,
        message: "User status updated successfully",
        data: result
    });
}

export const admincontroller={
    getAllUsers,
    getAllgears,
    getAllrentalorders,
    updatestatustodb,
}