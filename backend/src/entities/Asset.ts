import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Portfolio } from "./Portfolio";

@Entity("assets")
export class Asset {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar")
    portfolio_id!: string;

    @ManyToOne(() => Portfolio, portfolio => portfolio.assets)
    @JoinColumn({ name: "portfolio_id" })
    portfolio!: Portfolio;

    @Column("varchar")
    ticker_symbol!: string;

    @Column({ type: "decimal", precision: 15, scale: 4 })
    total_quantity!: number;

    @Column({ type: "decimal", precision: 15, scale: 4 })
    average_purchase_price!: number;

    @UpdateDateColumn()
    updated_at!: Date;
}
