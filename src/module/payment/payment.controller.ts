
import type { Request, Response } from "express";
import { paymentService } from "./payment.service";

const createPayment = async (req: Request, res: Response) => {
    const { id } = req.body;

    const result = await paymentService.createCheckoutSession(id);

    res.status(200).json({
        success: true,
        message: "Checkout session created successfully",
        data: result
    });
};


const confirmingPayment = async (req: Request, res: Response) => {
    const { sessionId } = req.body;

    const result = await paymentService.confirmPayment(sessionId);

    res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: result
    });
};

const getallpayments= async(req: Request, res: Response)=>{

    const userId = req.user.id;

    const result2 = await paymentService.getallpaymentrecordsfromdb(userId);

    res.status(200).json({
  success: true,
  message: "Payment records retrieved successfully",
  data: result2,
});



    
}

const getsinglepayment=async(req: Request, res: Response)=>{
    const id = req.params.id as string;

    const resultofsinglepayment = await paymentService.getsinglepaymentfromdb(id);

        res.status(200).json({
  success: true,
  message: "Payment records retrieved successfully",
  data: resultofsinglepayment,
});
}

export const paymentController = {
    createPayment,
    confirmingPayment,
    getallpayments,
    getsinglepayment,
};