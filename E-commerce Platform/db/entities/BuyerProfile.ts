import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";

import { User } from "./User.js";

@Entity('buyers_profiles')
export class BuyerProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, nullable: false })
  nickName: string;

  @Column()
  Bio: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP()"
  })
  createdAt: Date;

  @OneToOne(() => User) // add this here or in User entity 
  @JoinColumn()
  user: User;

  //add attributes after asking 
}