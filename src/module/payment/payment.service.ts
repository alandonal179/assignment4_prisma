import {prisma} from "../../lib/prisma";
import {stripe} from "../../lib/stripe";

const createCheckoutSession = async (id: string) => {
    const rentalorder = await prisma.rentalOrder.findUnique({
        where: {
            id
        }
    });

    if (!rentalorder) {
        throw new Error("Rental order is not found");
    }

    if (rentalorder.status != "PENDING") {
        throw new Error("Payment is not available for this order");
    }

    const paymentprice = rentalorder.totalPrice;

    const payment = await prisma.payment.create({
        data: {
            rentalOrderId: rentalorder.id,
            amount: rentalorder.totalPrice
        }
    });

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Gear Rental"
                },
                unit_amount: paymentprice * 100
            },
            quantity: 1
        }],
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    await prisma.payment.update({
        where: {
            id: payment.id
        },
        data: {
            stripeSessionId: session.id
        }
    });

    return {
        url: session.url,
        sessionId: session.id
    };
};

const confirmPayment = async (sessionId: string) => {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
        throw new Error("Payment is not completed");
    }

    const payment = await prisma.payment.findFirst({
        where: {
            stripeSessionId: session.id
        }
    });

    if (!payment) {
        throw new Error("Payment record not found");
    }

    const updatedPayment = await prisma.payment.update({
        where: {
            id: payment.id
        },
        data: {
            status: "PAID",
            stripePaymentId:
                typeof session.payment_intent === "string"
                    ? session.payment_intent
                    : null
        }
    });

    await prisma.rentalOrder.update({
        where: {
            id: payment.rentalOrderId
        },
        data: {
            status: "CONFIRMED"
        }
    });

    return updatedPayment;
};

const getallpaymentrecordsfromdb=async(id:string)=>{

    const paymentrecords = await prisma.payment.findMany({
    where:{
        rentalOrder:{
            userId: id,
        },
    },
});
 
return paymentrecords;

}

const getsinglepaymentfromdb=async(id:string)=>{
    const singlerecord = await prisma.payment.findUniqueOrThrow({
        where:{
            id,
        }
    })
    return singlerecord;
}



export const paymentService={
    createCheckoutSession,
    confirmPayment,
    getallpaymentrecordsfromdb,
    getsinglepaymentfromdb
}