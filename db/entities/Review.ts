import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.js";
import { User } from "./User.js";

@Entity('reviews')
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    comment: string

    @Column({ type: 'numeric', precision: 3, scale: 1, default: 1, nullable: false })
    rating: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @ManyToOne(() => Product,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    @JoinColumn()
    product: string | Product;

    @ManyToOne(() => User,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    @JoinColumn()
    user: string | User;
}
