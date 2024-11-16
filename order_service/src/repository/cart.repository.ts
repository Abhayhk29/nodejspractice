import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CartRepositoryType } from "../types/repository.types";

const createCart = async (input: any): Promise<{}> => {
    // connection to db
    const result = await DB.insert(carts).values({
        customerId:123,
    }).returning({cartId: carts.id})

    console.log(result);
    
    // operation 
    return Promise.resolve({ message: "fake resposne from data cart", input })
}
const updateCart = async (input: any): Promise<{}> => {
    return Promise.resolve({})
}
const findCart = async (input: any): Promise<{}> => {
    return Promise.resolve({})
}
const deleteCart = async (input: any): Promise<{}> => {
    return Promise.resolve({})
}


export const CartRepository: CartRepositoryType = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart
}