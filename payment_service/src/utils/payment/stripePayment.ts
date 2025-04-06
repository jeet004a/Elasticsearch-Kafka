import { PaymentGateway } from "./payment.type";
import Stripe from "stripe"

const createPayment=async (amount: number, metadata: { orderId: number; userId: number; }): 
Promise<{ secret: string; pubKey: string; amount: number; }>=> {
    throw new Error("Function not implemented.");
}

const getPayment=async  (paymentId: string): Promise<Record<string, unknown>>=>{
    throw new Error("Function not implemented.");
}


export const StripePayment:PaymentGateway={
    createPayment,
    getPayment
}