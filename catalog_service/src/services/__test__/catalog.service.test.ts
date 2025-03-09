import { ICatalogRepository } from "../../interface/catalogRepository.interface"
import { Product } from "../../models/product.model"
import { CatalogRepository } from "../../repository/catalog.repository"
import { MockCatalogRepository } from "../../repository/mockCatalogrepository"
import { CatalogService } from "../catalog.service"
import {faker} from '@faker-js/faker'
import { Factory } from "rosie"
import { ProductFactory } from "../../utils/fixtures"

// const ProductFactory=new Factory<Product>()
// .attr("id", faker.number.int({min: 1,max: 1000}))
// .attr("name",faker.commerce.productName())
// .attr("description",faker.commerce.productDescription())
// .attr("price",+faker.commerce.price())
// .attr("stock",faker.number.int({min: 10,max: 100}))

const mockProduct={           
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    stock: faker.number.int({min: 10,max: 100})
}

describe('catalogService',()=>{
    let repository: ICatalogRepository


    beforeEach(()=>{
        repository=new MockCatalogRepository
    })
    afterEach(()=>{
        repository={} as MockCatalogRepository
    })


    describe('create product',()=>{
        test('should create product',async()=>{
            const service=new CatalogService(repository)
            const mockData=mockProduct
            const result=await service.createProduct(mockData)
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description:expect.any(String),
                price: expect.any(Number),
                stock:expect.any(Number)
            })
        }),
        test("should throw error with unable to create product",async()=>{
            const service=new CatalogService(repository)
            const mockData=mockProduct

            jest
            .spyOn(repository, "create")
            .mockImplementationOnce(() => Promise.resolve({} as Product));
            await expect(service.createProduct(mockData)).rejects.toThrow('Unable to create product') 
        })
        test("should throw error with product already exists",async()=>{
            const service=new CatalogService(repository)
            const mockData=mockProduct

            jest
            .spyOn(repository, "create")
            .mockImplementationOnce(() => Promise.reject(new Error('product already exists')));
            await expect(service.createProduct(mockData)).rejects.toThrow('product already exists') 
        })
    })


    describe('update product',()=>{
        test('should update product',async()=>{
            const service=new CatalogService(repository)
            const mockData={
                // ...mockProduct,
                price: +faker.commerce.price(),
                id: faker.number.int({min:10,max:1000}),
            }
            
            const result=await service.updateProduct(mockData)

            expect(result).toMatchObject(mockData)

        })

        test("should throw error with product does not exist",async()=>{
            const service=new CatalogService(repository)
            const mockData=mockProduct

            jest
            .spyOn(repository, "update")
            .mockImplementationOnce(() => Promise.reject(new Error('product does not exist')));
            await expect(service.updateProduct({})).rejects.toThrow('product does not exist') 
        })
    })


    describe('getProducts',()=>{
        
        test('should get product by offset and limit',async()=>{
            const service=new CatalogService(repository)
            const randomLimit=faker.number.int({min:10,max:50})
            const products=ProductFactory.buildList(randomLimit)
            jest.spyOn(repository,'find').mockImplementationOnce(()=>Promise.resolve(products))
            const result=await service.getProducts(randomLimit,0)
            expect(result.length).toEqual(randomLimit)
            expect(result).toMatchObject(products)
        })

        test("should throw error with product does not exists",async()=>{
            const service=new CatalogService(repository)
            const mockData=mockProduct

            jest
            .spyOn(repository, "find")
            .mockImplementationOnce(() => Promise.reject(new Error('products does not exists')));
            await expect(service.getProducts(0,0)).rejects.toThrow('products does not exists') 
        })
    })


    describe('getProduct',()=>{
        
        test('should get product by id',async()=>{
            const service=new CatalogService(repository)
            // const randomLimit=faker.number.int({min:10,max:50})
            const product=ProductFactory.build()
            jest.spyOn(repository,'findOne').mockImplementationOnce(()=>Promise.resolve(product))
            const result=await service.getProduct(product.id!)
            expect(result).toMatchObject(product)
        })
    })


    describe('deleteProduct',()=>{
        
        test('should delete product by id',async()=>{
            const service=new CatalogService(repository)
            // const randomLimit=faker.number.int({min:10,max:50})
            let  product=ProductFactory.build()
            // console.log(product.id)

            // jest
            // .spyOn(repository, "delete")
            // .mockImplementationOnce(() => Promise.resolve({id: product.id}));

            const result=await service.deleteProduct(product.id!)
            expect(result).toEqual(product.id)
        })
    })
})