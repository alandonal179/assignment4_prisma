import type { ActiveStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"


const getAllUserfromdb=async()=>{
    const allusers= await prisma.user.findMany();

    return allusers;
}

const getAllgearfromdb=async()=>{
    const allgears = await prisma.gearItem.findMany();

    return allgears;
}

const getAllrentalorderfromdb=async()=>{
    const allrentalorder = await prisma.rentalOrder.findMany();

    return allrentalorder;
}

const updatestatus=async(id:string,status:ActiveStatus)=>{
    const user = await prisma.user.update({
        where:{
            id,
        },
        data:{
            activeStatus:status,
        }
    })

    return user;
}



export const adminservice={

    getAllUserfromdb,
    getAllgearfromdb,
    getAllrentalorderfromdb,
    updatestatus

}