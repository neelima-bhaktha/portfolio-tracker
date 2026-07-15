import { Router } from 'express';
import { addTransaction, getTransactions } from '../controllers/transaction.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.post('/', addTransaction as any);
router.get('/:portfolio_id', getTransactions as any);

export default router;
