import express,{type Application,type Request,type Response} from "express"
import cookieParser from "cookie-parser";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { defineConfig } from "prisma/config";
import authRoutes from "./auth/auth.route.js";
import userRoutes from "./module/user/user.route.js";
import gearRoutes from "./module/gear/gear.route.js";
import gearpublicRoutes from "./module/gear/gear.public.route.js";

import categoryRoutes from "./module/category/category.route.js";

import rentalRoutes from "./module/rentalorder/rentalorder.route.js";

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/",async(req:Request, res: Response)=>{
    const user = await prisma.user.findMany()
    console.log(user);
    res.send("Hello, World!");
});

// app.post("/api/auth/register",async(req:Request, res: Response)=>{


//     const userinfo = req.body;

//     const userExist = await prisma.user.findUnique({
//         where:{
//             email: userinfo.email
//         }
//     });

//     if(userExist){
//         throw new Error("User with this email already exists");
//     }

//     const hashedpass = await bcrypt.hash(userinfo.password,Number(process.env.BCRYPT_SALT_ROUNDS));

//     const newUser = await prisma.user.create({
//         data:{
//             name: userinfo.name,
//             email: userinfo.email,
//             password: hashedpass,
//         }
//     })


//     res.status(201).json({
//     success: true,
//     statusCode: 201,
//     message: "User registered successfully"
// });
// })


app.use("/api/auth", authRoutes);

app.use("/api/auth", userRoutes);

app.use("/api/provider", gearRoutes);

app.use("/api", gearpublicRoutes);

app.use("/api", categoryRoutes);

app.use("/api", rentalRoutes);









export default app;