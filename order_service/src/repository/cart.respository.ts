import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CartRepositoryTypes } from "../types/repository.types";


const CreateCart=async (input: any):Promise<{}>=>{
    //DB Connection
    const result=await DB.insert(carts).values({
        customerId: 123
    }).returning({cartId: carts.id})

    console.log('Cart id',result)
    // return Promise.resolve({})
    return Promise.resolve({
        message: "Fake response",
        input
    })
}

const UpdateCart=async (input: any):Promise<{}>=>{
    return Promise.resolve({})
}

const FindCart=async (input: any):Promise<{}>=>{
    return Promise.resolve({})
}

const DeleteCart=async (input: any):Promise<{}>=>{
    return Promise.resolve({})
}


export const CartRepository: CartRepositoryTypes={
    create: CreateCart,
    update: UpdateCart,
    find:FindCart,
    delete: DeleteCart
}