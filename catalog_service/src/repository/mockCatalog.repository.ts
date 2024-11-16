import { ICatalogRepository } from "../interface/catalogReoisitory.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepositiry implements ICatalogRepository {
    create(data: Product): Promise<Product> {
        const mockPproduct = {
            id:123,
            ...data
        } as Product;

        return Promise.resolve(mockPproduct);
        // throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product);
        // throw new Error("Method not implemented.");
    }
    delete(id: any): Promise<any> {
        return Promise.resolve(id);
        // throw new Error("Method not implemented.");
    }
    find(limit:number, offset:number): Promise<Product[]> {
        return Promise.resolve([]);
        // throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Product> {
        return Promise.resolve({id} as unknown as Product);
        // throw new Error("Method not implemented.");
    }
    
}