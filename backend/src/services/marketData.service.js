"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchStocks = exports.getQuote = void 0;
const axios_1 = __importDefault(require("axios"));
const redis_1 = __importDefault(require("../config/redis"));
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || 'demo';
const BASE_URL = 'https://finnhub.io/api/v1';
const CACHE_TTL = 300; // 5 minutes
const getQuote = async (symbol) => {
    const cacheKey = `quote:${symbol.toUpperCase()}`;
    try {
        const cached = await redis_1.default.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const response = await axios_1.default.get(`${BASE_URL}/quote`, {
            params: { symbol: symbol.toUpperCase(), token: FINNHUB_API_KEY }
        });
        const data = response.data;
        if (data && data.c !== 0) { // Finnhub returns 0 if symbol not found
            await redis_1.default.setex(cacheKey, CACHE_TTL, JSON.stringify(data));
            return data;
        }
        return null;
    }
    catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        // Fallback to stale cache if available
        const staleCached = await redis_1.default.get(cacheKey);
        if (staleCached) {
            console.log(`Returning stale cache for ${symbol}`);
            return JSON.parse(staleCached);
        }
        throw new Error('Market data unavailable');
    }
};
exports.getQuote = getQuote;
const searchStocks = async (query) => {
    const cacheKey = `search:${query.toLowerCase()}`;
    try {
        const cached = await redis_1.default.get(cacheKey);
        if (cached)
            return JSON.parse(cached);
        const response = await axios_1.default.get(`${BASE_URL}/search`, {
            params: { q: query, token: FINNHUB_API_KEY }
        });
        const data = response.data.result;
        // Cache search results longer (1 hour)
        await redis_1.default.setex(cacheKey, 3600, JSON.stringify(data));
        return data;
    }
    catch (error) {
        console.error(`Error searching stocks for ${query}:`, error);
        throw new Error('Search service unavailable');
    }
};
exports.searchStocks = searchStocks;
//# sourceMappingURL=marketData.service.js.map