import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, OneToMany } from "typeorm";
import { ShoppingCartItem } from "./ShoppingCartItems.js";


@Entity('cart')
export class ShoppingCart extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()  
    totalPrice: number

    @OneToMany(() => ShoppingCartItem, cartItem => cartItem.cart)
    cartItems: ShoppingCartItem[];
}