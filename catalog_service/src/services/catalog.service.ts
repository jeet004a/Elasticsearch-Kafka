import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { OrderWithLineItems } from "../types/message.types";

export class CatalogService{

    private _repository: ICatalogRepository;

    constructor(repository: ICatalogRepository){
        this._repository = repository;
    }

    async createProduct(input: any){
        const data=await this._repository.create(input)

        if(!data.id){
            throw new Error('Unable to create product')
        }
        return data
    }

    async updateProduct(input: any){
        const data=await this._repository.update(input)
        if(!data.id){
            throw new Error('Unable to update product')
        }
        return data
    }

    async getProducts(limit: number, offset: number){
        const product=await this._repository.find(limit,offset)
        return product
    }

    async getProduct(id: number){
        const product=await this._repository.findOne(id)
        return product
    }


    async deleteProduct(id: number){
        const reponse=await this._repository.delete(id)
        return reponse
    }


    async getProductStock(ids:number[]){
        const products=await this._repository.findStock(ids)
        if(!products){
            throw new Error("Unable to find product stocks");
            
        }
        return products
    }

    async handleBrokerMessage(message:any){
        // console.log('Catalog Service received from message',message)
        // console.log('Hello')
        const orderData=message.data as OrderWithLineItems

        const {orderItems}=orderData
        orderItems.forEach(async (item)=>{
            // console.log("Updating stocks for product",item.productId,item.qty)
            const product=await this.getProduct(item.productId)

            if(!product){
                console.log("Product not found during stock update for create order",item.productId)
            }else{
                const updateStock=product.stock-item.qty
                await this.updateProduct({...product,stock:updateStock})
            }
        })

    }

}