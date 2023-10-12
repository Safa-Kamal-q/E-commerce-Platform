import { Column, BaseEntity, ManyToOne, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User.js";
import { Product } from "./Product.js";
import { PaymentInfo } from "./PaymentInfo.js";

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()//must I add sth since it is derived attribute 
    totalPrice: number

    @Column({
        type: 'enum',
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Pending'

    })
    status: 'Pending' | 'Shipped' | 'Delivered'

    @Column('simple-json')
    productQuantities: { productId: string; quantity: number }[];

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

    @ManyToMany(() => Product, { eager: true })
    @JoinTable()
    products: Product[];

}