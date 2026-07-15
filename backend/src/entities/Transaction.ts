import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Portfolio } from "./Portfolio";
import { User } from "./User";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar")
    portfolio_id!: string;

    @ManyToOne(() => Portfolio, portfolio => portfolio.transactions)
    @JoinColumn({ name: "portfolio_id" })
    portfolio!: Portfolio;

    @Column("varchar")
    user_id!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column("varchar")
    ticker_symbol!: string;

    @Column({ type: "decimal", precision: 15, scale: 4 })
    quantity!: number;

    @Column({ type: "decimal", precision: 15, scale: 4 })
    price_per_share!: number;

    @Column("varchar")
    type!: "buy" | "sell";

    @CreateDateColumn()
    transaction_date!: Date;
}
