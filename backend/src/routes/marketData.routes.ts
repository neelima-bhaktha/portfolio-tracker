import { Router } from 'express';
import { getStockQuote, searchStockSymbols } from '../controllers/marketData.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken); // Can be public or protected, protecting to prevent abuse

router.get('/quote/:symbol', getStockQuote as any);
router.get('/search', searchStockSymbols as any);

export default router;
