import express, { NextFunction, Request, Response } from "express";

import { PORT } from "./config";
import userRouter from './routes/user.routes'

const app=express()
app.use(express.json())
// app.use()

// app.get('/',(req: Request,res: Response,next: NextFunction): any=>{
//     return res.status(200).json({"message":"hello"})
// })

app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`)
})