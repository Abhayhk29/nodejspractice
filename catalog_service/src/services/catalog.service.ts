import { ICatalogRepository } from "../interface/catalogReoisitory.interface";
import { OrderWithLineItems } from "../types/message.type";
import { AppEventListener } from "../utils/AppEventListener";

export class CatalogService {
    // private _repository = ICatalogRepository
    private _repositiry: ICatalogRepository
    constructor(repository: ICatalogRepository) {
        this._repositiry = repository;
    }


    async createProduct(input: any) {

        const data = await this._repositiry.create(input);
        if (!data.id) {
            throw new Error("unable to create product");
        }
        AppEventListener.instance.notify({
            event:"CreateProduct",
            data
        })
        return data;
    }

    async updateProduct(input: any) {
        const data = await this._repositiry.update(input);
        if (!data.id) {
            throw new Error("unable to update product");
        }
         AppEventListener.instance.notify({
            event:"updateProduct",
            data
        })
        // emit event to update record im elastic search
        return data;
    }

    // instead of this we will call from the elastic search
    async getProducts(limit: number, offset: number) {
        const products = await this._repositiry.find(limit, offset);

        return products;
    }

    async getProduct(id: number) {
        const product = await this._repositiry.findOne(id);
        return product;
    }

    async deleteProduct(id: number) {
        const response = await this._repositiry.delete(id);
         AppEventListener.instance.notify({
            event:"deleteProduct",
            data : {id}
        })
        // delete record from elasric search also
        return response;
    }

    async getProductStock(ids: number[]) {
        const products = await this._repositiry.findStock(ids);
        if (!products) {
            throw new Error("Unable to find the stock details")
        }
        return products;
    }

    async handleBrokerMessage(message: any) {
        const orderData = message.data as OrderWithLineItems;
        const { orderItems } = orderData;
        orderItems.forEach(async (item) => {
            const product = await this.getProduct(item.productId);
            if(!product){
                console.log("no product found for this product id")
            }else{
                const updatedStock = product.stock - item.qty;
                await this.updateProduct({...product, stock: updatedStock})
            }
            console.log("updating stock for the product", item.productId, item.qty)
        })
        console.log("------------------------------------------")
        console.log(message.data);
        console.log("------------------------------------------")
    }

}