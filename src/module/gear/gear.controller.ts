import {gearservice} from "./gear.service.js";
import type { Request, Response } from "express";




const creategear=async(req:Request,res:Response)=>{
     
    const payload = {
        ...req.body,
        providerId: req.user.id
    };

    const result = await gearservice.creategeartodb(payload);


     res.status(201).json({
    success: true,
    statusCode: 201,
    message: "gear created successfully"
});

}

const updategear = async (req: Request, res: Response) => {

    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        throw new Error("Invalid gear id");
    }

    const result = await gearservice.updategeartodb(
        id,
        req.user.id,
        req.body
    );

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Gear updated successfully",
        data: result
    });
};

const deletegear = async(req:Request,res:Response)=>{
    const {id} = req.params;

       if (!id || Array.isArray(id)) {
        throw new Error("Invalid gear id");
    }

    const result = await gearservice.deletegeartodb(id,req.user.id);

    res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Gear deleted successfully"
});
}

const getAllGear = async (req: Request, res: Response) => {
  const result = await gearservice.getgearfromdb(req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
};

const getSinglegear = async(req:Request,res:Response)=>{
    const {id} = req.params;

         if (!id || Array.isArray(id)) {
        throw new Error("Invalid gear id");
    }

    const resultofsinglegear = await gearservice.getSinglegearfromdb(id);
    
     res.status(200).json({
    success: true,
    statusCode: 200,
    message: "single gear retrieved successfully",
    data:resultofsinglegear,

});
}

const getIncomingOrders = async (req: Request, res: Response) => {
    const providerId = req.user.id;

    const result = await gearservice.getProviderOrders(providerId);

    res.status(200).json({
        success: true,
        message: "Incoming orders fetched successfully",
        data: result
    });
};


const changeOrderStatus = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const providerId = req.user.id;
    const { status } = req.body;

    const result = await gearservice.updateRentalOrderStatus(
        id,
        providerId,
        status
    );

    res.status(200).json({
        success: true,
        message: "Rental order status updated successfully",
        data: result
    });
};




export const gearcontroller={
    creategear,
    updategear,
    deletegear,
    getAllGear,
    getSinglegear,
    getIncomingOrders,
    changeOrderStatus,
      
    
}