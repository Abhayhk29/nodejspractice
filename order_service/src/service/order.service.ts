import { error } from "console";
import { InProcessOrder, OrderLineItemType, OrderWithLineItems } from "../dto/orderRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { OrderRepositoryType } from "../repository/order.repository";
import { OrderStatus } from "../types";
import { SendCreateOrderMessage } from "./broker.service";

export const CreateOrder = async(
    userId:number, 
    repo:OrderRepositoryType, 
    cartRepo: CartRepositoryType
) => {
    // find cart by user id
    const cart = await cartRepo.findCart(userId);

    if(!cart){
        throw new Error("Cart not found")
    }

    // calculate total order amount
    let cartTotal = 0;
    let orderLineItems: OrderLineItemType[] = [];

    // create orderline items drom the cart items
    cart.lineItems.forEach((item) => {
        cartTotal += item.qty * Number(item.price);
        orderLineItems.push({
            productId: item.productId,
            itemName: item.itemName,
            qty: item.qty,
            price: item.price,
        } as unknown as OrderLineItemType)
    })

    const orderNumber = Math.floor(Math.random() * 1000000000);
    // create order with line items
    const orderInput : OrderWithLineItems = {
        orderNumber : orderNumber,
        taxId: null, // payment ID to keep track of successfull payment service
        status: OrderStatus.PENDING,  //payment status will be updated by payment service
        customerId: userId,
        amount: cartTotal.toString(),
        orderItems: orderLineItems
    }

    const order = await repo.createOrder(orderInput);
    await cartRepo.clearCartData(userId);
    console.log("order created ", order);
    // fire a message to subscriptioon service [catalog service] to update stock
    await SendCreateOrderMessage(orderInput)
    // await repo.
    // return success message
    return { message :"order created successdully", orderNumber: orderNumber };
}


export const UpdateOrder = async (
    orderId: number,
    status: OrderStatus,
    repo: OrderRepositoryType
) => {

    await repo.updateOrder(orderId, status)
    // fire a message to subscription service [catalog service] to tupdate stock

    if(status === OrderStatus.CANCELLED){
        // await 
    }

    return {message : "Order updated successfully"};
}

export const GetOrder = async (
    orderId: number,
    repo: OrderRepositoryType
) => {
    const order = repo.findOrder(orderId);
    if(!Array.isArray(order)){
        return new Error('Order not found')
    }
    return order
}

export const GetOrders = async(
    orderId: number,
    repo: OrderRepositoryType
) => {
    const orders = await repo.findOrdersByCustomerId(orderId);
    if(Array.isArray(orders) && orders.length > 0){
        return orders;
    }
    throw new Error("Orders not found")
}

export const DeleteOrder = async (
    orderId: number,
    repo: OrderRepositoryType
) => {
    const result = await repo.deleteOrder(orderId)
    return true;
}

export const HandleSubscription = async (mesage:any) => {
    // if message event check by the data
    // 
}

export const CheckoutOrder = async (
    orerId:number ,
    repo: OrderRepositoryType,   
) => {
    // get order details
    // if message event check by the data
    const order = await repo.findOrder(orerId);
    if(!order){
        throw new Error("Order not found")
    }

    const CheckoutOrder : InProcessOrder = {
        id: order.id,
        orderNumber: order.orderNumber,
        status: OrderStatus.PENDING,
        customerId: order.customerId,
        amount: Number(order.amount),
        createdAt: new Date(),
        updatedAt: new Date()
    }

    return  CheckoutOrder;
}