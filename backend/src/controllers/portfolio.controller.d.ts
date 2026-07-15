import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const createPortfolio: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPortfolios: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPortfolioById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletePortfolio: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=portfolio.controller.d.ts.map