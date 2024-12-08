import { OrderWithLineItems } from "../dto/orderRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { OrderRepositoryType } from "../repository/order.repository";

export const CreateOrder = async(
    userId:number, 
    repo:OrderRepositoryType, 
    cartRepo: CartRepositoryType

) => {
    return {}
}


export const UpdateOrder = (
    orderId: number,
    status: string,
    repo: OrderRepositoryType
) => {
    return {};
}

export const GetOrder = (
    orderId: number,
    repo: OrderRepositoryType
) => {
    return {}
}

export const GetOrders = (
    orderId: number,
    repo: OrderRepositoryType
) => {
    return {}
}

export const DeleteOrder = (
    orderId: number,
    repo: OrderRepositoryType
) => {
    return {};
}

export const HandleSubscription = async (mesage:any) => {
    // if message event check by the data
    // 
}