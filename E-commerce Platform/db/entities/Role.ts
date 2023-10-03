import { Column, JoinTable, PrimaryGeneratedColumn, ManyToMany, BaseEntity, Entity } from "typeorm";
import { Permission } from "./Permission.js";

@Entity('roles')
export default class Role extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true,
        type: 'enum',
        enum: ['guestUser', 'registeredUser', 'administrator'],
        default: 'guestUser'
    })
    name: 'guestUser' | 'registeredUser' | 'administrator'

    @ManyToMany(() => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];
}