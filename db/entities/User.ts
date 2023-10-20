import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
import { Role } from "./Role.js";
import { ShoppingCart } from "./ShoppingCart.js";
import { PaymentInfo } from "./PaymentInfo.js";
import { SellerProfile } from "./SellerProfile.js";

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

    @Column({
        type: 'enum',
        enum: ['admin', 'buyer', 'seller', 'guest'],
        default: 'guest'
    })
    type: 'admin' | 'buyer' | 'seller' | 'guest'

    //length: 10
    @Column({ nullable: false })
    phoneNumber: number

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @ManyToMany(() => Role, { eager: true })
    @JoinTable()
    roles: Role[];

    @OneToOne(() => ShoppingCart) 
    @JoinColumn()
    cart: ShoppingCart

    @OneToOne(() => PaymentInfo) 
    @JoinColumn()
    paymentInfo: PaymentInfo

    @OneToOne(() => SellerProfile)
    @JoinColumn()
    sellerProfile: SellerProfile
}
