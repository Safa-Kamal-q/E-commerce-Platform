import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Order } from "./Order.js";
import { Product } from "./Product.js";

@Entity('order_items')
export class OrderItems extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Order, order => order.cartItems)
    @JoinColumn({ name: 'cart_id' })
    order: Order;

    @ManyToOne(() => Product,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    quantity: number;
}