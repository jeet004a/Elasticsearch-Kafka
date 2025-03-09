import { CartRepositoryTypes } from "../types/repository.types"
import * as Repository from '../repository/cart.respository'
import { CreateCart } from "./cart.service"
// import { afterEach } from "node:test"

describe('cartService',()=>{
    let repo:CartRepositoryTypes
    beforeEach(()=>{
        repo=Repository.CartRepository
    })

    afterEach(()=>{
        repo={} as CartRepositoryTypes
    })

    test('should return mock data',async()=>{
        const mockData={
            title: "ABC",
            amount: 2000
        }

        jest.spyOn(Repository.CartRepository,'create').mockImplementationOnce(()=>
            Promise.resolve({
                "message": "Fake response",
                input:mockData
            })
        )

        const response=await CreateCart(mockData,repo)
        expect(response).toEqual({
            "message": "Fake response",
            input:mockData
        })
    })
})