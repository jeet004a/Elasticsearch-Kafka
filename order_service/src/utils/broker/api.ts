import axios from "axios"
import { APIError, NotFoundError } from "../error"
import { logger } from "../logger"
import { Product } from "../../dto/product.dto"

const CATALOG_BASE_URL=process.env.CATALOG_BASE_URL||'http://localhost:3000'

export const GetProductDetails=async(productId: number)=>{
    try {
        // console.log(productId)
        const response=await axios.get(`${CATALOG_BASE_URL}/product/${productId}`)
        if(!response){
            throw new APIError("Product Not found");
        }
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