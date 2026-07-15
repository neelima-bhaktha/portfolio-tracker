import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Portfolio } from "./Portfolio";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar", { unique: true })
    email!: string;

    @Column("varchar")
    password_hash!: string;

    @Column("boolean", { default: false })
    is_verified!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @OneToMany(() => Portfolio, portfolio => portfolio.user)
    portfolios!: Portfolio[];
}
