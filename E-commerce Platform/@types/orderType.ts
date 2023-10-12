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
        paymentInfo: string
        products: string[]
        productQuantities: Array<{
            productId: string;
            quantity: number;
        }>;
    }
}