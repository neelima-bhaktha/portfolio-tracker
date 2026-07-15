"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePortfolio = exports.getPortfolioById = exports.getPortfolios = exports.createPortfolio = void 0;
const data_source_1 = require("../config/data-source");
const Portfolio_1 = require("../entities/Portfolio");
const portfolioRepo = data_source_1.AppDataSource.getRepository(Portfolio_1.Portfolio);
const createPortfolio = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name)
            return res.status(400).json({ error: 'Name is required' });
        const portfolio = portfolioRepo.create({ name, user_id: req.user.userId });
        await portfolioRepo.save(portfolio);
        return res.status(201).json(portfolio);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error creating portfolio' });
    }
};
exports.createPortfolio = createPortfolio;
const getPortfolios = async (req, res) => {
    try {
        const portfolios = await portfolioRepo.find({ where: { user_id: req.user.userId, status: 'active' } });
        return res.status(200).json(portfolios);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error fetching portfolios' });
    }
};
exports.getPortfolios = getPortfolios;
const getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const portfolio = await portfolioRepo.findOne({
            where: { id: id, user_id: req.user.userId },
            relations: { assets: true }
        });
        if (!portfolio)
            return res.status(404).json({ error: 'Portfolio not found' });
        return res.status(200).json(portfolio);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error fetching portfolio' });
    }
};
exports.getPortfolioById = getPortfolioById;
const deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const portfolio = await portfolioRepo.findOne({ where: { id: id, user_id: req.user.userId } });
        if (!portfolio)
            return res.status(404).json({ error: 'Portfolio not found' });
        // Soft delete / archive
        portfolio.status = 'archived';
        await portfolioRepo.save(portfolio);
        return res.status(200).json({ message: 'Portfolio archived successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error deleting portfolio' });
    }
};
exports.deletePortfolio = deletePortfolio;
//# sourceMappingURL=portfolio.controller.js.map