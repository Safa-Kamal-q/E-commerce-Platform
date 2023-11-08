export namespace NSReview {

    export interface Review {
        id: string
        comment: string
        rating: number
        createdAt: Date
        product: string
        user: string
    }
}