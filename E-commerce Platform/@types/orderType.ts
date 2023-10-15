export namespace NSOrderOneProduct {
    export enum StatusType {
        pending = 'Pending',
        shipped = 'Shipped',
        delivered = 'Delivered'
    }

    export interface SingleOrder {
        id: string;
        quantity: number
        totalPrice: number;
        status: StatusType;
        paymentInfo: string
        product: string 
        createdAt: Date;
    }
}