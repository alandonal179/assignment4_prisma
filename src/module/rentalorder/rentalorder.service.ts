import { prisma } from "../../lib/prisma";


const createrentalordertodb=async(payload:any)=>{
    const {userId, gearId, startDate, endDate, quantity, totalPrice}= payload;

    const findgear = await prisma.gearItem.findUnique({
        where:{
            id:gearId,
        }
    })
    if(!findgear){
        throw new Error("this gear product doesn't exist");
    }

    if( findgear.stock<1 || !findgear.availability ){
        throw new Error("gear is not available now");
    }

    const newRentalOrder = await prisma.rentalOrder.create({
        data:{
            userId,
            gearId,
            startDate,
            endDate,
            quantity,
            totalPrice,
            
        }
    })

    return newRentalOrder;
    
}

export const rentalOrderService={
    createrentalordertodb
}