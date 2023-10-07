import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, OneToMany, JoinColumn } from "typeorm";
import { ShoppingCartItem } from "./ShoppingCartItems.js";


@Entity('cart')
export class ShoppingCart extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column() //must I add sth since it is derived attribute? 
    totalPrice: number

    @OneToMany(() => ShoppingCartItem, cartItem => cartItem.cart, { cascade: true })
    cartItems: ShoppingCartItem[];
}