import { Column, JoinColumn,BaseEntity , JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { User } from "./User.js";
import { ShoppingCartItem } from "./ShoppingCartItems.js";

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

    @Column()
    totalAmount: number //This is the total items 

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

    @OneToMany(() => ShoppingCartItem, cartItem => cartItem.cart, { cascade: true })
    cartItems: ShoppingCartItem[];
    
}