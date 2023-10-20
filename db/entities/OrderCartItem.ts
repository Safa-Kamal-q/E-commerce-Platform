import {BaseEntity,PrimaryGeneratedColumn, Entity,CreateDateColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { PaymentInfo } from "./PaymentInfo.js";
import { ShoppingCartItem } from "./ShoppingCartItems.js";

@Entity('order-cart-items')
export class OrderCartItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'enum',
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Shipped'

    })
    status: 'Pending' | 'Shipped' | 'Delivered'

    @Column() 
    totalPrice: number
    
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

    @ManyToMany(() => ShoppingCartItem, { eager: true })
    @JoinTable()
    cartItems: ShoppingCartItem[];

}

