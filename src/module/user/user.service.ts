import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";



const registrationhandle = async (payload: any) => {

    const { name, email, password, role } = payload;

    const userExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (userExist) {
        throw new Error("User with this email already exists");
    }

    if (role === "Admin") {
        throw new Error("Admin registration is not allowed");
    }

    const hashedpass = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_SALT_ROUNDS)
    );

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedpass,
            role: role || "Customer"
        }
    });

    return newUser;
};



const getprofilefromdb =async(id:string)=>{

    const singleuser = await prisma.user.findUnique({
        where:{
            id: id
        }
    });

    if(!singleuser){
        throw new Error("user with this id doesn't exist");
    }

    return singleuser;





}

export const userService ={
    registrationhandle,
    getprofilefromdb
}