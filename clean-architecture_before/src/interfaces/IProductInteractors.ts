import { Product } from "../entities/Product";

export interface IProductInteractor {
    createProduct(input: any) : Promise<Product>;
    updateStock(id: number, stock: number) : Promise<Product>;
    getProducts(limit: number, offset: number): Promise<Product[]> ;
  }