import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShoppingCart } from "./ShoppingCart.js";
import { Product } from "./Product.js";

@Entity()
export class ShoppingCartItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => ShoppingCart, cart => cart.cartItems)
    cart: ShoppingCart;

    @ManyToOne(() => Product,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    @JoinColumn()
    product: Product;

    @Column()
    quantity: number;
}