import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogReoisitory.interface";
import { Product } from "../models/product.model";
import { ProductFactory } from "../utils";


export class CatalogRepository implements ICatalogRepository {
    _prisma: PrismaClient
    constructor(){
        this._prisma = new PrismaClient()
    }
    async create(data: Product): Promise<Product> {
        return this._prisma.product.create({
            data
        })
        const product = ProductFactory.build();
        return Promise.resolve(product);
        // throw new Error("Method not implemented.");
    }
    async update(data: Product): Promise<Product> {
        return this._prisma.product.update({
            where: {id: data.id},
            data,
        })
        // const product = ProductFactory.build();
        // return Promise.resolve(product);
    }
    async delete(id: any) {
        return this._prisma.product.delete({
            where: {id:id}
        })
        // const product = ProductFactory.build();
        // return Promise.resolve(product);
    }
    async find(limit:number, offset:number):Promise<Product[]> {
        return this._prisma.product.findMany({
            take: limit,
            skip: offset
        })
        // const product = ProductFactory.buildList(limit);
        // return Promise.resolve(product);
    }
    async  findOne(id: number): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where: {id:id}
        })

        if(product){
            return Promise.resolve(product);
        }

        throw new Error('Product not found');
        // const product = ProductFactory.build();
        // return Promise.resolve(product);
    }
    
    
}