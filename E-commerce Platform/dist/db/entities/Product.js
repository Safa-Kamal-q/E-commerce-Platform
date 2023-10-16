var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CreateDateColumn, PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToOne, OneToMany } from "typeorm";
import { SellerProfile } from "./SellerProfile.js";
import { OrderOneProduct } from "./OrderOneProduct.js";
let Product = class Product extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    Column({ length: 255, nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    Column('decimal', { precision: 5, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    Column({ nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    Column({ nullable: false })
    // image: JSON//check if the type true (array of urls not supported from sql)
    ,
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => SellerProfile, seller => seller.product, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Object)
], Product.prototype, "sellerProfile", void 0);
__decorate([
    OneToMany(() => OrderOneProduct, order => order.product),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
Product = __decorate([
    Entity('products')
], Product);
export { Product };
//# sourceMappingURL=Product.js.map