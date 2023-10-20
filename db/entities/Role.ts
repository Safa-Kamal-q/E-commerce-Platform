import { Column, JoinTable, PrimaryGeneratedColumn, ManyToMany, BaseEntity, Entity } from "typeorm";
import { Permission } from "./Permission.js";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true,
        type: 'enum',
        enum: ['admin', 'buyer', 'seller', 'guest'],
        default: 'guest'
    })
    name: 'admin' | 'buyer' | 'seller' | 'guest'

    @ManyToMany(() => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];
}