import { prisma } from "../../lib/prisma"


const getcategoryfromdb=async()=>{

    const categories = await prisma.category.findMany();

    return categories;

}

export const categoryservice={
    getcategoryfromdb,
}