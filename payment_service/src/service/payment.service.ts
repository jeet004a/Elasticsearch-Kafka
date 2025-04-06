import { GetOrderDetails } from "../utils/broker/api"
import { PaymentGateway } from "../utils";

export const CreatePayment=async(userId:number,orderId:number,paymentGateway:PaymentGateway)=>{
    //Get the order details from the order service

    const order=await GetOrderDetails(userId)
    
    if(order.customerId!==userId){
        throw new Error("User not authorized to create payment");
        
    }

    //create a new payment

    //call payment gateway to create payment

    //return payment secrets
     return {
        secret:"my super secrect",
        pubKey: "my sup pub key",
        amount: 100
     }
}

export const VerifyPayment=async(paymentId:string,paymentGateway:PaymentGateway)=>{
    //call payment gateway to verify payment

    // update order status through message broker

    //return payment status <= not nacecessary  just for response to frontend
}