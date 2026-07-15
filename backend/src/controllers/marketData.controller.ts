import { Request, Response } from 'express';
import { getQuote, searchStocks } from '../services/marketData.service';

export const getStockQuote = async (req: Request, res: Response) => {
    try {
        const { symbol } = req.params;
        const data = await getQuote(symbol);
        
        if (!data) return res.status(404).json({ error: 'Symbol not found' });
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(503).json({ error: 'Market data unavailable' });
    }
};

export const searchStockSymbols = async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string') return res.status(400).json({ error: 'Query parameter q is required' });
        
        const data = await searchStocks(q);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(503).json({ error: 'Search service unavailable' });
    }
};
