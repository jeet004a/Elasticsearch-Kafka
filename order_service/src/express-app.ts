import express, { NextFunction, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import cartRoutes from './routes/cart.routes'
import orderRoutes from './routes/order.routes'
// import catalogRouter from './api/catalog.routes'

// const PORT=process.env.PORT || 4000

const app=express()
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))

app.use(cartRoutes)
app.use(orderRoutes)

app.use('/',(req: Request, res: Response)=>{
    res.status(200).json({message:"I am healty"})
})





export default app;
