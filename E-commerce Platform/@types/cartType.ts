export namespace NSCart{
    export interface SingleCart{
        id: string;
        totalPrice: number;
        cartItems: string[];
    }

    export interface cartItem{
        id: string 
        cart: string 
        product: string 
        quantity: number
        price: number
    }
}