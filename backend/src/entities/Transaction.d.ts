import { Portfolio } from "./Portfolio";
import { User } from "./User";
export declare class Transaction {
    id: string;
    portfolio_id: string;
    portfolio: Portfolio;
    user_id: string;
    user: User;
    ticker_symbol: string;
    quantity: number;
    price_per_share: number;
    type: "buy" | "sell";
    transaction_date: Date;
}
//# sourceMappingURL=Transaction.d.ts.map