import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Payment_info')
export class PaymentInfo extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string 

    @Column({ nullable: false})
    fullBuyerName : string 

    @Column({ nullable: false})
    phoneNumber: number 

    @Column({ nullable: false})
    city: string 

    @Column({ nullable: false})
    fullAddress: string 
}