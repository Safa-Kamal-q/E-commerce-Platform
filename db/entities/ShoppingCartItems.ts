import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShoppingCart } from "./ShoppingCart.js";
import { Product } from "./Product.js";

@Entity()
export class ShoppingCartItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => ShoppingCart, cart => cart.cartItems,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    cart: string | ShoppingCart;

    @ManyToOne(() => Product,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    @JoinColumn()
    product: string | Product;

    @Column({ nullable: false })
    quantity: number;

    @Column()
    price: number
}