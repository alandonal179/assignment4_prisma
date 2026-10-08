

import { prisma } from "../../lib/prisma";

const createReview = async (userId: string, data: any) => {
    const rental = await prisma.rentalOrder.findFirst({
        where: {
            userId,
            gearId: data.gearId,
            status: "RETURNED"
        }
    });

    if (!rental) {
        throw new Error("You can review only after returning the gear");
    }

    return await prisma.review.create({
        data: {
            userId,
            gearId: data.gearId,
            rating: data.rating,
            comment: data.comment
        }
    });
};

export const reviewervice={
    createReview
}