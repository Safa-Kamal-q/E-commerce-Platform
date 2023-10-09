export namespace NSOrder {
    export enum StatusType {
        pending = 'Pending',
        shipped = 'Shipped',
        delivered = 'Delivered'
    }

    export interface SingleOrder {
        id: string;
        totalPrice: number;
        status: StatusType;
        totalAmount: number
        user: string[]
        cartItems: string[]
    }
}