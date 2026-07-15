"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchStockSymbols = exports.getStockQuote = void 0;
const marketData_service_1 = require("../services/marketData.service");
const getStockQuote = async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const data = await (0, marketData_service_1.getQuote)(symbol);
        if (!data)
            return res.status(404).json({ error: 'Symbol not found' });
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(503).json({ error: 'Market data unavailable' });
    }
};
exports.getStockQuote = getStockQuote;
const searchStockSymbols = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string')
            return res.status(400).json({ error: 'Query parameter q is required' });
        const data = await (0, marketData_service_1.searchStocks)(q);
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(503).json({ error: 'Search service unavailable' });
    }
};
exports.searchStockSymbols = searchStockSymbols;
//# sourceMappingURL=marketData.controller.js.map