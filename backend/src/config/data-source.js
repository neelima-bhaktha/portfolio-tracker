"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Portfolio_1 = require("../entities/Portfolio");
const Asset_1 = require("../entities/Asset");
const Transaction_1 = require("../entities/Transaction");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "portfolio_db",
    synchronize: true, // Auto-create tables (dev only)
    logging: false,
    entities: [User_1.User, Portfolio_1.Portfolio, Asset_1.Asset, Transaction_1.Transaction],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=data-source.js.map