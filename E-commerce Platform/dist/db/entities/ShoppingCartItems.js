var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShoppingCart } from "./ShoppingCart.js";
import { Product } from "./Product.js";
let ShoppingCartItem = class ShoppingCartItem extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ShoppingCartItem.prototype, "id", void 0);
__decorate([
    ManyToOne(() => ShoppingCart, cart => cart.cartItems),
    __metadata("design:type", Object)
], ShoppingCartItem.prototype, "cart", void 0);
__decorate([
    ManyToOne(() => Product, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    JoinColumn(),
    __metadata("design:type", Object)
], ShoppingCartItem.prototype, "product", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], ShoppingCartItem.prototype, "quantity", void 0);
ShoppingCartItem = __decorate([
    Entity()
], ShoppingCartItem);
export { ShoppingCartItem };
//# sourceMappingURL=ShoppingCartItems.js.map