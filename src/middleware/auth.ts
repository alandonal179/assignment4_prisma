
import { prisma } from "../lib/prisma";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {Role} from "../../generated/prisma/enums";

export const auth = (requiredRole?: Role) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            throw new Error("You are not a logged in user");
        }

        const verifiedToken = jwt.verify(
            accessToken,
            process.env.ACCESS_SECRET as string
        );

        const { id } = verifiedToken as JwtPayload;

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        if(requiredRole && requiredRole!=user.role){
            throw new Error("You are not authorized");
        }

        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        next();
    };
};