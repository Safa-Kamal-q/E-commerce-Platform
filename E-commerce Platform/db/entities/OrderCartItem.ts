
import {BaseEntity,PrimaryGeneratedColumn, Entity,CreateDateColumn, Column } from "typeorm";

@Entity('order-cart-items')
export class OrderOneProduct extends BaseEntity {
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


}
