import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const addTransaction: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTransactions: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=transaction.controller.d.ts.map