import { CartLineItem } from "../db/schema"
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.do"
import { CartRepository } from "../repository/cart.respository"
import { CartRepositoryType } from "../repository/cart.respository"
import { logger, NotFoundError } from "../utils"
import { GetProductDetails } from "../utils/broker"

export const CreateCart=async(input: CartRequestInput,repo:CartRepositoryType)=>{

    const product=await GetProductDetails(input.productId)

    logger.info(product)

    if(product.stock<input.qty){
        throw new NotFoundError("Product is out of stock");
        
    }

    return await repo.createCart(input.customerId,{
        productId: product.id,
        price: product.price,
        qty: input.qty,
        itemName: product.name,
        variant: product.variant
    }as CartLineItem)
    // return product
}

// export const GetCart=async(input:any,repo:CartRepositoryType)=>{
//     const data=await repo.find(input)
//     return data
// }

export const GetCart=async(id:number,repo:CartRepositoryType)=>{
    const data=await repo.findCart(id)
    if(!data){
        throw new NotFoundError("Cart Not dound");    
    }

    return data
}


export const EditCart=async(input:CartEditRequestInput,repo:CartRepositoryType)=>{
    const data=await repo.updateCart(input.id,input.qty)
    return data
}

export const DeleteCart=async(id:number,repo:CartRepositoryType)=>{
    const data=await repo.deleteCart(id)
    return data
}