import { CartLineItem } from "../db/schema";
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.do";
import { Product } from "../dto/product.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { AuthorizeError, logger, NotFoundError } from "../utils";
import { GetProductDetails, GetStockDetails } from "../utils/broker";

export const CreateCart = async (input: CartRequestInput & {customerId: number}, repo: CartRepositoryType) => {
    // maka a call to our catalog services
    // synchronize call

    // get product  from the catalog servide



    const product: Product = await GetProductDetails(input.productId);
    logger.info(product);

    if (product.stock < input.qty) {
        throw new NotFoundError("Product is out of stocks")
    }

    // find the product already exist 
    const lineItem = await repo.findCartByProductId(input.customerId, input.productId);

    if(lineItem){
        return repo.updateCart(lineItem.id, lineItem.qty + input.qty);
    }

    return await repo.createCart(input.customerId, {
        productId: product?.id,
        price: product.price.toString(),
        qty: input.qty,
        itemName: product?.name,
        variant: product?.variant
    } as CartLineItem);
    // return product;
    // return {message : "created cart from service"};
}

export const GetCart = async (id: number, repo: CartRepositoryType) => {
    // get customer cart data

    // const cart = await repo.findCart(id);
    // if (!cart) {
    //     throw new NotFoundError('Cart not found')
    // }
    // // list out all line items in the cart

    // const lineItems = cart.lineItems;

    // if(!lineItems.length){
    //     throw new NotFoundError('Cart items not found')
    // }

    // // verify with inventory sevice if the product is still available
    // const stockDetails = await GetStockDetails(
    //     lineItems.map((item) => item.productId)
    // )

    // if(Array.isArray(stockDetails)){
    //     // update stock availibility in cart items
    //     lineItems.forEach((lineItem) => {
    //         let stockItem = lineItems.find((stock) => stock.id === lineItem.productId);
    //         if(stockItem){
    //             lineItem.availability = stockItem?.stock;
    //         }
    //     })
    //     // update cart line items
    //     cart.lineItems = lineItems;
    // }

    // // return the updated cart data with latest stock avaiability
    
    
    // return cart;
    // // return {message : "GET cart from service"};
    // get customer cart data
  const cart = await repo.findCart(id);
  if (!cart) {
    throw new NotFoundError("cart does not exist");
  }

  // list out all line items in the cart
  const lineItems = cart.lineItems;

  if (!lineItems.length) {
    throw new NotFoundError("cart items not found");
  }

  // verify with inventory service if the product is still available
  const stockDetails = await GetStockDetails(
    lineItems.map((item) => item.productId)
  );

  if (Array.isArray(stockDetails)) {
    // update stock availability in cart line items
    lineItems.forEach((lineItem) => {
      const stockItem = stockDetails.find(
        (stock) => stock.id === lineItem.productId
      );
      if (stockItem) {
        lineItem.availability = stockItem.stock;
      }
    });

    // update cart line items
    cart.lineItems = lineItems;
  }

  // return updated cart data with latest stock availability
  return cart;
}

const AuthorisedCart = async(lineItemId:number, customerId:number, repo: CartRepositoryType) =>{
    const cart = await repo.findCart(customerId);

    if(!cart){
        throw new NotFoundError("Cart does not exist");
    }

    const lineItem = cart.lineItems.find((item) => item.id === lineItemId);
    if(!lineItem){
        throw new AuthorizeError("you are not authorized to edit this cart");
    }

    return lineItem;
}

export const EditCart = async (input: CartEditRequestInput & {customerId: number}, repo: CartRepositoryType) => {
    await AuthorisedCart(input.id, input.customerId, repo);
    const data = await repo.updateCart(input.id, input.qty);
    return data;
    // return {message : "Edit cart from service"};
}

export const DeleteCart = async ( input : { id: number, customerId : number }, repo: CartRepositoryType) => {
    await AuthorisedCart(input.id, input.customerId, repo);
    const data = await repo.deleteCart(input.id);
    return data;
    // return {message : "Delete cart from service"};
}

