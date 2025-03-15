import express, { NextFunction, Request, Response, urlencoded } from 'express'
import catalogRouter from './api/catalog.routes'
import { HandleErrorWithLogger,httpLogger } from './utils'
import cors from 'cors'

const PORT=process.env.PORT || 3000

const app=express()

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors())

app.use(httpLogger)
app.use('/',catalogRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	HandleErrorWithLogger(err, req, res, next);
});


// export default app;
// function cors(): any {
// 	throw new Error('Function not implemented.')
// }

export default app