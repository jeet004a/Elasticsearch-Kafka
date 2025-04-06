import express, { NextFunction, Request, Response, urlencoded } from 'express'
import cors from 'cors'
// import cartRoutes from './routes/cart.routes'
// import orderRoutes from './routes/order.routes'
// import catalogRouter from './api/catalog.routes'
import { httpLogger,HandleErrorWithLogger } from './utils'
// import { MessageBroker } from './utils/broker'
import { Consumer, Producer } from 'kafkajs'
import { InitiallizeBroker } from './service/broker.service'
import paymentRoutes from './routes/payment.routes'


// const PORT=process.env.PORT || 4000

export const ExpressApp=async()=>{
    const app=express()
    app.use(cors())
    app.use(express.json())
    app.use(httpLogger)
    app.use(urlencoded({extended:true}))



    await InitiallizeBroker()
    // app.use(cartRoutes)
    // app.use(orderRoutes)
    app.use(paymentRoutes)

    // app.use('/',(req: Request, res: Response)=>{
    //     res.status(200).json({message:"I am healty"})
    // })



    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        HandleErrorWithLogger(err, req, res, next);
    });


    return app
}



// export default app;
