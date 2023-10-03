import { Column, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "typeorm";
import { Entity } from "typeorm";
import { User } from "./User.js";
import { Product } from "./Product.js";

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

    @ManyToOne(
        () => User,
        user => user.orders,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    user: string | User //is this type correct? //userId in database

    @ManyToMany(() => Product, { eager: true })
    @JoinTable()
    products: Product[]
}