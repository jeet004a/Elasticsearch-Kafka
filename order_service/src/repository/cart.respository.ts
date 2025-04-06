import { DB } from "../db/db.connection";
import { Cart, CartLineItem, cartLineItems, carts } from "../db/schema";
// import { CartRepositoryTypes } from "../types/repository.types";
import {eq} from 'drizzle-orm'
import { NotFoundError } from "../utils";
import { CartWithLineItems } from "../dto/cartRequest.dto";

// import { CartRepositoryTypes } from "../types/repository.types";
export type CartRepositoryType={
    createCart: (customerId: number,lineItem:CartLineItem)=>Promise<number>,
    findCart: (id:number)=>Promise<CartWithLineItems>,
    updateCart: (id:number,qty:number)=>Promise<CartLineItem>,
    deleteCart:(id:number)=>Promise<Boolean>,
    clearCartData:(id:number)=>Promise<Boolean>,
    findCartByProductId:(customerId:number,productId:number)=>Promise<CartLineItem>
}


const createCart=async(
    customerId:number,
    {itemName,price,productId,qty,variant}:CartLineItem
):Promise<number>=>{

    console.log('B',customerId)
    const result=await DB.insert(carts).values({customerId:customerId}).returning().onConflictDoUpdate({
        target:carts.customerId,
        set:{updatedAt:new Date()}
    })

    const [{id}]=result


    if(id>0){
        await DB.insert(cartLineItems).values({
            cartId: id,
            productId:productId,
            itemName:itemName,
            price:price,
            qty:qty,
            variant:variant
        })
    }

    return id
}


const findCart=async(id:number):Promise<CartWithLineItems>=>{
    const  cart=await DB.query.carts.findFirst({
        where:(carts,{eq})=>eq(carts.customerId,id),
        with:{
            lineItems:true
        }
    })

    if(!cart){
        throw new NotFoundError("cart not found");
    }

    return cart
}



const updateCart=async(id: number,qty:number):Promise<any>=>{
    const [CartLineItem]=await DB.update(cartLineItems).set({
        qty:qty
    }).where(eq(cartLineItems.id,id)).returning()

    // console.log('xxx',)

    return CartLineItem

//   return cartLineItem;
}

const deleteCart=async(id: number):Promise<Boolean>=>{
    await DB.delete(cartLineItems).where(eq(cartLineItems.id,id)).returning()
    return true
}


const clearCartData=async(id:number):Promise<Boolean>=>{
    await DB.delete(carts).where(eq(carts.customerId,id)).returning()
    return true
}

const findCartByProductId=async(customerId:number,productId:number):Promise<CartLineItem>=>{
    const cart=await DB.query.carts.findFirst({
        where: (carts,{eq})=>eq(carts.customerId,customerId),
        with:{
            lineItems: true
        }
    })

    let lineItems=cart?.lineItems.find((item)=>item.productId===productId)

    return lineItems as CartLineItem
}

export const CartRepository: CartRepositoryType = {
    createCart,
    findCart,
    updateCart,
    deleteCart,
    clearCartData,
    findCartByProductId,
  };












// const CreateCart=async (input: any):Promise<{}>=>{
//     //DB Connection
//     const result=await DB.insert(carts).values({
//         customerId: 123
//     }).returning({cartId: carts.id})

//     console.log('Cart id',result)
//     // return Promise.resolve({})
//     return Promise.resolve({
//         message: "Fake response",
//         input
//     })
// }

// const UpdateCart=async (input: any):Promise<{}>=>{
//     return Promise.resolve({})
// }

// const FindCart=async (input: any):Promise<{}>=>{
//     return Promise.resolve({})
// }

// const DeleteCart=async (input: any):Promise<{}>=>{
//     return Promise.resolve({})
// }


