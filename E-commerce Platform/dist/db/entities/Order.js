var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, BaseEntity, ManyToOne, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { Product } from "./Product.js";
import { PaymentInfo } from "./PaymentInfo.js";
let Order = class Order extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    Column() //must I add sth since it is derived attribute 
    ,
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Pending'
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column('simple-json'),
    __metadata("design:type", Array)
], Order.prototype, "productQuantities", void 0);
__decorate([
    CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => PaymentInfo, paymentInfo => paymentInfo.orders, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Object)
], Order.prototype, "paymentInfo", void 0);
__decorate([
    ManyToMany(() => Product, { eager: true }),
    JoinTable(),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
Order = __decorate([
    Entity('orders')
], Order);
export { Order };
//# sourceMappingURL=Order.js.map