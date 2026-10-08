import type { Request, Response } from "express";
import { reviewervice } from "./review.service";


const addReview = async (req: Request, res: Response) => {
    const userId = req.user.id;

    const result = await reviewervice.createReview(userId, req.body);

    res.status(201).json({
        success: true,
        message: "Review added successfully",
        data: result
    });
};

export const reviewcontroller={
    addReview
}