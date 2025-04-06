import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { ProductFactory } from "../utils/fixtures";
import { NotFoundError } from "../utils";

export class CatalogRepository implements ICatalogRepository{

    _prisma:PrismaClient

    constructor(){
        this._prisma=new PrismaClient()
    }

     async create(data: Product): Promise<Product> {
        // const product=ProductFactory.build()
        // return Promise.resolve(product)
        // throw new Error("Method not implemented.");

        return this._prisma.product.create({
            data
        })
    }
    update(data: Product): Promise<Product> {
        // throw new Error("Method not implemented.");

        return this._prisma.product.update({
            where:{id: data.id},
            data
        })
    }
    async delete(id: any): Promise<Product> {
        // throw new Error("Method not implemented.")
        return this._prisma.product.delete({
            where: { id },
        });
        // return undefined;
    }

    find(limit: number,offset: number): Promise<Product[]> {
        return this._prisma.product.findMany({
            take:limit,
            skip:offset
        })
        // throw new Error("Method not implemented.");
    }
    async findOne(id: number): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where:{id}
        })

        // if(!product){
        //     throw new Error("Product not found");
        // }

        // return product;

        if(product){
            return Promise.resolve(product)
        }

        throw new NotFoundError("Product not found");
        
    }


    async findStock(ids:number[]):Promise<Product[]>{
        return this._prisma.product.findMany({
            where:{
                id:{
                    in:ids
                }
            }
        })
    }
    
}