import { CreateDateColumn, PrimaryGeneratedColumn, Column, BaseEntity, Entity } from "typeorm";


@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 255, nullable: false })
    name: string

    @Column()
    description: string

    @Column({ nullable: false })
    price: string //How to make this if the user want to see the price in shekel and it is in dollar 

    @Column({ nullable: false, default: 1 })
    quantity: number

    @Column({ nullable: false })
    // image: JSON//check if the type true (array of urls not supported from sql)

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;
}