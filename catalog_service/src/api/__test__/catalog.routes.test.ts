import request from 'supertest'
import express from 'express'
import {faker} from '@faker-js/faker'
import catalogRoutes,{catalogService} from '../catalog.routes'
import { ProductFactory } from '../../utils/fixtures'


const app=express()
app.use(express.json())
app.use(catalogRoutes)

const mockRequest=()=>{           
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(),
        stock: faker.number.int({min: 10,max: 100})
    }
}

describe('Catalog Routes',()=>{
    describe('POST /products',()=>{
        test('should create product',async()=>{
            const requesyBody=mockRequest()
            const product=ProductFactory.build()
            jest.spyOn(catalogService,'createProduct').mockImplementation(()=> Promise.resolve(product))

            const response=await request(app).post('/product').send(requesyBody).set("Accept","application/json")
            // console.log('TEST Response',response)
            expect(response.status).toBe(201)
            expect(response.body).toEqual(product)
        })



        test('should response with validation errors',async()=>{
            const requesyBody=mockRequest()
            // const product=ProducFactory.build()

            const response=await request(app).post('/product').send({...requesyBody,name: ""}).set("Accept","application/json")
            // console.log('TEST Response',response)
            expect(response.status).toBe(400)
            // console.log('TEST Response',response)
            expect(response.body).toEqual("name should not be empty")
        })


        test('should response with an internal server error code 500',async()=>{
            const requesyBody=mockRequest()
            // const product=ProducFactory.build()
            jest.spyOn(catalogService,'createProduct').mockImplementation(()=> Promise.reject(new Error("Unable to create product")))

            const response=await request(app).post('/product').send(requesyBody).set("Accept","application/json")
            // console.log('TEST Response',response.body)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("Unable to create product")
        })
    })


    describe('PATCH /products/:id',()=>{
        test('should update product successfully',async()=>{
            const product=ProductFactory.build()

            const requesyBody={
                name:product.name,
                price:product.price,
                stock: product.stock
            }

            jest.spyOn(catalogService,'updateProduct').mockImplementation(()=> Promise.resolve(product))

            const response=await request(app).patch(`/product/${product.id}`).send(requesyBody).set("Accept","application/json")
            console.log('TEST Response',response.status)
            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)
        })



        test('should response with validation errors',async()=>{
            const product=ProductFactory.build()

            const requesyBody={
                name:product.name,
                price:-1,
                stock: product.stock
            }

            const response=await request(app).patch(`/product/${product.id}`).send({...requesyBody}).set("Accept","application/json")
            // console.log('TEST Response',response)
            expect(response.status).toBe(400)
            // console.log('TEST Response',response)
            expect(response.body).toEqual("price must not be less than 1")
        })


        test('should response with an internal server error code 500',async()=>{
            const product=ProductFactory.build()

            const requesyBody=mockRequest()
            jest.spyOn(catalogService,'updateProduct').mockImplementation(()=> Promise.reject(new Error("Unable to update product")))

            const response=await request(app).patch(`/product/${product.id}`).send(requesyBody).set("Accept","application/json")
            // console.log('TEST Response',response.body)
            expect(response.status).toBe(500)
            expect(response.body).toEqual("Unable to update product")
        })
    })


    describe('GET /products?limit=0&offset=0',()=>{
        test('should return a range of product based on limit and offset',async()=>{
            const randomLimit=faker.number.int({min:10,max:50})
            const products=ProductFactory.buildList(randomLimit)

            jest.spyOn(catalogService,'getProducts').mockImplementation(()=> Promise.resolve(products))

            const response=await request(app).get(`/products?limit=${randomLimit}&offset=0`).set("Accept","application/json")
            console.log('TEST Response',response.status)
            expect(response.status).toBe(200)
            expect(response.body).toEqual(products)
        })



        // test('should response with validation errors',async()=>{
        //     const product=ProducFactory.build()

        //     const requesyBody={
        //         name:product.name,
        //         price:-1,
        //         stock: product.stock
        //     }

        //     const response=await request(app).patch(`/product/${product.id}`).send({...requesyBody}).set("Accept","application/json")
        //     // console.log('TEST Response',response)
        //     expect(response.status).toBe(400)
        //     // console.log('TEST Response',response)
        //     expect(response.body).toEqual("price must not be less than 1")
        // })


        // test('should response with an internal server error code 500',async()=>{
        //     const product=ProducFactory.build()

        //     const requesyBody=mockRequest()
        //     jest.spyOn(catalogService,'updateProduct').mockImplementation(()=> Promise.reject(new Error("Unable to update product")))

        //     const response=await request(app).patch(`/product/${product.id}`).send(requesyBody).set("Accept","application/json")
        //     // console.log('TEST Response',response.body)
        //     expect(response.status).toBe(500)
        //     expect(response.body).toEqual("Unable to update product")
        // })
    })



    describe('GET /product/:id',()=>{
        test('should return single product by id',async()=>{
            const product=ProductFactory.build()

            jest.spyOn(catalogService,'getProduct').mockImplementation(()=> Promise.resolve(product))

            const response=await request(app).get(`/product/${product.id}`).set("Accept","application/json")
            console.log('TEST Response',response.status)
            expect(response.status).toBe(200)
            expect(response.body).toEqual(product)
        })
    })


    describe('DELETE /product/:id',()=>{
        test('should delete product by id',async()=>{
            const product=ProductFactory.build()

            // jest.spyOn(catalogService,'deleteProduct').mockImplementation(()=> Promise.resolve(product.id))

            const response=await request(app).delete(`/product/${product.id}`).set("Accept","application/json")
            console.log('TEST Response',response.status)
            expect(response.status).toBe(200)
            expect(response.body.id).toEqual(product.id)
        })
    })


})