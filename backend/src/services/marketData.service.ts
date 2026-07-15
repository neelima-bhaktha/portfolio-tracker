import axios from 'axios';
import redisClient from '../config/redis';

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || 'demo';
const BASE_URL = 'https://finnhub.io/api/v1';
const CACHE_TTL = 300; // 5 minutes

export const getQuote = async (symbol: string) => {
    const cacheKey = `quote:${symbol.toUpperCase()}`;
    
    try {
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }

        const response = await axios.get(`${BASE_URL}/quote`, {
            params: { symbol: symbol.toUpperCase(), token: FINNHUB_API_KEY }
        });

        const data = response.data;
        if (data && data.c !== 0) { // Finnhub returns 0 if symbol not found
            await redisClient.setex(cacheKey, CACHE_TTL, JSON.stringify(data));
            return data;
        }
        
        return null;
    } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        
        // Fallback to stale cache if available
        const staleCached = await redisClient.get(cacheKey);
        if (staleCached) {
            console.log(`Returning stale cache for ${symbol}`);
            return JSON.parse(staleCached);
        }
        throw new Error('Market data unavailable');
    }
};

export const searchStocks = async (query: string) => {
    const cacheKey = `search:${query.toLowerCase()}`;
    
    try {
        const cached = await redisClient.get(cacheKey);
        if (cached) return JSON.parse(cached);

        const response = await axios.get(`${BASE_URL}/search`, {
            params: { q: query, token: FINNHUB_API_KEY }
        });

        const data = response.data.result;
        // Cache search results longer (1 hour)
        await redisClient.setex(cacheKey, 3600, JSON.stringify(data));
        
        return data;
    } catch (error) {
        console.error(`Error searching stocks for ${query}: fallback to mock data`);
        // Fallback mock data when API key is missing or invalid
        const mockResults = [
            { symbol: 'AAPL', description: 'APPLE INC', type: 'Common Stock' },
            { symbol: 'MSFT', description: 'MICROSOFT CORP', type: 'Common Stock' },
            { symbol: 'TSLA', description: 'TESLA INC', type: 'Common Stock' },
            { symbol: 'GOOGL', description: 'ALPHABET INC-CL A', type: 'Common Stock' },
            { symbol: 'AMZN', description: 'AMAZON.COM INC', type: 'Common Stock' }
        ];
        return mockResults.filter(stock => 
            stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
            stock.description.toLowerCase().includes(query.toLowerCase())
        );
    }
};
