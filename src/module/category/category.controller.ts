
import type { Request, Response } from "express";
import { categoryservice } from "./category.service";

const getcategory=async(req:Request,res:Response)=>{

    const result = await categoryservice.getcategoryfromdb();

  
       res.status(201).json({
    success: true,
    statusCode: 201,
    message: "category fetched successfully",
    data:result
});


}

export const categorycontroller={
    getcategory,
}