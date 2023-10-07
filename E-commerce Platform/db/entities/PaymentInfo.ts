import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Payment_info')
export class PaymentInfo extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string 

    @Column({ nullable: false})
    nameForReceipt : string 

    @Column({ nullable: false})
    phoneNumber: number 

    @Column({ nullable: false})
    city: string 

    @Column({ nullable: false})
    fullAddress: string 

    //we must add attribute for the way of payment 
}