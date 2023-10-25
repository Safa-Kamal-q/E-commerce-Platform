import { Column, JoinTable, PrimaryGeneratedColumn, ManyToMany, BaseEntity, Entity } from "typeorm";
import { Permission } from "./Permission.js";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true,
        type: 'enum',
        enum: ['admin', 'buyer', 'seller'],
        default: 'seller'
    })
    name: 'admin' | 'buyer' | 'seller'

    @ManyToMany(() => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: number[] | Permission[];
}