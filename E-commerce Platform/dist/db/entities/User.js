var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
import { Role } from "./Role.js";
import { ShoppingCart } from "./ShoppingCart.js";
import { PaymentInfo } from "./PaymentInfo.js";
import { SellerProfile } from "./SellerProfile.js";
let User = class User extends BaseEntity {
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({ length: 255, nullable: false /*is this true since I have guest user ?*/ }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    Column({ nullable: false /*is this true since I have guest user ?*/ }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    Column({ nullable: false /*is this true since I have guest user ?*/ }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: ['admin', 'buyer', 'seller', 'guest'],
        default: 'guest'
    }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", Number)
], User.prototype, "phoneNumber", void 0);
__decorate([
    CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    ManyToMany(() => Role, { eager: true }),
    JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    OneToOne(() => ShoppingCart),
    JoinColumn(),
    __metadata("design:type", ShoppingCart)
], User.prototype, "cart", void 0);
__decorate([
    OneToOne(() => PaymentInfo),
    JoinColumn(),
    __metadata("design:type", PaymentInfo)
], User.prototype, "paymentInfo", void 0);
__decorate([
    OneToOne(() => SellerProfile),
    JoinColumn(),
    __metadata("design:type", SellerProfile)
], User.prototype, "sellerProfile", void 0);
User = __decorate([
    Entity('users')
], User);
export { User };
//# sourceMappingURL=User.js.map