export type OrderLineItemType = {
    id: number;
    productId: number
    itemName: string;
    qty: number;
    price: number;
    orderId: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface OrderWithLineItems {
    id?:number;
    customerId: number;
    orderId:number;
    taxId: string | null;
    amount: string;
    status: string,
    orderItesms: OrderLineItemType[],
    createdAt? : Date,
    updatedAt?: Date
}