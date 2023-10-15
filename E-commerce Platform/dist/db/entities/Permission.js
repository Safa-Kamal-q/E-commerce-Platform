var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from "typeorm";
let Permission = class Permission extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], Permission.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Permission.prototype, "name", void 0);
Permission = __decorate([
    Entity('permissions')
], Permission);
export { Permission };
//# sourceMappingURL=Permission.js.map