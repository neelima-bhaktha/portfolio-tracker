import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Portfolio } from "../entities/Portfolio";
import { Asset } from "../entities/Asset";
import { Transaction } from "../entities/Transaction";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "database.sqlite",
    synchronize: true, // Auto-create tables (dev only)
    logging: false,
    entities: [User, Portfolio, Asset, Transaction],
    subscribers: [],
    migrations: [],
});
