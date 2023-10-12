import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order.js";

@Entity('payment_info')
export class PaymentInfo extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    nameForReceipt: string

    @Column({ nullable: false })
    city: string

    @Column({ nullable: false })
    fullAddress: string

    @OneToMany(() => Order, order => order.paymentInfo)
    orders: Order[]
    //we must add attribute for the way of payment 
}