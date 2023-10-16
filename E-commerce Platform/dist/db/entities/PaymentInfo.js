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
import { OrderOneProduct } from "./OrderOneProduct.js";
let PaymentInfo = class PaymentInfo extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], PaymentInfo.prototype, "id", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], PaymentInfo.prototype, "nameForReceipt", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], PaymentInfo.prototype, "city", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], PaymentInfo.prototype, "fullAddress", void 0);
__decorate([
    OneToMany(() => OrderOneProduct, order => order.paymentInfo),
    __metadata("design:type", Array)
], PaymentInfo.prototype, "orders", void 0);
PaymentInfo = __decorate([
    Entity('payment_info')
], PaymentInfo);
export { PaymentInfo };
//# sourceMappingURL=PaymentInfo.js.map