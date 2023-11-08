import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, CreateDateColumn } from "typeorm";


@Entity('category')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string

    @Column()
    slug: string

    @Column()
    image: string

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;
}
