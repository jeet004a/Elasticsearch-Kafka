import { NextFunction, Request, Response } from "express"
import { MessageBroker } from "../utils/broker"
import { OrderEvent } from "../types"

const express=require('express')


const router=express.Router()


router.post('/order',async (req: Request,res: Response, next: NextFunction)=>{
    await MessageBroker.publish({
        topic: "OrderEvents",
        headers: {token:req.headers.authorization},
        event: OrderEvent.CREATE_ORDER,
        message:{
            orderId:1,
            items:[
                {
                    productId:1,
                    quantity:1
                },
                {
                    productId:2,
                    quantity:2
                }
            ]
        }
    })

    return res.status(200).json({"message": "Order is created"})
})

router.get('/order',(req: Request,res: Response, next: NextFunction)=>{
    return res.status(200).json({"message": "Cart is created"})
})

router.get('/order/:id',(req: Request,res: Response, next: NextFunction)=>{
    return res.status(200).json({"message": "Cart is created"})
})


router.delete('/order/:id',(req: Request,res: Response, next: NextFunction)=>{
    return res.status(200).json({"message": "Cart is created"})
})


export default router

