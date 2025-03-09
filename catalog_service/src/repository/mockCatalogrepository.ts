import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository  implements ICatalogRepository{
    create(data: Product): Promise<Product> {
        const mockProduct={
            ...data,
            id:123,
        } as Product
        return Promise.resolve(mockProduct)

    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product)
    }
    delete(id: any) {
        return Promise.resolve(id);
      }
    find(): Promise<Product[]> {
        return Promise.resolve([])
    }
    findOne(id: number): Promise<Product> {
        return Promise.resolve({} as unknown as  Product)
    }
    
}
