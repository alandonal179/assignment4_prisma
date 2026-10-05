import app from "./app.js";
import {prisma} from "./lib/prisma.ts";
import "dotenv/config";

const PORT = process.env.PORT;

async function main(){
    try{

        await prisma.$connect();
        console.log("connected to the database successfully");

        console.log("connected to the db succesfully");

        app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

    }catch(error){
        console.error("error starting the server:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();

