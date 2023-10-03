import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn, BaseEntity, Entity } from "typeorm";
import { Product } from "./Product.js";

@Entity('cart')
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column() //must I add sth since it is derived attribute? 
    totalPrice: number

    @ManyToMany(() => Product, { eager: true })
    @JoinTable()
    products: Product
}