export namespace NSOrderCartItem {
    export enum StatusType {
        pending = 'Pending',
        shipped = 'Shipped',
        delivered = 'Delivered'
    }

    export interface SingleOrder {
        id: string;
        totalPrice: number;
        status: StatusType;
        paymentInfo: string
        cartItems: string[]
        createdAt: Date;
    }

}