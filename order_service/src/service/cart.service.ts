import { CartLineItem } from "../db/schema";
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.do";
import { Product } from "../dto/product.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { logger, NotFoundError } from "../utils";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (input : CartRequestInput, repo: CartRepositoryType) => {
    // maka a call to our catalog services
    // synchronize call
    const product : Product = await GetProductDetails(input.productId);
    logger.info(product);

    if(product.stock < input.qty){
        throw new NotFoundError("Product is out of stocks")
    }

    return await repo.createCart(input.customerId, {
        productId: product?.id,
        price: product.price.toString(),
        qty: input.qty,
        itemName : product?.name,
        variant: product?.variant
    } as CartLineItem);
    // return product;
    // return {message : "created cart from service"};
}

export const GetCart = async (id:number, repo: CartRepositoryType) => {
    const data = await repo.findCart(id);
    if(!data){
        throw new NotFoundError('Cart not found')
    }
    return data;
    // return {message : "GET cart from service"};
}

export const EditCart = async (input : CartEditRequestInput, repo: CartRepositoryType) => {
    const data = await repo.updateCart(input.id, input.qty);
    return data;
    // return {message : "Edit cart from service"};
}

export const DeleteCart = async (id : number, repo: CartRepositoryType) => {
    const data = await repo.deleteCart(id);
    return data;
    // return {message : "Delete cart from service"};
}

