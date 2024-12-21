import { ICatalogRepository } from "../interface/catalogReoisitory.interface";

export class CatalogService {
    // private _repository = ICatalogRepository
    private _repositiry : ICatalogRepository
    constructor(repository: ICatalogRepository){
        this._repositiry = repository;
    }


    async createProduct(input:any){

        const data = await this._repositiry.create(input);
        if(!data.id){
            throw new Error("unable to create product");
        }
        return data;
    }

    async updateProduct(input:any){
        const data = await this._repositiry.update(input);
        if(!data.id){
            throw new Error("unable to update product");
        }
        // emit event to update record im elastic search
        return data;
    }

    // instead of this we will call from the elastic search
    async getProducts(limit: number, offset: number){
        const products = await this._repositiry.find(limit, offset);

        return products;
    }

    async getProduct(id:number){
        const product = await this._repositiry.findOne(id);
        return product;
    }

    async deleteProduct(id:number){
        const response = await this._repositiry.delete(id);
        // delete record from elasric search also
        return response;
    }

    async getProductStock(ids: number[]){
        const products = await this._repositiry.findStock(ids);
        if(!products){
            throw new Error("Unable to find the stock details")
        }
        return products;
    }

    async handleBrokerMessage(data:any){
        
    }

}