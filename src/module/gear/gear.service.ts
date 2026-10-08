import type { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

interface GearPayload {
    name: string;
    description: string;
    brand: string;
    pricePerday: number;
    stock: number;
    availability: boolean;
    providerId: string;
}


const getgearfromdb = async (filters: any) => {
  const { category, brand, minPrice, maxPrice } = filters;

  return await prisma.gearItem.findMany({
    where: {
      ...(category && { category }),
      ...(brand && { brand }),
      ...(minPrice && { price: { gte: Number(minPrice) } }),
      ...(maxPrice && { price: { lte: Number(maxPrice) } }),
    },
  });
};

const creategeartodb = async (payload: GearPayload) => {
    const {
        name,
        description,
        brand,
        pricePerday,
        stock,
       availability,
        providerId
    } = payload;

    const newGear = await prisma.gearItem.create({
        data: {
            name,
            description,
            brand,
            pricePerday: pricePerday,
            stock,
            availability: availability,
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
            pricePerday: payload.pricePerday,
            stock: payload.stock,
            availability: payload.availability
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

const getSinglegearfromdb = async (id: string) => {
    const singlegearfromdatabase = await prisma.gearItem.findUnique({
        where: {
            id
        },
        include: {
            provider: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });

    return singlegearfromdatabase;
};

const getProviderOrders = async (providerId: string) => {
    const orders = await prisma.rentalOrder.findMany({
        where: {
            gear: {
                providerId
            }
        }
    });

    return orders;
};

const updateRentalOrderStatus = async (
    id: string,
    providerId: string,
    status: RentalStatus
) => {
    const order = await prisma.rentalOrder.findFirst({
        where: {
            id,
            gear: {
                providerId
            }
        }
    });

    if (!order) {
        throw new Error("Order not found or you are not authorized");
    }

    const updatedOrder = await prisma.rentalOrder.update({
        where: {
            id
        },
        data: {
            status
        }
    });

    return updatedOrder;
};

export const gearservice = {
    creategeartodb,
    updategeartodb,
    deletegeartodb,
    getgearfromdb,
    getSinglegearfromdb,
    getProviderOrders,
    updateRentalOrderStatus,
};