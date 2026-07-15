import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Portfolio } from "../entities/Portfolio";
import { Asset } from "../entities/Asset";
import { Transaction } from "../entities/Transaction";

const isProduction = !!process.env.DATABASE_URL;

export const AppDataSource = new DataSource(
    isProduction 
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL!,
        ssl: { rejectUnauthorized: false },
        synchronize: true,
        logging: false,
        entities: [User, Portfolio, Asset, Transaction],
    } 
    : {
        type: "better-sqlite3",
        database: process.env.DB_PATH || "database.sqlite",
        synchronize: true,
        logging: false,
        entities: [User, Portfolio, Asset, Transaction],
    }
);
