import { Column, BaseEntity, ManyToOne, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, CreateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Product } from "./Product.js";
import { PaymentInfo } from "./PaymentInfo.js";

@Entity('order-one-product')
export class OrderOneProduct extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    quantity: number

    @Column() 
    totalPrice: number

    @Column({
        type: 'enum',
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Shipped'

    })
    status: 'Pending' | 'Shipped' | 'Delivered'

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @ManyToOne(
        () => PaymentInfo,
        paymentInfo => paymentInfo.orders,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    paymentInfo: string | PaymentInfo //userId in database

    @ManyToOne(() => Product,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    @JoinColumn()
    product: string | Product;

}
