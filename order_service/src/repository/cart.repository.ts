import { DB } from "../db/db.connection";
import { Cart, CartLineItem, cartLineItems, carts } from "../db/schema";
import { CartWithLineItems } from "../dto/cartRequest.do";
import { NotFoundError } from "../utils";
import { eq } from "drizzle-orm";
// import { carts } from "../db/schema";
// import { CartRepositoryType } from "../types/repository.types";

// declare repository type

// declare repository type
export type CartRepositoryType = {
    createCart: (customerId: number, lineItem: CartLineItem) => Promise<number>;
    // findCart: (id: number) => Promise<Cart>;
    findCart: (id: number) => Promise<CartWithLineItems>;
    updateCart: (id: number, qty: number) => Promise<CartLineItem>;
    deleteCart: (id: number) => Promise<Boolean>;
    clearCartData: (id: number) => Promise<Boolean>;
    findCartByProductId: (
      customerId: number,
      productId: number
    ) => Promise<CartLineItem>;
  };

type Create = (input : any) => Promise<{}>;
type Find = (input : any) => Promise<{}>;
type Update = (input : any) => Promise<{}>;
type Delete = (input : any) => Promise<{}>;


// export type CartRepositoryType = {
//     create : Create,
//     find: Find,
//     update: Update,
//     delete: Delete
// }


const db = {};

// const createCart = async (input: any): Promise<{}> => {
//     // connection to db
//     const result = await DB.insert(carts).values({
//         customerId:input.customerId,
//     }).returning({cartId: carts.id})

//     console.log(result);
    
//     // operation 
//     return Promise.resolve({ message: "fake resposne from data cart", input })
// }
// const updateCart = async (input: any): Promise<{}> => {
//     return Promise.resolve({})
// }
// const findCart = async (input: any): Promise<{}> => {
//     return Promise.resolve({})
// }
// const deleteCart = async (input: any): Promise<{}> => {
//     return Promise.resolve({})
// }


// export const CartRepository: CartRepositoryType = {
//     create: createCart,
//     find: findCart,
//     update: updateCart,
//     delete: deleteCart
// }

const createCart = async (
    customerId: number,
    { itemName, price, productId, qty, variant }: CartLineItem
  ): Promise<number> => {
    const result = await DB.insert(carts)
      .values({
        customerId: customerId,
      })
      .returning()
      .onConflictDoUpdate({
        target: carts.customerId,
        set: { updatedAt: new Date() },
      });
  
    const [{ id }] = result;
  
    if (id > 0) {
      await DB.insert(cartLineItems).values({
        cartId: id,
        productId: productId,
        itemName: itemName,
        price: price,
        qty: qty,
        variant: variant,
      });
    }
    return id;
  };
  
  const findCart = async (id: number): Promise<CartWithLineItems> => {
    const cart = await DB.query.carts.findFirst({
      where: (carts, { eq }) => eq(carts.customerId, id),
      with: {
        lineItems: true,
      },
    });
  
    if (!cart) {
      throw new NotFoundError("cart not found");
    }
  
    return cart;
  };
  
  const updateCart = async (id: number, qty: number): Promise<CartLineItem> => {
    const [cartLineItem] = await DB.update(cartLineItems)
      .set({
        qty: qty,
      })
      .where(eq(cartLineItems.id, id))
      .returning();
    return cartLineItem;
  };
  
  const deleteCart = async (id: number): Promise<boolean> => {
    console.log("Proposed ID", id);
    await DB.delete(cartLineItems).where(eq(cartLineItems.id, id)).returning();
    return true;
  };
  
  const clearCartData = async (id: number): Promise<boolean> => {
    await DB.delete(carts).where(eq(carts.id, id)).returning();
    return true;
  };
  
  const findCartByProductId = async (
    customerId: number,
    productId: number
  ): Promise<CartLineItem> => {
    const cart = await DB.query.carts.findFirst({
      where: (carts, { eq }) => eq(carts.customerId, customerId),
      with: {
        lineItems: true,
      },
    });
  
    const lineItem = cart?.lineItems.find((item) => item.productId === productId);
  
    return lineItem as CartLineItem;
  };
  
  export const CartRepository: CartRepositoryType = {
    createCart,
    findCart,
    updateCart,
    deleteCart,
    clearCartData,
    findCartByProductId,
  };