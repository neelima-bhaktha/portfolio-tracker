import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Portfolio } from "../entities/Portfolio";
import { Asset } from "../entities/Asset";
import { Transaction } from "../entities/Transaction";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "portfolio_db",
    synchronize: true, // Auto-create tables (dev only)
    logging: false,
    entities: [User, Portfolio, Asset, Transaction],
    subscribers: [],
    migrations: [],
});
