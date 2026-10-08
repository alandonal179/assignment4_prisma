import app from "./app.js";
import "dotenv/config";
import { prisma } from "./lib/prisma.js";

const PORT = Number(process.env.PORT) || 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log("connected to the database successfully");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("error starting the server:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();

