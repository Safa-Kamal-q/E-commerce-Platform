import { NSCategory } from "./categoryType.js"

export namespace NSProduct {
    export interface Item {
        id: string
        title: string
        description: string
        price: number
        quantity: number
        createdAt: Date;
        basicImage: string
        sellerProfile: string,
        galleryImages: string[]
        categories: string [] | NSCategory.Category[]
    }
}