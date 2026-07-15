import { Router } from 'express';
import { createPortfolio, getPortfolios, getPortfolioById, deletePortfolio } from '../controllers/portfolio.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken); // Protect all portfolio routes

router.post('/', createPortfolio as any);
router.get('/', getPortfolios as any);
router.get('/:id', getPortfolioById as any);
router.delete('/:id', deletePortfolio as any);

export default router;
