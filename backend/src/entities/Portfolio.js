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
exports.Portfolio = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Asset_1 = require("./Asset");
const Transaction_1 = require("./Transaction");
let Portfolio = class Portfolio {
    id;
    user_id;
    user;
    name;
    status;
    created_at;
    assets;
    transactions;
};
exports.Portfolio = Portfolio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Portfolio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Portfolio.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.portfolios),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], Portfolio.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Portfolio.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "active" }),
    __metadata("design:type", String)
], Portfolio.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Portfolio.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Asset_1.Asset, asset => asset.portfolio),
    __metadata("design:type", Array)
], Portfolio.prototype, "assets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_1.Transaction, transaction => transaction.portfolio),
    __metadata("design:type", Array)
], Portfolio.prototype, "transactions", void 0);
exports.Portfolio = Portfolio = __decorate([
    (0, typeorm_1.Entity)("portfolios")
], Portfolio);
//# sourceMappingURL=Portfolio.js.map