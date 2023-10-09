import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('seller_profile')
export class SellerProfile extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string 

    //length: 9
    @Column({nullable: false})
    identityNumber: number 

    //length: 36 
    @Column({ nullable: false})
    nickName: string 

    @Column ({ nullable: false})
    shopName: string 

    //length: 7 
    @Column({ nullable: false})
    accountNumber: number 

    @Column({ 
        nullable: false,
        type: 'enum',
        enum : ['current', 'saving'], 
    })
    accountType: string 

    //This if our store offer shipping from buyer location(the seller doesn't bring his orders to our store by himself)
    @Column({ nullable: false})
    shippingLocation: string 
    
}