import { NextFunction, Request, Response } from "express"

const express=require('express')


const router=express.Router()


router.post('/order',(req: Request,res: Response, next: NextFunction)=>{
    return res.status(200).json({"message": "Cart is created"})
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

