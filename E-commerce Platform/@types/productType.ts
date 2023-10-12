export namespace NSProduct{
    export interface Item{
        id: string
        title: string 
        description: string
        price:  number
        quantity: number
        createdAt: Date;
        image: string 
        sellerProfile: string 
        
    }
}