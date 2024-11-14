import { CartRepositoryType } from "../types/repository.types";

const createCart = async (input: any): Promise<{}> => {
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