import { CreateDateColumn, PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { SellerProfile } from "./SellerProfile.js";
import { OrderOneProduct } from "./OrderOneProduct.js";
import { Category } from "./Category.js";
import { Review } from "./Review.js";


@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 255, nullable: false })
    title: string

    @Column()
    description: string

    @Column('decimal', { precision: 5, scale: 2, nullable: false })
    price: number //How to make this if the user want to see the price in shekel and it is in dollar 

    @Column({ nullable: false, default: 1 })
    quantity: number

    @Column({ nullable: false })
    basicImage: string

    @Column('simple-array')
    galleryImages: string[];

    @Column({ type: 'numeric', precision: 3, scale: 1, default: 0 })
    ratingAvg: number

    @Column({ type: 'numeric', precision: 3, scale: 1, default: 0 })
    ratingSum: number

    @Column({ default: 0 })
    ratingQuantity: number

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @ManyToOne(
        () => SellerProfile,
        seller => seller.product,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    sellerProfile: string | SellerProfile  //sellerProfileId in database

    @OneToMany(() => OrderOneProduct, order => order.product)
    orders: OrderOneProduct[];

    @ManyToMany(() => Category, { eager: true })
    @JoinTable()
    categories: string[] | Category[];

    @OneToMany(() => Review, review => review.product)
    reviews: Review[];
}