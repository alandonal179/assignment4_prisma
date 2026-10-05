
import { prisma } from "../lib/prisma.ts";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

interface ILoginPayload {
    email: string;
    password: string;
}

const handlelogin = async (payload: ILoginPayload) => {

    const {email,password} = payload;
    

    const userinfo = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!userinfo) {
        throw new Error("User with this email doesn't exist");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        userinfo.password
    );

    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }

    const jwtpayload={
        id: userinfo.id,
        name: userinfo.name,
        email: userinfo.email,
        role: userinfo.role
    }
    

   const accessToken = jwt.sign(
    jwtpayload,
    process.env.ACCESS_SECRET,
    {
        expiresIn: process.env.ACCESS_EXPIRES_IN,
    } as SignOptions

   )


   const refreshToken = jwt.sign(
    jwtpayload,
    process.env.REFRESH_SECRET,
    {
        expiresIn: process.env.REFRESH_EXPIRES_IN,
    } as SignOptions
   )



    return {
        accessToken,
        refreshToken
    };

 
};

export const authService = {
    handlelogin
};