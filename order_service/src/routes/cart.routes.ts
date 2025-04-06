import { NextFunction, Request, Response } from "express"
import * as service from '../service/cart.service'
import * as repository from '../repository/cart.respository'
import { ValidateRequest } from "../utils/validator"
import { CartRequestInput, CartRequestScehma } from "../dto/cartRequest.dto"
import { RequestAuthorizer } from "./middleware"
const express=require('express')
const repo=repository.CartRepository

const router=express.Router()


router.post('/cart',RequestAuthorizer,async(req: Request,res: Response, next: NextFunction)=>{
    try {

        const user1=req.user
        const {user}:any=user1
        if(!user){
            next(new Error('User Not Found'))
            return 
        }
        const error=ValidateRequest<CartRequestInput>(
            req.body,
            CartRequestScehma
        )

        if(error){
            return res.status(400).json({error}) 
        }
        
        const input: CartRequestInput=req.body
        // console.log(user)
        const response=await service.CreateCart({
            ...input,
            customerId:user.id
        },repo)

        // console.log('abc',response)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({error})
    }
})

router.get('/cart',RequestAuthorizer,async(req: Request,res: Response, next: NextFunction)=>{
    try {
        const user1=req.user
        const {user}:any=user1

        if(!user){
            next(new Error('User Not Found'))
            return 
        }
        console.log(user.id)
        const response=await service.GetCart(user.id,repo)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({error})
    }
})


router.patch('/cart/:id',RequestAuthorizer,async(req: Request,res: Response, next: NextFunction)=>{
    try {

        const user1=req.user
        const {user}:any=user1

        if(!user){
            next(new Error('User Not Found'))
            return 
        }
        let pId=req.params.id
        // console.log(user.id)
        const response=await service.EditCart({
            id: +pId,
            qty:req.body.qty,
            customerId: user.id
        },repo)
        return res.status(200).json(response)





        // await service.EditCart({
        //         id: +pId,
        //         qty:req.body.qty,
        //         customerId: user.id
        //     },repo)
        // return res.status(200).json("Hello")
    } catch (error) {
        next(error)
    }
})

router.delete('/cart/:id',RequestAuthorizer,async(req: Request,res: Response, next: NextFunction)=>{
    try {
        const user=req.user

        if(!user){
            next(new Error('User Not Found'))
            return 
        }
        let pId=req.params.id
        const response=await service.DeleteCart({id:+pId,customerId: user.id},repo)
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})



export default router