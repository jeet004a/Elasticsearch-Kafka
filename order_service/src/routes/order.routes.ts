import { NextFunction, Request, Response } from "express"
import { MessageBroker } from "../utils/broker"
import { OrderEvent, OrderStatus } from "../types"
import * as service from '../service/order.service'
import { OrderRepository } from "../repository/order.repository"
import { CartRepository } from "../repository/cart.respository"
import { RequestAuthorizer } from "./middleware"
const express=require('express')


const router=express.Router()

const repo=OrderRepository
const cartRepo=CartRepository


router.post('/order',RequestAuthorizer,async (req: Request,res: Response, next: NextFunction)=>{
    // await MessageBroker.publish({
    //     topic: "OrderEvents",
    //     headers: {token:req.headers.authorization},
    //     event: OrderEvent.CREATE_ORDER,
    //     message:{
    //         orderId:1,
    //         items:[
    //             {
    //                 productId:1,
    //                 quantity:1
    //             },
    //             {
    //                 productId:2,
    //                 quantity:2
    //             }
    //         ]
    //     }
    // })

    const user1=req.user
    const {user}:any=user1
    console.log(user1)
    if(!user){
        next(new Error('User Not Found'))
        return 
    }

    const response=await service.CreateOrder(user.id,repo,cartRepo)
    // console.log
    return res.status(200).json(response)

    // return res.status(200).json({"message":"hello"})
})

router.get('/orders',RequestAuthorizer,async(req: Request,res: Response, next: NextFunction)=>{
    const user1=req.user
    const {user}:any=user1

    // console.log(user)
    if(!user){
        next(new Error('User Not Found'))
        return 
    }
    const response=await service.GetOrders(user.id,repo)
    return res.status(200).json(response)
    // return res.status(200).json("response")
})

router.get('/order/:id',async(req: Request,res: Response, next: NextFunction)=>{
    const user1=req.user
    const {user}:any=user1

    if(!user){
        next(new Error('User Not Found'))
        return 
    }
    const response=await service.GetOrder(user.id,repo)
    return res.status(200).json(response)
})


//Only going to call microservice
router.patch('/order/:id',async(req: Request,res: Response, next: NextFunction)=>{
    const user1=req.user
    const {user}:any=user1

    if(!user){
        next(new Error('User Not Found'))
        return 
    }
    const orderId=parseInt(req.params.id)
    const status=req.body.status as OrderStatus
    const response=await service.UpdateOrder(orderId,status,repo)
    return res.status(200).json(response)
})


//Only going to call microservice
router.delete('/order/:id',async(req: Request,res: Response, next: NextFunction)=>{
    const user1=req.user
    const {user}:any=user1

    if(!user){
        next(new Error('User Not Found'))
        return 
    }

    const orderId=+req.params.id

    const response=await service.DeleteOrder(orderId,repo)
    return res.status(200).json(response)
})


router.get('/orders/:id/checkout',async(req: Request,res: Response, next: NextFunction)=>{
    const orderId=parseInt(req.params.id)
    const response=await service.CheckoutOrder(orderId,repo)
    return response
})


export default router

