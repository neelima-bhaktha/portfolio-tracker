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
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const Portfolio_1 = require("./Portfolio");
const User_1 = require("./User");
let Transaction = class Transaction {
    id;
    portfolio_id;
    portfolio;
    user_id;
    user;
    ticker_symbol;
    quantity;
    price_per_share;
    type;
    transaction_date;
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "portfolio_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Portfolio_1.Portfolio, portfolio => portfolio.transactions),
    (0, typeorm_1.JoinColumn)({ name: "portfolio_id" }),
    __metadata("design:type", Portfolio_1.Portfolio)
], Transaction.prototype, "portfolio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], Transaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "ticker_symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 4 }),
    __metadata("design:type", Number)
], Transaction.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 4 }),
    __metadata("design:type", Number)
], Transaction.prototype, "price_per_share", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Transaction.prototype, "transaction_date", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)("transactions")
], Transaction);
//# sourceMappingURL=Transaction.js.map