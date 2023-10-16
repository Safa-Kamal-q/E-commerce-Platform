var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, OneToMany } from "typeorm";
import { ShoppingCartItem } from "./ShoppingCartItems.js";
let ShoppingCart = class ShoppingCart extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ShoppingCart.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], ShoppingCart.prototype, "totalPrice", void 0);
__decorate([
    OneToMany(() => ShoppingCartItem, cartItem => cartItem.cart),
    __metadata("design:type", Array)
], ShoppingCart.prototype, "cartItems", void 0);
ShoppingCart = __decorate([
    Entity('cart')
], ShoppingCart);
export { ShoppingCart };
//# sourceMappingURL=ShoppingCart.js.map