import { NextFunction, Request, Response } from "express"
import * as service from '../service/cart.service'
import * as repository from '../repository/cart.respository'
const express=require('express')
const repo=repository.CartRepository

const router=express.Router()


router.post('/cart',async(req: Request,res: Response, next: NextFunction)=>{
    const response=await service.CreateCart(req.body,repo)
    return res.status(200).json(response)
})

router.get('/cart',async(req: Request,res: Response, next: NextFunction)=>{
    const response=await service.GetCart(req.body,repo)
    return res.status(200).json(response)
})


router.patch('/cart',async(req: Request,res: Response, next: NextFunction)=>{
    const response=await service.EditCart(req.body,repo)
    return res.status(200).json({"message": "Cart is created"})
})

router.delete('/cart',async(req: Request,res: Response, next: NextFunction)=>{
    const response=await service.DeleteCart(req.body,repo)
    return res.status(200).json({"message": "Cart is created"})
})



export default router