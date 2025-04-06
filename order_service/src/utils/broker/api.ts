import axios from "axios"
import { APIError, AuthorizeError, NotFoundError } from "../error"
import { logger } from "../logger"
import { Product } from "../../dto/product.dto"
import { Validate } from "class-validator"
import { User } from "../../dto/user.model"

const CATALOG_BASE_URL=process.env.CATALOG_BASE_URL||'http://localhost:3000'

const AUTH_SERVICE_BASE_URL=process.env.AUTH_SERVICE_BASE_URL ||'http://localhost:9000'

export const GetProductDetails=async(productId: number)=>{
    try {
        // console.log(productId)
        const response=await axios.get(`${CATALOG_BASE_URL}/product/${productId}`)
        if(!response){
            throw new APIError("Product Not found");
        }
        // console.log('data',response.data)
        const product=response.data
        return product as Product
    } catch (error) {
        logger.error(error)  
        throw new NotFoundError("Product Not found");
        
    }

    // return {
    //     stock:10,
    //     price: 100
    // }
}




export const GetStockDetails=async(ids:number[])=>{
    try {
        const response=await axios.post(`${CATALOG_BASE_URL}/product/stock`,{
            ids
        })

        return response.data as Product[]
    } catch (error) {
        logger.error(error)
        throw new NotFoundError(' Error on getting stock details');
        
    }
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



