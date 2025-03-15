import { NextFunction, Request, Response } from "express"
import * as service from '../service/cart.service'
import * as repository from '../repository/cart.respository'
import { ValidateRequest } from "../utils/validator"
import { CartRequestInput, CartRequestScehma } from "../dto/cartRequest.do"
const express=require('express')
const repo=repository.CartRepository

const router=express.Router()


router.post('/cart',async(req: Request,res: Response, next: NextFunction)=>{
    try {
        const error=ValidateRequest<CartRequestInput>(
            req.body,
            CartRequestScehma
        )

        if(error){
            return res.status(400).json({error}) 
        }
        
        const response=await service.CreateCart(req.body,repo)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({error})
    }
})

router.get('/cart',async(req: Request,res: Response, next: NextFunction)=>{
    const response=await service.GetCart(req.body.customerId,repo)
    return res.status(200).json(response)
})


router.patch('/cart/:id',async(req: Request,res: Response, next: NextFunction)=>{
    let pId=req.params.id
    const response=await service.EditCart({
        id: +pId,
        qty:req.body.qty
    },repo)
    return res.status(200).json(response)
})

router.delete('/cart/:id',async(req: Request,res: Response, next: NextFunction)=>{
    let pId=req.params.id
    const response=await service.DeleteCart(+pId,repo)
    return res.status(200).json(response)
})



export default router