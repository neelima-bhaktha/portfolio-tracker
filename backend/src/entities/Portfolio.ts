import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Asset } from "./Asset";
import { Transaction } from "./Transaction";

@Entity("portfolios")
export class Portfolio {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar")
    user_id!: string;

    @ManyToOne(() => User, user => user.portfolios)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column("varchar")
    name!: string;

    @Column("varchar", { default: "active" })
    status!: string;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => Asset, asset => asset.portfolio)
    assets!: Asset[];

    @OneToMany(() => Transaction, transaction => transaction.portfolio)
    transactions!: Transaction[];
}
