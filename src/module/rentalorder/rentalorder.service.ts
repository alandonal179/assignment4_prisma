import { prisma } from "../../lib/prisma";


const createrentalordertodb=async(payload:any)=>{
    const {userId, gearId, startDate, endDate}= payload;

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

    const start = new Date(startDate);
    const end = new Date(endDate);

    const rentalDays =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    const totalPrice = rentalDays * findgear.pricePerday;

    const newRentalOrder = await prisma.rentalOrder.create({
        data:{
            userId,
            gearId,
            startDate,
            endDate,
           
            totalPrice,
            
        }
    })

    return newRentalOrder;
    
}

const getRentalorderfromdbbyuser=async(id:string)=>{

    const rentalorderbyuser = await prisma.rentalOrder.findMany({
        where:{
            userId:id,
        }
    })

    return rentalorderbyuser;

}

const getRentalOrderdetailsbyId=async(id:string)=>{
    const singlerentalorderdetails = await prisma.rentalOrder.findUniqueOrThrow({
        where:{
            id:id,
        }
    })

    return singlerentalorderdetails;
}

export const rentalOrderService={
    createrentalordertodb,
    getRentalorderfromdbbyuser,
    getRentalOrderdetailsbyId,
}