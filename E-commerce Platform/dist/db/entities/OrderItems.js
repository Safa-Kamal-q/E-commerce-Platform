var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Order } from "./Order.js";
import { Product } from "./Product.js";
let OrderItems = class OrderItems extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], OrderItems.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Order, order => order.cartItems),
    JoinColumn({ name: 'cart_id' }),
    __metadata("design:type", Order)
], OrderItems.prototype, "order", void 0);
__decorate([
    ManyToOne(() => Product),
    JoinColumn({ name: 'product_id' }),
    __metadata("design:type", Product)
], OrderItems.prototype, "product", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OrderItems.prototype, "quantity", void 0);
OrderItems = __decorate([
    Entity('order_items')
], OrderItems);
export { OrderItems };
//# sourceMappingURL=OrderItems.js.map