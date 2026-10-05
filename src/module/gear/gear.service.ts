import { prisma } from "../../lib/prisma";

interface GearPayload {
    name: string;
    description: string;
    brand: string;
    priceperday: number;
    stock: number;
    avialability: boolean;
    providerId: string;
}

const creategeartodb = async (payload: GearPayload) => {
    const {
        name,
        description,
        brand,
        priceperday,
        stock,
        avialability,
        providerId
    } = payload;

    const newGear = await prisma.gearItem.create({
        data: {
            name,
            description,
            brand,
            pricePerday: priceperday,
            stock,
            availability: avialability,
            providerId
        }
    });

    return newGear;
};

const updategeartodb = async (
    id: string,
    providerId: string,
    payload: Omit<GearPayload, "providerId">
) => {
    const existingGear = await prisma.gearItem.findFirst({
        where: {
            id,
            providerId
        }
    });

    if (!existingGear) {
        throw new Error("Gear not found or you are not authorized to update it");
    }

    const updatedGear = await prisma.gearItem.update({
        where: {
            id
        },
        data: {
            name: payload.name,
            description: payload.description,
            brand: payload.brand,
            pricePerday: payload.priceperday,
            stock: payload.stock,
            availability: payload.avialability
        }
    });

    return updatedGear;
};

const deletegeartodb = async (
    id: string,
    providerId: string
) => {
    const deletegearitem = await prisma.gearItem.findFirst({
        where: {
            id,
            providerId
        }
    });

    if (!deletegearitem) {
        throw new Error("No item found for deletion");
    }

    const deleteGear = await prisma.gearItem.delete({
        where: {
            id
        }
    });

    return deleteGear;
};

export const gearservice = {
    creategeartodb,
    updategeartodb,
    deletegeartodb
};