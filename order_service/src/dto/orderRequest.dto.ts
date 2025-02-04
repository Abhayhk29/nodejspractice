export type OrderLineItemType = {
    id: number;
    productId: number
    itemName: string;
    qty: number;
    price: string;
    orderId: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface OrderWithLineItems {
    id?:number;
    customerId: number;
    orderNumber:number;
    taxId: string | null;
    amount: string;
    status: string,
    orderItems: OrderLineItemType[],
    createdAt? : Date,
    updatedAt?: Date
}


