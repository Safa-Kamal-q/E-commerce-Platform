import { CreateDateColumn, PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToOne } from "typeorm";
import { SellerProfile } from "./SellerProfile.js";


@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 255, nullable: false })
    title: string

    @Column()
    description: string

    @Column({ nullable: false })
    price: string //How to make this if the user want to see the price in shekel and it is in dollar 

    @Column({ nullable: false, default: 1 })
    quantity: number

    @Column({ nullable: false })
    // image: JSON//check if the type true (array of urls not supported from sql)
    image: string// need to fix it 

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
    sellerProfile: string | SellerProfile //is this type correct? //userId in database
}