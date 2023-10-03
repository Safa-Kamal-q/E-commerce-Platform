import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from "typeorm";

@Entity('permissions')
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string
}