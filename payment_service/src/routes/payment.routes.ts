import express, { Request,NextFunction, Response } from "express"
import { RequestAuthorizer } from "./middleware"
import * as service from '../service/payment.service'
import { PaymentGateway, StripePayment } from "../utils"



const router=express.Router()
const paymentGateway : PaymentGateway=StripePayment

router.post("/create-payment",RequestAuthorizer,async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    const user1=req.user
    const {user}:any=user1

    if(!user){
        next(new Error("User not found"))
        return
    }
    try {
        const {orderNumber}=req.body
        const response=await service.CreatePayment(user.id,orderNumber,paymentGateway)



        return res.status(200).json({message:"Payment successfull",data:response})
    } catch (error) {
        next(error)
    }
})

router.get("/verify-payment/:id",RequestAuthorizer,async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    const user1=req.user
    const {user}:any=user1

    if(!user){
        next(new Error("User not found"))
        return
    }
    try {

        const paymentId=req.params.id
        if(!paymentId){
            next(new Error("Payment id is not found"))
            return
        }
        await service.VerifyPayment(paymentId,paymentGateway)
        return res.status(200).json({message:"Payment verrification completed"})
    } catch (error) {
        next(error)
    }
})

export default router

