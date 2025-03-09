import { CartRepository } from "../repository/cart.respository"
import { CartRepositoryTypes } from "../types/repository.types"

export const CreateCart=async(input: any,repo:CartRepositoryTypes)=>{
    const data=await repo.create(input)
    return data
}

export const GetCart=async(input:any,repo:CartRepositoryTypes)=>{
    const data=await repo.find(input)
    return data
}

export const EditCart=async(input:any,repo:CartRepositoryTypes)=>{
    const data=await repo.update(input)
    return data
}

export const DeleteCart=async(input:any,repo:CartRepositoryTypes)=>{
    const data=await repo.delete(input)
    return data
}