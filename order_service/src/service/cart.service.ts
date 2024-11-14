import { CartRepositoryType } from "../types/repository.types";

export const CreateCart = async (input : any, repo: CartRepositoryType) => {
    const data = await repo.create(input);
    return data;
    // return {message : "created cart from service"};
}

export const GetCart = async (input : any, repo: CartRepositoryType) => {
    const data = await repo.find(input);
    return data;
    // return {message : "GET cart from service"};
}

export const EditCart = async (input : any, repo: CartRepositoryType) => {
    const data = await repo.update(input);
    return data;
    // return {message : "Edit cart from service"};
}

export const DeleteCart = async (input : any, repo: CartRepositoryType) => {
    const data = await repo.delete(input);
    return data;
    // return {message : "Delete cart from service"};
}

