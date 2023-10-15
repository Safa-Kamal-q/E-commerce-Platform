var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.js";
let SellerProfile = class SellerProfile extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], SellerProfile.prototype, "id", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", Number)
], SellerProfile.prototype, "identityNumber", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], SellerProfile.prototype, "nickName", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], SellerProfile.prototype, "shopName", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", Number)
], SellerProfile.prototype, "accountNumber", void 0);
__decorate([
    Column({
        nullable: false,
        type: 'enum',
        enum: ['current', 'saving'],
    }),
    __metadata("design:type", String)
], SellerProfile.prototype, "accountType", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], SellerProfile.prototype, "shippingLocation", void 0);
__decorate([
    OneToMany(() => Product, product => product.sellerProfile),
    __metadata("design:type", Array)
], SellerProfile.prototype, "product", void 0);
SellerProfile = __decorate([
    Entity('seller_profile')
], SellerProfile);
export { SellerProfile };
//# sourceMappingURL=SellerProfile.js.map