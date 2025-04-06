import { CartLineItem } from "../db/schema"
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.dto"
import { CartRepository } from "../repository/cart.respository"
import { CartRepositoryType } from "../repository/cart.respository"
import { AuthorizeError, logger, NotFoundError } from "../utils"
import { GetProductDetails, GetStockDetails } from "../utils/broker"

export const CreateCart=async(input: CartRequestInput & {customerId:number} ,repo:CartRepositoryType)=>{

    const product=await GetProductDetails(input.productId)

    logger.info(product)

    if(product.stock<input.qty){
        throw new NotFoundError("Product is out of stock");   
    }

    // console.log('a')
    const lineItem=await repo.findCartByProductId(input.customerId,input.productId)
    // console.log('b')

    if(lineItem){
        return repo.updateCart(lineItem.id,lineItem.qty+input.qty)
    }
    // console.log('c',input.customerId)

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

    //get customer cart data
    const cart=await repo.findCart(id)
    if(!cart){
        throw new NotFoundError("Cart not exists");    
    }

    // list out all the line items in the cart

    const lineItems=cart.lineItems

    if(!lineItems.length){
        throw new NotFoundError("Cart items not found");
        
    }

    //verify the inventory service that if the product is still available

    const stockDetails=await GetStockDetails(
        lineItems.map((items)=>items.productId)
    )

    if(Array.isArray(stockDetails)){
        lineItems.forEach((lineItem)=>{
            let stock=stockDetails.find((stock)=>stock.id===lineItem.productId)

            if(stock){
                lineItem.availability=stock.stock
            }
        })
        //Update the cart line items
        cart.lineItems=lineItems
    }

    // return updated cart data with the lastest stock availability

    return cart
}


const AuthorizedCart=async(
    lineItemId:number,
    customerId:number,
    repo: CartRepositoryType
)=>{
    const cart=await repo.findCart(customerId)

    console.log(customerId,cart)

    // if(!cart){
    //     throw new NotFoundError("cart does not exists");
    // }

    // const lineItem=await cart.lineItems.find((item)=> item.id===lineItemId)

    // if(!lineItem){
    //     throw new AuthorizeError("Your are not authorized to edit this cart");
    // }

    // return lineItem
}

export const EditCart=async(input:CartEditRequestInput & {customerId:number},repo:CartRepositoryType)=>{
    // await AuthorizedCart(input.id,input.customerId,repo) // Comment because it a user having more than one cart items in that case it will fail
    // console.log('aaa',input.id)
    const data=await repo.updateCart(input.id,input.qty)
    return data
}

export const DeleteCart=async(input:{
    id:number,
    customerId:number
},repo:CartRepositoryType)=>{
    await AuthorizedCart(input.id,input.customerId,repo)
    const data=await repo.deleteCart(input.id)
    return data
}