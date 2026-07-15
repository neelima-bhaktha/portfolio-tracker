import { User } from "./User";
import { Asset } from "./Asset";
import { Transaction } from "./Transaction";
export declare class Portfolio {
    id: string;
    user_id: string;
    user: User;
    name: string;
    status: string;
    created_at: Date;
    assets: Asset[];
    transactions: Transaction[];
}
//# sourceMappingURL=Portfolio.d.ts.map