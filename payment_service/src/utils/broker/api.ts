import axios from "axios"
import { APIError, AuthorizeError, NotFoundError } from "../error"
import { logger } from "../logger"

import { User } from "../../dto/user.model"
import { InProcessOrder } from "../../dto/order.model"

const ORDER_SERVICE_BASE_URL=process.env.CATALOG_BASE_URL||'http://localhost:5000'

const AUTH_SERVICE_BASE_URL=process.env.AUTH_SERVICE_BASE_URL ||'http://localhost:9000'

export const GetOrderDetails=async(orderNumber: number)=>{
    try {
        // console.log(productId)
        const response=await axios.get(`${ORDER_SERVICE_BASE_URL}/orders/${orderNumber}/checkout`)
        if(!response){
            throw new APIError("Product Not found");
        }
        // console.log('data',response.data)
        const product=response.data
        return product as InProcessOrder
    } catch (error) {
        logger.error(error)  
        throw new NotFoundError("Product Not found");
        
    }

    // return {
    //     stock:10,
    //     price: 100
    // }
}







export const ValidateUser=async(token:string)=>{
    try {
        // console.log('Hello')
        // axios.defaults.headers.common['Authorization']=token
        const response=await axios.get(`${AUTH_SERVICE_BASE_URL}/user/validate`,{
            headers:{
                Authorization: token
            }
        })
        // console.log('Response',response)
        if(response.status!==200){
            throw new AuthorizeError("User Not authorized");
            
        }

        return response.data as User
    } catch (error) {
        throw new AuthorizeError("User Not authorized");
        
    }
}



