"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const typeorm_1 = require("typeorm");
const Portfolio_1 = require("./Portfolio");
let Asset = class Asset {
    id;
    portfolio_id;
    portfolio;
    ticker_symbol;
    total_quantity;
    average_purchase_price;
    updated_at;
};
exports.Asset = Asset;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Asset.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Asset.prototype, "portfolio_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Portfolio_1.Portfolio, portfolio => portfolio.assets),
    (0, typeorm_1.JoinColumn)({ name: "portfolio_id" }),
    __metadata("design:type", Portfolio_1.Portfolio)
], Asset.prototype, "portfolio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Asset.prototype, "ticker_symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 4 }),
    __metadata("design:type", Number)
], Asset.prototype, "total_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 4 }),
    __metadata("design:type", Number)
], Asset.prototype, "average_purchase_price", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Asset.prototype, "updated_at", void 0);
exports.Asset = Asset = __decorate([
    (0, typeorm_1.Entity)("assets")
], Asset);
//# sourceMappingURL=Asset.js.map