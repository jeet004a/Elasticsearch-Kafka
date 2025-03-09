import express, { urlencoded } from 'express'
import catalogRouter from './api/catalog.routes'

const PORT=process.env.PORT || 3000

const app=express()

app.use(express.json())
app.use(urlencoded({extended:true}))

app.use('/',catalogRouter)





export default app;
