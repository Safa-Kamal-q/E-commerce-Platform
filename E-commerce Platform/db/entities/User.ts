import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
import Role from "./Role.js";
import { Order } from "./Order.js";
import { ShoppingCart } from "./ShoppingCart.js";
import { PaymentInfo } from "./PaymentInfo.js";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 255, nullable: false /*is this true since I have guest user ?*/ })
    userName: string

    @Column({ nullable: false /*is this true since I have guest user ?*/ })
    email: string

    @Column({ nullable: false })
    country: string

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
    @Column({ nullable: false /*is this true since I have guest user ?*/ })
    password: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @ManyToMany(() => Role, { eager: true })
    @JoinTable()
    roles: Role[];

    @OneToMany(() => Order, order => order.user)
    orders: Order[]

    @OneToOne(() => ShoppingCart)// add this here or in User entity 
    @JoinColumn()
    cart: ShoppingCart

    @OneToOne(() => PaymentInfo)// add this here or in User entity 
    @JoinColumn()
    paymentInfo: PaymentInfo
}
