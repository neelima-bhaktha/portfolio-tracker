import { Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Portfolio } from '../entities/Portfolio';
import { AuthRequest } from '../middleware/auth.middleware';

const portfolioRepo = AppDataSource.getRepository(Portfolio);

export const createPortfolio = async (req: AuthRequest, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Name is required' });

        const portfolio = portfolioRepo.create({ name, user_id: req.user.userId });
        await portfolioRepo.save(portfolio);
        
        return res.status(201).json(portfolio);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating portfolio' });
    }
};

export const getPortfolios = async (req: AuthRequest, res: Response) => {
    try {
        const portfolios = await portfolioRepo.find({ where: { user_id: req.user.userId, status: 'active' } });
        return res.status(200).json(portfolios);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching portfolios' });
    }
};

export const getPortfolioById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const portfolio = await portfolioRepo.findOne({ 
            where: { id, user_id: req.user.userId },
            relations: ['assets']
        });
        
        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
        
        return res.status(200).json(portfolio);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching portfolio' });
    }
};

export const deletePortfolio = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const portfolio = await portfolioRepo.findOne({ where: { id, user_id: req.user.userId } });
        
        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
        
        // Soft delete / archive
        portfolio.status = 'archived';
        await portfolioRepo.save(portfolio);
        
        return res.status(200).json({ message: 'Portfolio archived successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting portfolio' });
    }
};
